import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Alert,
	I18nManager
} from "react-native";
import DeviceInfo from 'react-native-device-info';



import { InputField, PhoneNumberInput } from "../../../components";

// CONSTAMTS
import { styles } from "../../ForgetPassword/styles";
import { icons } from "../../../assets";


// Helpers
import APIKit from '../../../utils/APIKit'
import { strings } from '../../../i18n';

const ForgetPassword = ({ navigation, setSpinner, hideForgotPasswordContentAnimation }) => {

	const [showQuestionSection, setShowQuestionSection] = useState(false)
	const [showSendCodeSection, setShowSendCodeSection] = useState(false)

	const [countryCode, setCountryCode] = useState(["971"])
	const [phoneNumber, setPhoneNumber] = useState("")
	const [securityQuestion, setSecurityQuestion] = useState(undefined)
	const [answer, setAnswer] = useState("")

	const detectPhoneNumber = () => {
		DeviceInfo.getPhoneNumber().then((phoneNumber) => {
			if (phoneNumber && phoneNumber !== "unknown") {
				console.log(" Phone Number = " + phoneNumber);
				setPhoneNumber(phoneNumber)
			}
		})
	}

	useEffect(() => {
		detectPhoneNumber()
	}, [])

	const checkPhoneNumber = async () => {
		if(phoneNumber !== "") {
			setSpinner(true)
			try {
				const response = await APIKit.post('user/forget_password/get_security_question', {
					country_code: countryCode[0],
					mobile: phoneNumber
				})

				console.log(response)

				if (response.data.status === 200) {
					if (response.data.data) {
						if (response.data.data.length > 0) {
							setSecurityQuestion(response.data.data)
							// Put this variable to true if you want to show security question section
							setShowQuestionSection(false)
						}
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
				country_code: countryCode[0],
				mobile: phoneNumber
			})

			console.log(response)

			if (response.data.status === 200) {
				if (response.data.data) {
					console.log(response.data.data)
					console.log(response.data.data.forget_password_token)

					hideForgotPasswordContentAnimation()

					navigation.navigate('VerificationCode', {
						country_code: countryCode,
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
					country_code: countryCode[0],
					mobile: phoneNumber,
					security_answer: answer
				})

				console.log(response)

				if (response.data.status === 200) {
					if (response.data.data) {
						navigation.navigate('ResetPassword', {
							country_code: countryCode,
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
		<View style={[styles.scrollViewContainer, styles.centerContent]}>
			<View style={styles.passwordsTexts}>
				<Text style={styles.forgetText}>{ strings("Forgot Password?") }</Text>
				<Text style={styles.repeateText}>{ strings("Reset Password") }</Text>
			</View>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<PhoneNumberInput
					phoneValue={ phoneNumber }
					setPhoneValue={ setPhoneNumber }
					setCountryCode={ setCountryCode }
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
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 45 }}>
						<TouchableOpacity activeOpacity={ 0.4 } style={styles.backContainer} onPress={ hideForgotPasswordContentAnimation }>
							<Text style={styles.backText}>{ strings("Back") }</Text>
						</TouchableOpacity>
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
					</View>
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
	);
};

export default ForgetPassword;
