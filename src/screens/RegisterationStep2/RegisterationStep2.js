import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, I18nManager, Alert } from "react-native";
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';
import { ModalSelectList } from 'react-native-modal-select-list';


import { AuthHeader, InputField } from "../../components";
import { styles } from "./styles";
import { icons } from "../../assets";
import { PhoneNumberInput } from "../../components";

// CONSTAMTS
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys"
import {
	UPDATE_USER
} from '../../Redux/actionTypes';

// Helpers
import APIKit, { setClientToken, setBranchId } from '../../utils/APIKit'
import { strings } from '../../i18n';
import { myColors } from "../../styles";

const RegisterationStep2 = ({ route, navigation }) => {
	const dispatch = useDispatch()

	let modalRef;
	const saveModalRef = ref => modalRef = ref;

	const [spinner, setSpinner] = useState(false)

	const [deviceBrand, setDeviceBrand] = useState("")
	const [deviceToken, setDeviceToken] = useState("")

	const [bannerImg, setBannerImg] = useState("")
	const [listOfQuestions, setListOfQuestions] = useState([])
	const [questionsOptions, setQuestionsOptions] = useState([])
	const [selectedQuestion, setSelectedQuestion] = useState(undefined)

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [countryCode, setCountryCode] = useState("971")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [answer, setAnswer] = useState("")

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
		detectPhoneNumber()
		fetchToken()
		fetchQuestions()
	}, [])

	useEffect(() => {
		if (route.params.firstName) {
			setFirstName(route.params.firstName)
		}
		if (route.params.lastName) {
			setLastName(route.params.lastName)
		}
		if (route.params.email) {
			setEmail(route.params.email)
		}
		if (route.params.password) {
			setPassword(route.params.password)
		}
	}, [route.params])

	const detectPhoneNumber = () => {
		DeviceInfo.getPhoneNumber().then((phoneNumber) => {
			if (phoneNumber && phoneNumber !== "unknown") {
				console.log(" Phone Number = " + phoneNumber);
				setPhoneNumber(phoneNumber)
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

	const fetchQuestions = async () => {
		try {
			const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.AuthQuestions)
			if (value !== null) {
				const list = JSON.parse(value)
				setListOfQuestions(list)
				if (list.length > 0) {
					setSelectedQuestion(list[0])
				}

				const questions = list.map(question => {
					return {
						label: question.name,
						value: `${question.id}`
					}
				})
				setQuestionsOptions(questions)
			}
		} catch (e) {
			// error reading value
			console.log("Fetch Security Questions")
			console.log(e)
		}
	}

	useEffect(() => {
		const brand = DeviceInfo.getBrand();
		setDeviceBrand(brand)
	}, [setDeviceBrand])

	const onSubmitAction = async () => {

		//if (answer !== "") {
			setSpinner(true)
			const deviceType = (deviceBrand === "Apple") ? "ios" : "android"

			console.log({
				first_name: firstName,
				last_name: lastName,
				email: email,
				mobile: phoneNumber,
				password: password,
				device_type: deviceType,
				device_token: (deviceToken) ? deviceToken : "No-Token",
				security_question_id: (selectedQuestion) ? selectedQuestion.id : 0,
				security_answer: answer
			})

			try {
				const response = await APIKit.post('user/register', {
					first_name: firstName,
					last_name: lastName,
					email: email,
					country_code: countryCode,
					mobile: phoneNumber,
					password: password,
					device_type: deviceType,
					device_token: (deviceToken) ? deviceToken : "No-Token",
					//security_question_id: 0, //(selectedQuestion) ? selectedQuestion.id : 0,
					//security_answer: answer
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

						if (route?.params?.onFinishRegist) {
							route?.params?.onFinishRegist()
						} else {
							navigation.navigate('DrawerNavigation')
						}
					} else {
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
				} else {
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
			} catch (e) {
				console.log(e)
				setSpinner(false)
			}
		//}
	}

	const openModal = () => modalRef.show();
	const onSelectedOption = (value) => {
		const selectedOption = listOfQuestions.filter(question => `${question.id}` === `${value}`)
		if (selectedOption.length > 0) {
			setSelectedQuestion(selectedOption[0])
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<ScrollView alwaysBounceVertical={false} style={[styles.container]}>
				<AuthHeader img={bannerImg} navigate={navigation.navigate} />
				<View style={[styles.scrollViewContainer, styles.centerContent]}>
					<View style={styles.passwordsTexts}>
						<Text style={styles.forgetText}>{strings("There is no phone number for this account")}</Text>
						<Text style={styles.repeateText}>{strings("Enter a phone number")}</Text>
					</View>
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<PhoneNumberInput
							setCountryCode={setCountryCode}
							phoneValue={phoneNumber}
							setPhoneValue={setPhoneNumber}
						/>
					</View>
					{ /*<View style={styles.response}>
						<Text style={styles.responseChoiceText}>
							{strings("Create a secret question to be able to log in to your account in case you lose your password")}
						</Text>
					</View>
					<TouchableOpacity activeOpacity={0.4} style={styles.preferableColor} onPress={openModal}>
						{
							(selectedQuestion &&
								<Text style={styles.prefereColorText}>{selectedQuestion.name}</Text>
							)
						}
					</TouchableOpacity>
					<View style={styles.all}>
						<View style={styles.responseContainer}>
							<InputField
								placeholder={strings("Answer")}
								placeholderTextColor="grey"
								style={styles.responseInputStyle}
								onChangeText={(value) => setAnswer(value)}
							/>
							<TouchableOpacity onPress={() => onSubmitAction()} >
								{
									(I18nManager.isRTL) ?
										<Image source={icons.transformRTL} style={styles.transformImgStyle} />
										:
										<Image source={icons.transform} style={styles.transformImgStyle} />
								}
							</TouchableOpacity>
						</View>
					</View>*/ }
					<TouchableOpacity activeOpacity={0.4} style={styles.imageContainer} onPress={ onSubmitAction }>
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
				visible={spinner}
			/>
			{
				(questionsOptions.length > 0 &&
					<ModalSelectList
						ref={saveModalRef}
						closeButtonText={strings("Back")}
						options={questionsOptions}
						onSelectedOption={onSelectedOption}
						disableTextSearch={true}
						headerTintColor={myColors.green}
						buttonTextColor={myColors.white}
						numberOfLines={2}
					/>
				)
			}
		</View>
	);
};

export { RegisterationStep2 };
