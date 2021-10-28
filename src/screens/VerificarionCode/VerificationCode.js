import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, I18nManager, Alert } from "react-native";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import SmsRetriever from 'react-native-sms-retriever';



import { AuthHeader } from "../../components";

// CONSTAMTS
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys"
import { icons } from "../../assets";
import { styles } from "./styles";

// Helpers
import APIKit from '../../utils/APIKit'
import { strings } from '../../i18n';
import { SafeAreaView } from "react-native-safe-area-context";

const CELL_COUNT = 4;
const VerificationCode = ({ route, navigation }) => {
	let IntervalTime;

	const [spinner, setSpinner] = useState(false)
	const [showResendCode, setShowResendCode] = useState(false)
	const [numberOfSeconds, setNumberOfSeconds] = useState(30)

	const [bannerImg, setBannerImg] = useState("")
	const [countryCode, setCountryCode] = useState(["971"])
	const [phoneNumber, setPhoneNumber] = useState("")
	const [forgotPasswordToken, setForgotPasswordToken] = useState("")
	const [value, setValue] = useState("");

	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({value, setValue});

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

	const onSmsListenerPressed = async () => {
		try {
			const registered = await SmsRetriever.startSmsRetriever();
			if (registered) {
				SmsRetriever.addSmsListener(event => {
					console.log(event.message);
					validateMessage(event.message)
					SmsRetriever.removeSmsListener();
				});
			}
		} catch (error) {
			console.log(JSON.stringify(error));
		}
	};

	const validateMessage = (message) => {
		if (message) {
			const messageObj = message.split(": ")
			console.log(messageObj)
			if (messageObj.length > 1) {
				const codeObj = messageObj[1].split(".")
				console.log(codeObj)
				if (codeObj[0]) [
					setValue(codeObj[0])
				]
			}
		}
	}

	useEffect(() => {
		fetchBanners()
		onSmsListenerPressed()
		ref.current.focus();
	}, []);

	useEffect(() => {
		IntervalTime = setInterval(() => {
			setNumberOfSeconds( (prevState) => prevState - 1 )
		}, 1000);
		return () => clearInterval(IntervalTime);
	}, []);

	useEffect(() => {
		if (numberOfSeconds < 1) {
			clearInterval(IntervalTime)
			IntervalTime = undefined
			setNumberOfSeconds(30)
			setShowResendCode(true)
		}
	}, [numberOfSeconds])

	const startInterval = () => {
		/*clearInterval(IntervalTime)
		IntervalTime = setInterval(() => {
			setNumberOfSeconds( (prevState) => prevState - 1 )
		}, 1000)*/
	}

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
		console.log(route.params)
	}, [route.params])


	const verifyCode = async () => {
		setSpinner(true)
		try {
			const response = await APIKit.post('user/forget_password/check_code', {
				countryCode: countryCode[0],
				mobile: phoneNumber,
				code: value
			})

			console.log(response)

			if (response.data.status === 200) {
				if (response.data.data) {
					navigation.navigate('ResetPassword', {
						countryCode: countryCode[0],
						phoneNumber: phoneNumber,
						forgetPasswordToken: response.data.data.forget_password_token
					})
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

	const sendCode = async () => {
		setSpinner(true)
		try {
			const response = await APIKit.post('user/forget_password/send_code', {
				countryCode: countryCode[0],
				mobile: phoneNumber
			})

			console.log(response)

			if (response.data.status === 200) {
				if (response.data.data) {
					startInterval()
					setShowResendCode(false)
					onSmsListenerPressed()
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

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<AuthHeader img={ bannerImg } navigate={navigation.navigate} />
				<View style={styles.verificationTexts}>
					<Text style={styles.phoneVerifyText}>{ strings("Identification by phone") }</Text>
					<Text style={styles.codeVerifyText}>{ strings("Enter the identification code") }</Text>
					<Text style={[styles.sameFont, styles.notReachText]}>
						{ strings("If you did not receive the 4-digit password") }
					</Text>
					<View style={styles.questionNumberContainer}>
						<Text style={[styles.sameFont, styles.trueText]}>
							{ countryCode[0] }{ phoneNumber }
						</Text>
						<Text style={[styles.sameFont, styles.questionText]}>
							{ strings("Did you enter the correct number?") }
						</Text>
					</View>
				</View>
				<View style={[styles.VcodeInputsContain, { alignItems: "center", justifyContent: "center" }]}>
					<CodeField
						ref={ref}
						{...props}
						// Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
						value={value}
						onChangeText={setValue}
						cellCount={CELL_COUNT}
						rootStyle={[ styles.codeFieldRoot, (I18nManager.isRTL) ? {flexDirection: "row-reverse"} : {} ]}
						keyboardType="number-pad"
						textContentType="oneTimeCode"
						renderCell={({ index, symbol, isFocused }) => (
							<View style={styles.cellContainer}>
								<Text
									key={index}
									style={[styles.cell, isFocused && styles.focusCell]}
									onLayout={getCellOnLayoutHandler(index)}
								>
									{symbol || (isFocused ? <Cursor /> : null)}
								</Text>
							</View>
						)}
					/>
				</View>
				<View style={styles.ConfirmationContainer}>
					{
						(showResendCode) ?
							<TouchableOpacity activeOpacity={ 0.4 } style={styles.resend} onPress={ sendCode }>
								<Text style={styles.timeText}>
									إعادة إرسال الرمز التعريفي
								</Text>
							</TouchableOpacity>
							:
							<TouchableOpacity activeOpacity={1} style={styles.resend}>
								<Text style={styles.resendText}>
									إعادة الإرسال بعد
								</Text>
								<Text style={styles.timeText}> { numberOfSeconds } ثوانى </Text>
							</TouchableOpacity>
					}

					<TouchableOpacity activeOpacity={0.4} style={styles.confirmAction} onPress={ verifyCode }>
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

export { VerificationCode };
