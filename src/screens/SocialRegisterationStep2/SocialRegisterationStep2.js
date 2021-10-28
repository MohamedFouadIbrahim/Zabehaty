import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity, I18nManager, Alert } from "react-native";
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';


import { AuthHeader } from "../../components";
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

const SocialRegisterationStep2 = ({ route, navigation }) => {
	const dispatch = useDispatch()

	const [spinner, setSpinner] = useState(false)

	const [deviceBrand, setDeviceBrand] = useState("")
	const [deviceToken, setDeviceToken] = useState("")

	const [bannerImg, setBannerImg] = useState("")

	const [socialType, setSocialType] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [socialToken, setSocialToken] = useState("")
	const [socialProfileId, setSocialProfileId] = useState("")

	const [countryCode, setCountryCode] = useState(["971"])
	const [phoneNumber, setPhoneNumber] = useState("")

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
		if (route.params.socialProfileId) {
			setSocialProfileId(route.params.socialProfileId)
		}
		if (route.params.socialType) {
			setSocialType(route.params.socialType)
		}
		if (route.params.socialToken) {
			setSocialToken(route.params.socialToken)
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

	useEffect(() => {
		const brand = DeviceInfo.getBrand();
		setDeviceBrand(brand)
	}, [setDeviceBrand])

	const onSubmitAction = async () => {
		if (phoneNumber) {
			setSpinner(true)
			try {
				const deviceType = (deviceBrand === "Apple") ? "ios" : "android"
				console.log({
					social_profile_id: socialProfileId,
					social_type: socialType,
					social_token: socialToken,
					first_name: firstName,
					last_name: lastName,
					email: email,
					country_code: countryCode[0],
					mobile: phoneNumber,
					device_type: deviceType,
					device_token: (deviceToken) ? deviceToken : "No-Token"
				})
				const response = await APIKit.post('user/register/social', {
					social_profile_id: socialProfileId,
					social_type: socialType,
					social_token: socialToken,
					first_name: firstName,
					last_name: lastName,
					email: email,
					country_code: countryCode[0],
					mobile: phoneNumber,
					device_type: deviceType,
					device_token: (deviceToken) ? deviceToken : "No-Token"
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

						if (route?.params?.onFinishLogin) {
							route?.params?.onFinishLogin()
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
				}
				setSpinner(false)
			} catch (e) {
				if (e.response) {
					// Request made and server responded
					console.log(e.response.data);
					console.log(e.response.status);
					//console.log(e.response.headers);

					Alert.alert(
						strings("Error"),
						e.response.data.msg,
						[
							{
								text: strings("Cancel"),
								onPress: () => console.log('Cancel Pressed'),
								style: 'cancel'
							},
						],
						{ cancelable: false }
					);
				} else if (e.request) {
					// The request was made but no response was received
					console.log(e.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', e.message);
				}
				setSpinner(false)
			}
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={[styles.container]}>
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
					<TouchableOpacity activeOpacity={0.4} style={styles.confirmAction} onPress={onSubmitAction}>
						<View style={styles.entering}>
							<Text style={styles.enteringText}>{strings("Register")}</Text>
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
		</View>
	);
};

export { SocialRegisterationStep2 };
