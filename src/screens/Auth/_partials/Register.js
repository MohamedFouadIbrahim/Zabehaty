import React, { useState, useRef, useEffect } from "react";
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
	TextInput,
	Alert,
	I18nManager                         
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {
	LoginManager,
	AccessToken,
	GraphRequest,
	GraphRequestManager
} from "react-native-fbsdk-next";
import {
	GoogleSignin,
	statusCodes
} from '@react-native-google-signin/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';


import {
	AuthHeader,
	SocialLogin
} from "../../../components";


// Constants
import ASYNC_STORAGE_KEYS from "../../../utils/AsyncStorageKeys"
import { icons } from "../../../assets";
import { myColors } from "../../../styles";
import { styles } from "../../Registeration/styles";
import inputStyles from "../../../styles/inputStyles"
import RTL_STYLES from "../../../styles/rtlStyles"
import Icon from 'react-native-vector-icons/Feather';

// Helpers
import { strings } from '../../../i18n';

const Register = ({ navigation, onFinishRegist }) => {
	const lastNameInput = useRef(undefined)
	const emailInput = useRef(undefined)
	const passwordInput = useRef(undefined)
	const confirmPasswordInput = useRef(undefined)

	const [bannerImg, setBannerImg] = useState("")

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const [isPasswordShow, setIsPasswordShow] = useState(false);
	const [isConfirmPasswordShow, setIsConfirmPasswordShow] = useState(false);
	const [firstNameIsFocus, setFirstNameIsFocus] = useState(false)
	const [lastNameIsFocus, setLastNameIsFocus] = useState(false)
	const [mailIsFocus, setMailIsFocus] = useState(false);
	const [passwordIsFocus, setPasswordIsFocus] = useState(false);
	const [confirmPasswordIsFocus, setConfirmPasswordIsFocus] = useState(false);
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setSShowConfirmPassword] = useState(false)

	const toggleVisiblity = () => {
		setIsPasswordShow((prev) => !prev);
		setIsConfirmPasswordShow((prev) => !prev);
	};

	const fetchBanners = async () => {
		try {
			const banners = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.AuthBanners)
			if (banners) {
				const bannersData = JSON.parse(banners)
				setBannerImg(bannersData.login)
			}
		} catch (e) {
			// saving error
			console.log(e)
		}
	}

	useEffect(() => {
		fetchBanners()
	}, [])

	const onNextPress = () => {
		let numberOfErrors = 0
		if (firstName === "" || lastName === "" || password === "" || confirmPassword === "") {
			numberOfErrors++
		}
		if (password !== confirmPassword) {
			numberOfErrors++
		}

		if (numberOfErrors === 0) {
			navigation.push("RegisterationStep2", {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				onFinishRegist
			})
		}else{
			Alert.alert(
				strings("Error"),
				strings("Please fill required data"),
				[
					{
						text: strings("Cancel"),
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel'
					},
				],
				{ cancelable: false }
			);
		}
	}


	const getFacebookInfoFromToken = token => {
		const PROFILE_REQUEST_PARAMS = {
			fields: {
				string: 'id,name,first_name,last_name,email',
			},
		};
		const profileRequest = new GraphRequest(
			'/me',
			{ token, parameters: PROFILE_REQUEST_PARAMS },
			(error, user) => {
				if (error) {
					console.log('login info has error: ' + error);
				} else {
					sendDataAction("facebook", token, user)
					console.log('result:', user);
				}
			},
		);
		new GraphRequestManager().addRequest(profileRequest).start();
	};

	const onFacebookLogin = () => {
		LoginManager.logInWithPermissions(["public_profile", "email"]).then(
			function (result) {
				if (result.isCancelled) {
					console.log("Login cancelled");
				} else {
					AccessToken.getCurrentAccessToken().then(data => {
						const accessToken = data.accessToken.toString();
						getFacebookInfoFromToken(accessToken);
					});

					console.log(
						"Login success with permissions: " +
						result.grantedPermissions.toString()
					);
				}
			},
			function (error) {
				console.log("Login fail with error: " + error);
			}
		);
	}

	const onGoogleLogin = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();

			console.log(userInfo)
			sendDataAction("google", userInfo.idToken, userInfo.user)
		} catch (error) {
			console.log(error)
			if (error.code === statusCodes.SIGN_IN_CANCELLED) {
				// user cancelled the login flow
			} else if (error.code === statusCodes.IN_PROGRESS) {
				// operation (e.g. sign in) is in progress already
			} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
				// play services not available or outdated
			} else {
				// some other error happened
			}
		}
	}


	const sendDataAction = async (type, accessToken, user) => {
		try {
			setSpinner(true)

			const deviceType = (deviceBrand === "Apple") ? "ios" : "android"
			const response = await APIKit.post('user/login/social', {
				social_profile_id: user.id,
				social_type: type,
				social_token: accessToken,
				device_token: deviceToken,
				device_type: deviceType
			})
			if (response.data.status === 200) {
				if (response.data.data) {
					const data = {
						user: response.data.data,
						token: response.data.data.token
					}
					try {
						await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.UserData, JSON.stringify(data));
					} catch (error) {
						console.log(error)
					}

					setClientToken(data.token)
					dispatch({ type: UPDATE_USER, data: data.user })

					navigation.navigate('DrawerNavigation')
					setSpinner(false)
				}
			} else {
				setSpinner(false)
				if (type === "facebook") {
					completeRegister(user, type, accessToken)
				}else if(type === "google") {
					completeGoogleRegister(user, type, accessToken)
				}else if(type === "apple") {
					completeAppleRegister(user, type, accessToken)
				}
			}
		} catch (e) {
			console.log(e)

			setSpinner(false)
			if (type === "facebook") {
				completeRegister(user, type, accessToken)
			}else if(type === "google") {
				completeGoogleRegister(user, type, accessToken)
			}else if(type === "apple") {
				completeAppleRegister(user, type, accessToken)
			}
		}
	}

	const completeRegister = (user, type, accessToken) => {
		console.log("Navigate to social register")
		navigation.navigate('SocialRegisterationStep2', {
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			socialProfileId: user.id,
			socialType: type,
			socialToken: accessToken,
		})
	}

	const completeGoogleRegister = (user, type, accessToken) => {
		console.log("Navigate to social register")
		navigation.navigate('SocialRegisterationStep2', {
			firstName: user.givenName,
			lastName: user.familyName,
			email: user.email,
			socialProfileId: user.id,
			socialType: type,
			socialToken: accessToken,
		})
	}

	const completeAppleRegister = (user, type, accessToken) => {
		console.log("Navigate to social register")
		navigation.navigate('SocialRegisterationStep2', {
			firstName: user.first_name,
			lastName: user.last_name,
			email: user.email,
			socialProfileId: user.id,
			socialType: type,
			socialToken: accessToken,
		})
	}


	const onAppleLogin = async () => {
		// performs login request
		const appleAuthRequestResponse = await appleAuth.performRequest({
			requestedOperation: appleAuth.Operation.LOGIN,
			requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
		});

		// get current authentication state for user
		// /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
		const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

		console.log(appleAuthRequestResponse)
		console.log(appleAuthRequestResponse.user)
		// use credentialState response to ensure the user is authenticated
		if (credentialState === appleAuth.State.AUTHORIZED) {
			// user is authenticated
			sendDataAction("apple", appleAuthRequestResponse.identityToken, {
				id: appleAuthRequestResponse.user,
				email: appleAuthRequestResponse.email,
				first_name: appleAuthRequestResponse.fullName.givenName,
				last_name: appleAuthRequestResponse.fullName.familyName
			})
		}
	}

	return (
		<React.Fragment>
			<View style={styles.emailOrPhoneContainer}>
				<Text style={[styles.passwordsStyle]}>
					{ strings("First name") }
				</Text>
				<View style={[inputStyles.container, firstNameIsFocus ? styles.borderStyle : ""]}>
					<TextInput
						placeholder={ strings("First name") }
						placeholderTextColor={myColors.black}
						style={[inputStyles.inputStyle, RTL_STYLES.inputStyle]}
						onSubmitEditing={() => lastNameInput.current.focus()}
						autoFocus={false}
						multiline={ false }
						onFocus={() => setFirstNameIsFocus(true)}
						onBlur={() => setFirstNameIsFocus(false)}
						returnKeyType={"next"}
						onChangeText={value => setFirstName(value)}
						blurOnSubmit={true}
					/>
				</View>
			</View>
			<View style={styles.emailOrPhoneContainer}>
				<Text style={[styles.passwordsStyle]}>
					{ strings("Last name") }
				</Text>
				<View style={[inputStyles.container, lastNameIsFocus ? styles.borderStyle : ""]}>
					<TextInput
						ref={ lastNameInput }
						placeholder={ strings("Last name") }
						placeholderTextColor={myColors.black}
						style={[inputStyles.inputStyle, RTL_STYLES.inputStyle]}
						onSubmitEditing={() => emailInput.current.focus()}
						autoFocus={false}
						onFocus={() => setLastNameIsFocus(true)}
						onBlur={() => setLastNameIsFocus(false)}
						returnKeyType={"next"}
						onChangeText={value => setLastName(value)}
						blurOnSubmit={true}
					/>
				</View>
			</View>
			<View style={styles.emailOrPhoneContainer}>
				<Text style={[styles.passwordsStyle]}>
					{ strings("Email") }
				</Text>
				<View style={[inputStyles.container, mailIsFocus ? styles.borderStyle : ""]}>
					<TextInput
						ref={ emailInput }
						placeholder={ strings("Email") }
						placeholderTextColor={myColors.black}
						style={[inputStyles.inputStyle, RTL_STYLES.inputStyle]}
						onSubmitEditing={() => passwordInput.current.focus()}
						autoFocus={false}
						value={email}
						onFocus={() => setMailIsFocus(true)}
						onBlur={() => setMailIsFocus(false)}
						returnKeyType={"next"}
						onChangeText={value => setEmail(value)}
						blurOnSubmit={true}
						//isIcon
						//icon={icons.truemark}
					/>
				</View>

				{ /*<AuthInput
					placeholder="xx x xx xxxxx"
					placeholderTextColor={myColors.black}
					InputContStyle={mailIsFocus ? styles.borderStyle : ""}
					onFocus={() => {
						setmailIsFocus(true);
						setPasswordIsFocus(false);
						setConfirmPasswordIsFocus(false);
					}}
				/>*/ }
			</View>
			<View style={styles.passwordContainer}>
				<Text style={styles.passwordsStyle}>{ strings("Password") }</Text>
				<View style={[inputStyles.container, passwordIsFocus ? styles.passwordStyle : ""]}>
					<TextInput
						ref={passwordInput}
						placeholder={ strings("Password") }
						secureTextEntry={!showPassword}
						placeholderTextColor={myColors.black}
						style={[inputStyles.inputStyle, RTL_STYLES.inputStyle]}
						autoFocus={false}
						onSubmitEditing={() => confirmPasswordInput.current.focus()}
						onChangeText={value => setPassword(value)}
						onFocus={() => setPasswordIsFocus(true)}
						onBlur={() => setPasswordIsFocus(false)}
						returnKeyType={"next"}
						blurOnSubmit={true}
					/>
					<TouchableOpacity style={[styles.textInputImage, { marginTop: 5 }]} onPress={() => setShowPassword(!showPassword)}>
					<Icon
						name={showPassword ? 'eye-off' : 'eye'}
						color={myColors.blackGray2}
						size={22}
					/>					
				</TouchableOpacity>
				</View>

				{ /*<AuthInput
					placeholder="password "
					placeholderTextColor={myColors.black}
					secureTextEntry={!isPasswordShow}
					icon={isPasswordShow ? icons.truemark : icons.eyeoff}
					isPassword
					toggleVisiblity={toggleVisiblity}
					InputContStyle={passwordIsFocus ? styles.borderStyle : ""}
					onFocus={() => {
						setmailIsFocus(false);
						setPasswordIsFocus(true);
						setConfirmPasswordIsFocus(false);
					}}
				/>*/ }
			</View>
			<View style={styles.confirmPasswordContainer}>
				<Text style={styles.passwordsStyle}>{ strings("Confirm password") }</Text>
				<View style={[inputStyles.container, confirmPasswordIsFocus ? styles.passwordStyle : ""]}>
					<TextInput
						ref={confirmPasswordInput}
						placeholder={ strings("Confirm password") }
						secureTextEntry={!showConfirmPassword}
						placeholderTextColor={myColors.black}
						style={[inputStyles.inputStyle, RTL_STYLES.inputStyle]}
						autoFocus={false}
						blurOnSubmit={true}
						onChangeText={value => setConfirmPassword(value)}
						onFocus={() => setConfirmPasswordIsFocus(true)}
						onBlur={() => setConfirmPasswordIsFocus(false)}
					/>
					<TouchableOpacity style={[styles.textInputImage, { marginTop: 5 }]} onPress={() => setSShowConfirmPassword(!showConfirmPassword)}>
					<Icon
						name={showConfirmPassword ? 'eye-off' : 'eye'}
						color={myColors.blackGray2}
						size={22}
					/>					
				</TouchableOpacity>
				</View>
				{ /*
				<AuthInput
					placeholder="confirm password "
					placeholderTextColor={myColors.black}
					secureTextEntry={!isConfirmPasswordShow}
					icon={isConfirmPasswordShow ? icons.truemark : icons.eyeoff}
					isPassword
					toggleVisiblity={toggleVisiblity}
					InputContStyle={confirmPasswordIsFocus ? styles.borderStyle : ""}
					onFocus={() => {
						setmailIsFocus(false);
						setPasswordIsFocus(false);
						setConfirmPasswordIsFocus(true);
					}}
				/>*/ }
			</View>
			<View style={styles.termsContainer}>
				<Text style={{ textAlign: 'left' }}>
					{ strings("By clicking Sign up you agree to the following Terms and Conditions without reservation") }
				</Text>
			</View>
			<TouchableOpacity activeOpacity={0.4} style={styles.confirmAction} onPress={ onNextPress }>
				<View style={styles.entering}>
					<Text style={styles.enteringText}>{ strings("Confirm") }</Text>
					{
						(I18nManager.isRTL) ?
							<Image source={icons.pointerRTL} style={styles.pointer} />
							:
							<Image source={icons.pointer} style={styles.pointer} />
					}
				</View>
			</TouchableOpacity>
		</React.Fragment>
	);
};

export default Register
