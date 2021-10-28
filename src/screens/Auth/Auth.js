import React, { useState, useEffect, useRef } from 'react'
import {
	ScrollView,
	View,
	Image,
	TouchableOpacity,
	TextInput,
	I18nManager,
	Animated,
	BackHandler
} from "react-native";
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
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { useDispatch } from 'react-redux'

// Components
import APIKit, { setClientToken, setBranchId } from "../../utils/APIKit";
import Login from './_partials/Login'
import Register from './_partials/Register'
import ForgotPassword from './_partials/ForgotPassword'
import { AuthHeader, SocialLogin } from "../../components";

import { styles } from "./styles";


// CONSTAMTS
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys";
import { UPDATE_USER } from "../../Redux/actionTypes";

const AuthView = {
	Login: "login",
	Register: "register",
	ForgotPassword: "forgotPassword"
}

const CONENT_ANiMATiON_SPEED = 300
const Auth = ({ navigation, route }) => {

	// const {
	// 	params: {
	// 		onFinishLogin
	// 	}
	// } = route

	// const onFinishLogin = ()=>{};
	// const onFinishRegist = ()=>{};
	const dispatch = useDispatch();

	const [deviceBrand, setDeviceBrand] = useState("");
	const [deviceToken, setDeviceToken] = useState("");

	const [spinner, setSpinner] = useState(false);
	const [bannerImg, setBannerImg] = useState("");
	const [viewAppearance, setViewAppearance] = useState(AuthView.Login)
	const [nextViewAppearance, setNextViewAppearance] = useState("")
	const [loginContentAnimation] = useState(
		new Animated.Value(0)
	)
	const [registerContentAnimation] = useState(
		new Animated.Value(0)
	)
	const [forgotPasswordContentAnimation] = useState(
		new Animated.Value(0)
	)

	const fetchToken = async () => {
		try {
			const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.FirebaseToken)
			if (value !== null) {
				setDeviceToken(value)
			}
		} catch (e) {
			// error reading value
			console.log("Fetch Device Token")
			console.log(e)
		}
	}

	useEffect(() => {
		fetchToken();

		const brand = DeviceInfo.getBrand();
		setDeviceBrand(brand);
	}, [setDeviceBrand]);

	BackHandler.addEventListener('hardwareBackPress', function () {
		if (viewAppearance === AuthView.Register) {
			hideRegisterContentAnimation()
			/**
			 * When true is returned the event will not be bubbled up
			 * & no other back action will execute
			 */
			return true;
		}
		if (viewAppearance === AuthView.ForgotPassword) {
			hideForgotPasswordContentAnimation()
			return true
		}
		return false;
	});

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
		fetchBanners();
	}, []);

	GoogleSignin.configure({
		scopes: [], // what API you want to access on behalf of the user, default is email and profile
		webClientId: '46439986389-fqt9r0atago27aktu7ken1cllqacsk6e.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
		offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
		hostedDomain: '', // specifies a hosted domain restriction
		loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
		forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
		accountName: '', // [Android] specifies an account name on the device that should be used
		iosClientId: '46439986389-e3usme8r97ndf2h998fj7lsqe9ch8mm4.apps.googleusercontent.com', //'46439986389-gth7r4nqvu8bpmpc1nkg2lqi0prsdsn4.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
		googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
	});

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
			console.log(response)
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

					setBranchId(8)
					setClientToken(data.token)
					dispatch({ type: UPDATE_USER, data: data.user })

					if (route?.params?.onFinishLogin && route?.params?.onFinishLogin()) {
						route?.params?.onFinishLogin()
					} else {
						navigation.navigate('DrawerNavigation')
					}
					setSpinner(false)
				}
			} else {
				setSpinner(false)
				if (type === "facebook") {
					completeRegister(user, type, accessToken)
				} else if (type === "google") {
					completeGoogleRegister(user, type, accessToken)
				} else if (type === "apple") {
					completeAppleRegister(user, type, accessToken)
				}
			}
		} catch (e) {
			console.log(e)

			setSpinner(false)
			if (type === "facebook") {
				completeRegister(user, type, accessToken)
			} else if (type === "google") {
				completeGoogleRegister(user, type, accessToken)
			} else if (type === "apple") {
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
			onFinishLogin: route?.params?.onFinishLogin
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
			onFinishLogin: route?.params?.onFinishLogin
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
			onFinishLogin: route?.params?.onFinishLogin
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


	const startLoginContentAnimation = () => {
		Animated.timing(loginContentAnimation, {
			toValue: 1,
			duration: CONENT_ANiMATiON_SPEED,
			useNativeDriver: true
		}).start()
	}
	const hideLoginContentAnimation = () => {
		Animated.timing(loginContentAnimation, {
			toValue: 0,
			duration: CONENT_ANiMATiON_SPEED,
			useNativeDriver: true
		}).start(() => {
			if (nextViewAppearance === AuthView.ForgotPassword) {
				setViewAppearance(AuthView.ForgotPassword)
				startForgotPasswordContentAnimation()
			} else {
				setViewAppearance(AuthView.Register)
				startRegisterContentAnimation()
			}
		})
	}

	const startRegisterContentAnimation = () => {
		Animated.timing(registerContentAnimation, {
			toValue: 1,
			duration: CONENT_ANiMATiON_SPEED,
			useNativeDriver: true
		}).start()
	}
	const hideRegisterContentAnimation = () => {
		Animated.timing(registerContentAnimation, {
			toValue: 0,
			duration: CONENT_ANiMATiON_SPEED,
			useNativeDriver: true
		}).start(() => {
			setViewAppearance(AuthView.Login)
			startLoginContentAnimation()
		})
	}

	const startForgotPasswordContentAnimation = () => {
		Animated.timing(forgotPasswordContentAnimation, {
			toValue: 1,
			duration: CONENT_ANiMATiON_SPEED,
			useNativeDriver: true
		}).start()
	}
	const hideForgotPasswordContentAnimation = () => {
		Animated.timing(forgotPasswordContentAnimation, {
			toValue: 0,
			duration: CONENT_ANiMATiON_SPEED,
			useNativeDriver: true
		}).start(() => {
			setViewAppearance(AuthView.Login)
			startLoginContentAnimation()
		})
	}

	useEffect(() => {
		switch (nextViewAppearance) {
			case AuthView.ForgotPassword:
			case AuthView.Register:
				hideLoginContentAnimation()
				break
			default:
				break
		}
	}, [nextViewAppearance])

	const registerAction = () => {
		if (nextViewAppearance !== AuthView.Register) {
			setNextViewAppearance(AuthView.Register)
		} else {
			hideLoginContentAnimation()
		}
	}
	const forgotPasswordAction = () => {
		if (nextViewAppearance !== AuthView.ForgotPassword) {
			setNextViewAppearance(AuthView.ForgotPassword)
		} else {
			hideLoginContentAnimation()
		}
	}

	const loginContentAnimationStyle = {
		opacity: loginContentAnimation
	}
	const registerContentAnimationStyle = {
		opacity: registerContentAnimation
	}
	const forgotPasswordContentAnimationStyle = {
		opacity: forgotPasswordContentAnimation
	}

	return (
		<View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<ScrollView bounces={false} style={styles.container}>
				<View style={{ backgroundColor: "#FFFFFF" }}>
					<AuthHeader
						img={bannerImg}
						navigate={navigation.navigate}
						startContentAnimation={startLoginContentAnimation}
						onSkip={() => { route?.params?.onFinishSkip && route?.params?.onFinishSkip() }}
						forceSkip={route?.params?.onFinishSkip ? true : false}
					/>
					{
						//route?.params?.onFinishLogin && route?.params?.onFinishLogin()
						(viewAppearance === AuthView.Login &&
							<Animated.View style={[{ flex: 1 }, loginContentAnimationStyle]}>
								<Login
									setSpinner={setSpinner}
									navigation={navigation}
									startRegisterContentAnimation={registerAction}
									forgotPasswordAction={forgotPasswordAction}
									onFinishLogin={ (route?.params?.onFinishLogin) ? route?.params?.onFinishLogin : undefined }
								/>
								<SocialLogin
									onFacebookLogin={onFacebookLogin}
									onGoogleLogin={onGoogleLogin}
									onAppleLogin={onAppleLogin}
								/>
							</Animated.View>
						)
					}
					{
						//route?.params?.onFinishRegist && route?.params?.onFinishRegist()
						(viewAppearance === AuthView.Register &&
							<Animated.View style={[{ flex: 1 }, registerContentAnimationStyle]}>
								<Register setSpinner={setSpinner} navigation={navigation}
									onFinishRegist={ (route?.params?.onFinishRegist) ? route?.params?.onFinishRegist : undefined }
								/>
								<SocialLogin
									onFacebookLogin={onFacebookLogin}
									onGoogleLogin={onGoogleLogin}
									onAppleLogin={onAppleLogin}
								/>
							</Animated.View>
						)
					}
					{
						(viewAppearance === AuthView.ForgotPassword &&
							<Animated.View style={[{ flex: 1 }, forgotPasswordContentAnimationStyle]}>
								<ForgotPassword
									setSpinner={setSpinner}
									navigation={navigation}
									hideForgotPasswordContentAnimation={ hideForgotPasswordContentAnimation }
								/>
							</Animated.View>
						)
					}
				</View>
			</ScrollView>
			<Spinner
				visible={spinner}
			/>
		</View>
	)
}


export { Auth }
