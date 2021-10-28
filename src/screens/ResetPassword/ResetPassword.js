import React, { useState, useEffect, useRef } from "react";
import {
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
	Alert,
	TextInput,
	I18nManager,
	BackHandler
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Spinner from 'react-native-loading-spinner-overlay';


import { AuthHeader } from "../../components";

// CONSTAMTS
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys"
import { styles } from "./styles";
import { icons } from "../../assets";
import { myColors } from "../../styles";
import inputStyles from "../../styles/inputStyles"
import RTL_STYLES from "../../styles/rtlStyles"


// Helpers
import APIKit from '../../utils/APIKit'
import { strings } from '../../i18n';
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPassword = ({ route, navigation }) => {
	const confirmPasswordInput = useRef(undefined)

	const [spinner, setSpinner] = useState(false)

	const [bannerImg, setBannerImg] = useState("")
	const [countryCode, setCountryCode] = useState(["971"])
	const [phoneNumber, setPhoneNumber] = useState("")
	const [forgotPasswordToken, setForgotPasswordToken] = useState("")

	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const [passwordIsFocus, setPasswordIsFocus] = useState(false);
	const [confirmPasswordIsFocus, setConfirmPasswordIsFocus] = useState(false);

	BackHandler.addEventListener('hardwareBackPress', function () {
		return false;
	});

	useEffect(() => {
		if (route.params.countryCode) {
			setCountryCode(route.params.countryCode)
		}
		if (route.params.phoneNumber) {
			setPhoneNumber(route.params.phoneNumber)
		}
		if (route.params.forgetPasswordToken) {
			setForgotPasswordToken(route.params.forgetPasswordToken)
		}
	}, [route.params])


	const fetchBanners = async () => {
		try {
			const banners = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.AuthBanners)
			if (banners) {
				const bannersData = JSON.parse(banners)
				setBannerImg(bannersData["forget-password"])
			}
		} catch (e) {
			// saving error
			console.log(e)
		}
	}

	useEffect(() => {
		fetchBanners()
	}, [])

	const resetPasswordAction = async () => {
		let numberOfErrors = 0
		if (password === "" || confirmPassword === "") {
			numberOfErrors++
		}
		if (password !== confirmPassword) {
			numberOfErrors++
		}

		if (numberOfErrors === 0) {
			setSpinner(true)
			try {
				const response = await APIKit.post('user/forget_password/reset_password', {
					country_code: countryCode[0],
					mobile: phoneNumber,
					new_password: password,
					forget_token: forgotPasswordToken
				})

				console.log(response)

				if (response.data.status === 200) {
					if (response.data.data) {
						navigation.navigate('Login')
					}else{
						Alert.alert(
							strings("Error"),
							response.data.data,
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
				}else{
					Alert.alert(
						strings("Error"),
						response.data.msg,
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

				setSpinner(false)
			}catch(e){
				console.log(e)
				setSpinner(false)
			}
		}
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView alwaysBounceVertical={ false } style={styles.container}>
				<AuthHeader img={ bannerImg } />
				<View style={[styles.scrollViewContainer, styles.centerContent]}>
					<View style={styles.passwordsTexts}>
						<Text style={styles.forgetText}>{ strings("Forgot Password?") }</Text>
						<Text style={styles.repeateText}>{ strings("Reset Password") }</Text>
					</View>

					<View style={styles.passwordContainer}>
						<Text style={styles.passwordsStyle}>{ strings("Password") }</Text>
						<View style={[inputStyles.container, passwordIsFocus ? styles.passwordStyle : ""]}>
							<TextInput
								placeholder={ strings("Password") }
								secureTextEntry={true}
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
						</View>
					</View>
					<View style={styles.confirmPasswordContainer}>
						<Text style={styles.passwordsStyle}>{ strings("Confirm password") }</Text>
						<View style={[inputStyles.container, confirmPasswordIsFocus ? styles.passwordStyle : ""]}>
							<TextInput
								ref={confirmPasswordInput}
								placeholder={ strings("Confirm password") }
								secureTextEntry={true}
								placeholderTextColor={myColors.black}
								style={[inputStyles.inputStyle, RTL_STYLES.inputStyle]}
								autoFocus={false}
								blurOnSubmit={true}
								onChangeText={value => setConfirmPassword(value)}
								onFocus={() => setConfirmPasswordIsFocus(true)}
								onBlur={() => setConfirmPasswordIsFocus(false)}
							/>
						</View>
					</View>

					<TouchableOpacity activeOpacity={0.4} style={styles.imageContainer} onPress={ resetPasswordAction }>
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
				</View>
			</ScrollView>
			<Spinner
				visible={ spinner }
			/>
		</SafeAreaView>
	);
};

export { ResetPassword };
