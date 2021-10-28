import React, { useState, useRef, useEffect } from 'react'
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	TextInput,
	I18nManager,
	ActivityIndicator
} from "react-native";
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather';


// Components
import { LoginPhoneNumberInput } from "../../../components";


import { styles } from "../styles";
import { icons } from "../../../assets";
import inputStyles from "../../../styles/inputStyles";
import { myColors } from "../../../styles";
import RTL_STYLES from "../../../styles/rtlStyles";
import LTR_STYLES from "../../../styles/ltrStyles";

// CONSTAMTS
import ASYNC_STORAGE_KEYS from "../../../utils/AsyncStorageKeys";
import { UPDATE_USER } from "../../../Redux/actionTypes";

// Helpers
import APIKit, { setClientToken, setBranchId } from "../../../utils/APIKit";
import { strings } from "../../../i18n";
import Snackbar from 'react-native-snackbar';
import { Alert } from 'react-native';
import CheckBox from "../../../components/CheckBox"

const LoginType = {
	Email: "email",
	PhoneNumber: "phoneNumber"
}

const Login = ({
	navigation,
	startRegisterContentAnimation,
	setSpinner,
	forgotPasswordAction,
	onFinishLogin,
}) => {

	useEffect( async() => {
		const RememberdData = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.RememberdData)
		console.log("RememberdData:::>>",JSON.parse(RememberdData));
		parsedOBJ=JSON.parse(RememberdData)
		setRememberdData(parsedOBJ)
		parsedOBJ&&parsedOBJ.mobile&&setLoginBy(LoginType.PhoneNumber)
	}, []);
	const dispatch = useDispatch();

	const passwordInput = useRef(undefined);
	const [mailIsFocus, setmailIsFocus] = useState(false);
	const [passwordIsFocus, setPasswordIsFocus] = useState(false);
	const [rememberdData, setRememberdData] = useState({})
	const [loginBy, setLoginBy] = useState(LoginType.Email)
	const [email, setEmail] = useState((rememberdData && rememberdData.email) ? rememberdData.email : "");
	const [countryCode, setCountryCode] = useState((rememberdData && rememberdData.countryCode) ? [rememberdData.countryCode] : ["971"])
	const [phoneNumber, setPhoneNumber] = useState((rememberdData && rememberdData.mobile) ? rememberdData.mobile : "")
	const [password, setPassword] = useState((rememberdData && rememberdData.password) ? rememberdData.password : "");
	const [deviceBrand, setDeviceBrand] = useState("");
	const [deviceToken, setDeviceToken] = useState("");
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [remember, setRemember] = useState(false)

	const detectPhoneNumber = () => {
		DeviceInfo.getPhoneNumber().then((phoneNumber) => {
			if (phoneNumber && phoneNumber !== "unknown" && loginBy === LoginType.PhoneNumber) {
				console.log(" Phone Number = " + phoneNumber);
				setEmail(phoneNumber)
			}
		})
	}

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
		detectPhoneNumber();
	}, [loginBy])

	useEffect(() => {
		detectPhoneNumber();
		fetchToken();

		const brand = DeviceInfo.getBrand();
		setDeviceBrand(brand);
	}, [setDeviceBrand]);

	useEffect( async() => {
		const RememberdData = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.RememberdData)
		console.log("RememberdData:::>>",JSON.parse(RememberdData));
		parsedOBJ=JSON.parse(RememberdData)
		if (parsedOBJ) {
			setRememberdData(parsedOBJ)
			parsedOBJ&&parsedOBJ.mobile&&setLoginBy(LoginType.PhoneNumber)
		}
	}, []);
	useEffect( async() => {
		if (rememberdData && rememberdData.password) {
			if(rememberdData.email){
				setEmail(rememberdData.email)
			}
			if(rememberdData.password){
				setPassword(rememberdData.password)
			}
			if(rememberdData.mobile){
				setPhoneNumber(rememberdData.passmobileword)
			}
			setRemember(true)
		}
	}, [rememberdData]);

	const onSubmit = async () => {
		console.log("HERE")
		setLoading(true);

		const deviceType = deviceBrand === "Apple" ? "ios" : "android";
		try {
			let loginObj = {
				password: password,
				device_type: deviceType,
				device_token: deviceToken,
			};

			console.log(loginObj)
			console.log(loginBy)
			if (loginBy === LoginType.Email) {
				/*const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				if (reg.test(email) === true) {

				}*/
				loginObj.email = email;
			} else {
				console.log(countryCode)
				console.log(phoneNumber)

				loginObj.countryCode = countryCode[0]
				loginObj.mobile = phoneNumber;
			}

			console.log(loginObj)

			const response = await APIKit.post("user/login", loginObj);
			console.log("login", response)
			setLoading(false)

			if (response.data.status === 200 || response.data.status === 201) {
				if (response.data.data) {
					const data = {
						user: response.data.data,
						token: response.data.data.token,
					};
					try {
						await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.UserData, JSON.stringify(data));
						if (remember) {
							await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.RememberdData, JSON.stringify(loginObj));
						}

					} catch (error) {
						console.log(error);
					}

					//setBranchId(8)
					setClientToken(data.token)
					dispatch({ type: UPDATE_USER, data: data.user })

					if (onFinishLogin) {
						onFinishLogin()
					} else {
						navigation.navigate('DrawerNavigation')
					}
				}

			}
			else {
				console.log("444", response.data.msg);
				Snackbar.show({
					text: response.data.msg,
					duration: Snackbar.LENGTH_SHORT,
					action: {
						text: strings('close'),
						textColor: 'white',
						onPress: () => { /* Do something. */ },
					},
				});
			}
		} catch (e) {
			console.log(e)
			Snackbar.show({
				text: strings('error'),
				duration: Snackbar.LENGTH_SHORT,
				action: {
					text: strings('close'),
					textColor: 'white',
					onPress: () => { /* Do something. */ },
				},
			});
			setLoading(false)
		}
	}

	return (
		<View style={styles.signInContent}>
			<View style={styles.titles}>
				<Text style={styles.welcomeText}>{strings("Welcome to Zabehaty app")}</Text>
			</View>
			{
				(loginBy === LoginType.Email &&
					<React.Fragment>
						<View style={styles.emailOrPhoneContainer}>
							<Text style={styles.emailOrPhoneText}>
								{strings("Email")}
							</Text>
							<TouchableOpacity activeOpacity={0.8} onPress={() => setLoginBy(LoginType.PhoneNumber)}>
								<Text style={styles.byPhoneNumberText}>
									{strings("or Phone number")}
								</Text>
							</TouchableOpacity>
						</View>
						<View style={[inputStyles.container, mailIsFocus ? styles.mailPhoneStyle : ""]}>
							<TextInput
								placeholder={strings("Email")}
								placeholderTextColor={myColors.black}
								style={[inputStyles.inputStyle, (I18nManager.isRTL) ? RTL_STYLES.inputStyle : LTR_STYLES.inputStyle]}
								onSubmitEditing={() => passwordInput.current.focus()}
								autoFocus={false}
								value={email}
								onFocus={() => setmailIsFocus(true)}
								onBlur={() => setmailIsFocus(false)}
								returnKeyType={"next"}
								onChangeText={value => setEmail(value)}
							//isIcon
							//icon={icons.truemark}
							/>
						</View>
					</React.Fragment>
				)
			}
			{
				(loginBy === LoginType.PhoneNumber &&
					<React.Fragment>
						<View style={styles.emailOrPhoneContainer}>
							<Text style={styles.emailOrPhoneText}>
								{strings("Phone number")}
							</Text>
							<TouchableOpacity activeOpacity={0.8} onPress={() => setLoginBy(LoginType.Email)}>
								<Text style={styles.byPhoneNumberText}>
									{strings("or Email Address")}
								</Text>
							</TouchableOpacity>
						</View>
						<LoginPhoneNumberInput
							phoneValue={phoneNumber}
							setPhoneValue={setPhoneNumber}
							setCountryCode={setCountryCode}
						/>
						{ /*<View style={[inputStyles.container, mailIsFocus ? styles.mailPhoneStyle : ""]}>
							<TextInput
								placeholder={strings("Phone number")}
								placeholderTextColor={myColors.black}
								style={[inputStyles.inputStyle, (I18nManager.isRTL) ? RTL_STYLES.inputStyles : LTR_STYLES.inputStyles]}
								onSubmitEditing={() => passwordInput.current.focus()}
								autoFocus={false}
								value={email}
								onFocus={() => setmailIsFocus(true)}
								onBlur={() => setmailIsFocus(false)}
								returnKeyType={"next"}
								onChangeText={value => setEmail(value)}
								//isIcon
								//icon={icons.truemark}
							/>
						</View>*/ }
					</React.Fragment>
				)
			}

			<Text style={styles.passwordText}>{strings("Password")}</Text>
			<View style={[inputStyles.container, passwordIsFocus ? styles.passwordStyle : ""]}>
				<TextInput
					ref={passwordInput}
					placeholder={strings("Password")}
					secureTextEntry={!showPassword}
					placeholderTextColor={myColors.black}
					style={[inputStyles.inputStyle, (I18nManager.isRTL) ? RTL_STYLES.inputStyle : LTR_STYLES.inputStyle]}
					autoFocus={false}
					blurOnSubmit={true}
					value={password}
					onChangeText={value => setPassword(value)}
					onFocus={() => setPasswordIsFocus(true)}
					onBlur={() => setPasswordIsFocus(false)}
				/>
				<TouchableOpacity style={[styles.textInputImage, { marginTop: 5 }]} onPress={() => setShowPassword(!showPassword)}>
					<Icon
						name={showPassword ? 'eye-off' : 'eye'}
						color={myColors.blackGray2}
						size={22}
					/>
				</TouchableOpacity>
			</View>

			<View style={{ flexDirection: 'row', marginTop: 20 }}>
				<CheckBox checked={remember} size={22} ChangeState={() => setRemember(!remember)} />
				<View style={{ alignItems: "flex-start", justifyContent: "center", height: 25 }}>
					<Text style={[styles.createAccount, { marginHorizontal: 5 }]}>{strings("Remember me")}</Text>
				</View>
			</View>

			<TouchableOpacity
				activeOpacity={0.4}
				style={styles.forgetPasswordContainer}
				onPress={() => {
					forgotPasswordAction()
					//navigation.navigate("ForgetPassword");
				}}
			>
				<Text style={styles.forgetPasswordText}>{strings("Forgot Password?")}</Text>
			</TouchableOpacity>
			<View style={styles.signupAndsignin}>
				<TouchableOpacity
					activeOpacity={0.4}
					style={styles.signup}
					onPress={() => {
						startRegisterContentAnimation()
						//navigation.navigate("Registeration");
					}}
				>
					<Text style={styles.createAccount}>{strings("Create new account")}</Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.4} style={styles.imageContainer} onPress={onSubmit}>
					{loading ?
						<ActivityIndicator size={'small'} color={myColors.white} />
						:
						<View style={styles.entering}>
							<Text style={styles.enteringText}>{strings("Login")}</Text>
							{
								(I18nManager.isRTL) ?
									<Image source={icons.pointerRTL} style={styles.pointer} />
									:
									<Image source={icons.pointer} style={styles.pointer} />
							}
						</View>}
				</TouchableOpacity>
			</View>
		</View>
	)
}

export default Login
