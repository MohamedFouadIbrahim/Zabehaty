import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
	Alert,
	I18nManager,
	BackHandler
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Spinner from 'react-native-loading-spinner-overlay';



import { AuthHeader, InputField, PhoneNumberInput } from "../../components";

// CONSTAMTS
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys"
import { styles } from "./styles";
import { icons } from "../../assets";


// Helpers
import APIKit from '../../utils/APIKit'
import { strings } from '../../i18n';
import { SafeAreaView } from "react-native-safe-area-context";

const ForgetPassword = ({ navigation }) => {
	const [spinner, setSpinner] = useState(false)

	const [bannerImg, setBannerImg] = useState("")
	const [showQuestionSection, setShowQuestionSection] = useState(false)
	const [showSendCodeSection, setShowSendCodeSection] = useState(false)

	const [phoneNumber, setPhoneNumber] = useState("")
	const [securityQuestion, setSecurityQuestion] = useState(undefined)
	const [answer, setAnswer] = useState("")

	BackHandler.addEventListener('hardwareBackPress', function () {
		return false;
	});

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

	const detectPhoneNumber = () => {
		DeviceInfo.getPhoneNumber().then((phoneNumber) => {
			if (phoneNumber && phoneNumber !== "unknown") {
				console.log(" Phone Number = " + phoneNumber);
				setPhoneNumber(phoneNumber)
			}
		})
	}

	useEffect(() => {
		fetchBanners()
		detectPhoneNumber()
	}, [])

	const checkPhoneNumber = async () => {
		if(phoneNumber !== "") {
			setSpinner(true)
			try {
				const response = await APIKit.post('user/forget_password/get_security_question', {
					mobile: phoneNumber
				})

				console.log(response)

				if (response.data.status === 200) {
					if (response.data.data) {
						setSecurityQuestion(response.data.data)
						setShowQuestionSection(true)
						setShowSendCodeSection(true)
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

	const sendCode = async () => {
		setSpinner(true)
		try {
			const response = await APIKit.post('user/forget_password/send_code', {
				mobile: phoneNumber
			})

			console.log(response)

			if (response.data.status === 200) {
				if (response.data.data) {
					console.log(response.data.data)
					console.log(response.data.data.forget_password_token)
					navigation.navigate('VerificationCode', {
						phoneNumber: phoneNumber
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

	const checkSecurityQuestion = async () => {
		if(answer !== "") {
			setSpinner(true)
			try {
				const response = await APIKit.post('user/forget_password/check_security_question', {
					mobile: phoneNumber,
					security_answer: answer
				})

				console.log(response)

				if (response.data.status === 200) {
					if (response.data.data) {
						navigation.navigate('ResetPassword', {
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
	}

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<AuthHeader img={ bannerImg } />
				<View style={[styles.scrollViewContainer, styles.centerContent]}>
					<View style={styles.passwordsTexts}>
						<Text style={styles.forgetText}>{ strings("Forgot Password?") }</Text>
						<Text style={styles.repeateText}>{ strings("Reset Password") }</Text>
					</View>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<PhoneNumberInput
							phoneValue={ phoneNumber }
							setPhoneValue={ setPhoneNumber }
						/>
					</View>
					{
						(showSendCodeSection) ?
							<View style={{ marginTop: 20 }}>
								<TouchableOpacity activeOpacity={ 0.4 } onPress={ sendCode }>
									<Text style={styles.sendCodeBtn}>{ strings("Send Code") }</Text>
								</TouchableOpacity>
							</View>
							:
							<TouchableOpacity activeOpacity={0.4} style={styles.imageContainer} onPress={ checkPhoneNumber }>
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
					}
					{
						(showQuestionSection && securityQuestion &&
							<React.Fragment>
								<View style={styles.response}>
									<Text style={styles.responseChoiceText}>
										{ strings("Or answer the secret question") }
									</Text>
									<Text style={styles.responseChoiceText}>{ strings("which you created with your account") }</Text>
								</View>
								<View style={styles.preferableColor}>
									<Text style={styles.prefereColorText}>{ securityQuestion.name }</Text>
								</View>
								<View style={styles.all}>
									<View style={styles.responseContainer}>
										<InputField
											placeholder={ strings("Answer") }
											placeholderTextColor="grey"
											style={styles.responseInputStyle}
											onChangeText={(value) => setAnswer(value)}
										/>
										<TouchableOpacity onPress={() => checkSecurityQuestion()} >
											{
												(I18nManager.isRTL)?
													<Image source={icons.transformRTL} style={styles.transformImgStyle} />
													:
													<Image source={icons.transform} style={styles.transformImgStyle} />
											}
										</TouchableOpacity>
									</View>
								</View>
							</React.Fragment>
						)
					}
				</View>
			</ScrollView>
			<Spinner
				visible={ spinner }
			/>
		</View>
	);
};

export { ForgetPassword };
