import React, { useEffect, useState } from "react";
import {
	View,
	Image,
	I18nManager,
	Linking,
	Alert,
	Settings
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux'
import DeviceInfo from 'react-native-device-info';
import SInfo from 'react-native-sensitive-info'


import { SuccessModal } from "../../components/Modals/SuccessModal"

// CONSTAMTS
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys"
import {
	UPDATE_USER,
	CHANGE_BRANCH,
	CHANGE_EMIRATE,
	CHANGE_REGION
} from '../../Redux/actionTypes';
import { STYLES } from "./styles";
import { icons } from "../../assets";

// Helpers
import APIKit, { setClientToken, setAppLanguage } from '../../utils/APIKit'
import I18n, { strings } from '../../i18n';
import messaging from '@react-native-firebase/messaging';
import { updateToken } from '../../services/Profile';
import { getBranch, getEmirates, getRegions } from '../../services/Places';

const Splash = ({ navigation, onSuccess }) => {
	const dispatch = useDispatch()

	const [shouldRedirectUser, setShouldRedirectUser] = useState(false)
	const [isExpireSessionPopupActive, setIsExpireSessionPopupAction] = useState(false)

	const currentEmirate = useSelector(state => state.address.currentEmirate)
	const currentRegion = useSelector(state => state.address.currentRegion)

	const [showNewVersionAlert, setShowNewVersionAlert] = useState(false)

	useEffect(() => {
		checkLanguage() //.then(()=>{ onSuccess && onSuccess() })
	}, [])

	useEffect(() => {
		console.log("HEREEEE")
		console.log(shouldRedirectUser)
		if (shouldRedirectUser) {
			console.log("HEREEEE")
			navigation.navigate('Login')
			/*navigation.reset({
				routes: [{ name: 'Login' }],
			});*/
			setShouldRedirectUser(false)
			setIsExpireSessionPopupAction(false)
		}
	}, [shouldRedirectUser])

	useEffect(() => {
		if (APIKit) {
			APIKit.interceptors.response.use((response) => {
				// Any status code that lie within the range of 2xx cause this function to trigger
				// Do something with response data
				return response;
			}, (error) => {
				// Any status codes that falls outside the range of 2xx cause this function to trigger
				// Do something with response error
				console.log("Response Error")
				console.log(error)
				console.log(error.response)
				if (error.response.status === 401) {
					// Go To Login Page
					// Show Alert message then go to login page
					redirectLogin()
				}

				return Promise.reject(error);
			});
		}
	})

	useEffect(() => {
		if (isExpireSessionPopupActive) {
			Alert.alert(
				null,
				"Your session has been expired",
				[
					{
						text: "Login",
						onPress: () => { setShouldRedirectUser(true) },
						style: 'cancel'
					},
				],
				{ cancelable: false }
			);
		}
	}, [isExpireSessionPopupActive])
	const redirectLogin = () => {
		if (!isExpireSessionPopupActive) {
			setIsExpireSessionPopupAction(true)
		}
	}

	const checkLanguage = async () => {
		try {
			const selectedLanguage = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.SelectedLanguage)
			if (selectedLanguage) {
				setAppLanguage(selectedLanguage)
				I18n.locale = selectedLanguage
				if (selectedLanguage === "ar") {
					I18nManager.forceRTL(true)
					I18nManager.allowRTL(true)
				} else {
					I18nManager.forceRTL(false)
					I18nManager.allowRTL(false)
				}

				checkLoggedInUser()
			} else {
				navigation.navigate("ChooseLanguage")
			}
		} catch (e) {
			// saving error
			console.log(e)
		}
	}

	const checkEmarahAndRegionLang = () => {
		if (currentEmirate) {
			getEmirates(({ data }) => {
				const selectedEmirate = data.filter( emarah => emarah.id === currentEmirate.id)
				if (selectedEmirate.length > 0) {
					dispatch({ type: CHANGE_EMIRATE, data: selectedEmirate[0] })
				}
			}, err => {
				console.log(err)
			})
		}
		if (currentEmirate && currentRegion) {
			getRegions(currentEmirate.id, ({ data }) => {
				const selectRegion = data.filter( region => region.id === currentRegion.id)
				if (selectRegion.length > 0) {
					dispatch({ type: CHANGE_REGION, data: selectRegion[0] })
				}
			}, err => {
				console.log(err)
			})

			getBranch(currentEmirate?.id, currentRegion?.id, ({ data }) => {
				dispatch({ type: CHANGE_BRANCH, data: data })
			}, err => {
			})
		}
	}

	const fetchSettings = async () => {
		const response = await APIKit.get('settings')

		console.log(response)
		if (response.data.status === 200) {
			const data = response.data.data

			try {
				await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AuthBanners, JSON.stringify(data.banners))
			} catch (e) {
				// saving error
				console.log(e)
			}
		}
	}

	const fetchAuthQuestions = async () => {
		const response = await APIKit.get('user/security_questions')

		console.log(response)
		if (response.data.status === 200) {
			const data = response.data.data

			try {
				await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AuthQuestions, JSON.stringify(data))
			} catch (e) {
				// saving error
				console.log(e)
			}
		}
	}

	const checkLoggedInUser = async () => {
		try {
			const userData = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.UserData)
			const PassSkip = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.PassSkip)

			console.log("UserData")
			console.log(userData)
			if (userData) {
				const userObj = JSON.parse(userData)

				setClientToken(userObj.token)
				dispatch({ type: UPDATE_USER, data: userObj.user })

				messaging().getToken().then(divceToken => {
					console.log("Update Device Token")
					console.log(divceToken)
					updateToken({ device_token: divceToken })
				})

				checkVersion(true)
				//navigation.navigate("ChooseLanguage", { userExist: true, langChoosen: true })
			} else {
				/*SharedPreferences.getItem("UserData", function(value){
					console.log(value);

					Alert.alert(
						"Debug",
						JSON.stringify(value),
						[
							{
								text: strings("Cancel"),
								onPress: () => console.log('Cancel Pressed'),
								style: 'cancel'
							},
						],
						{ cancelable: false }
					);

				});*/

				const brand = DeviceInfo.getBrand();
				const deviceType = brand === "Apple" ? "ios" : "android";

				if (deviceType === "android") {
					const gettingFirstData = await SInfo.getItem("UserData", {
						sharedPreferencesName: "com.atp.zabehati_preferences"
					});

					if (gettingFirstData) {
						const jsonObj = JSON.parse(gettingFirstData)
						if (jsonObj.id) {
							try {
								const loginObj = {
									user_id: jsonObj.id,
									autoLogin: true
								};

								const response = await APIKit.post("user/login_by_id", loginObj);
								if (response.data.status === 200) {
									if (response.data.data) {
										const data = {
											user: response.data.data,
											token: response.data.data.token,
										};
										try {
											await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.UserData, JSON.stringify(data));
										} catch (error) {
											console.log(error);
										}

										setClientToken(data.token)
										dispatch({ type: UPDATE_USER, data: data.user })

										checkVersion(true)

										await SInfo.deleteItem("UserData", { sharedPreferencesName: "com.atp.zabehati_preferences" });
									}
								}
							} catch (e) {
								console.log(e)
							}
						}
					}else{
						dispatch({ type: UPDATE_USER, data: {} })
						console.log("pass skip ::>>", PassSkip);
						await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.PassSkip, "0");

						checkVersion(false, PassSkip)
					}
				}else if (deviceType === "ios") {
					const gettingFirstData = Settings.get("loggedInUser")
					if (gettingFirstData) {
						const jsonObj = gettingFirstData //JSON.parse(gettingFirstData)
						if (jsonObj.id) {
							try {
								const loginObj = {
									user_id: jsonObj.id,
									autoLogin: true
								};

								const response = await APIKit.post("user/login_by_id", loginObj);
								if (response.data.status === 200) {
									if (response.data.data) {
										const data = {
											user: response.data.data,
											token: response.data.data.token,
										};
										try {
											await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.UserData, JSON.stringify(data));
										} catch (error) {
											console.log(error);
										}

										setClientToken(data.token)
										dispatch({ type: UPDATE_USER, data: data.user })

										checkVersion(true)

										Settings.set({ loggedInUser: {} });
										await SInfo.deleteItem("UserData", { sharedPreferencesName: "com.atp.zabehati_preferences" });
									}
								}
							} catch (e) {
								console.log(e)
							}
						}else{
							dispatch({ type: UPDATE_USER, data: {} })
							console.log("pass skip ::>>", PassSkip);
							await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.PassSkip, "0");

							checkVersion(false, PassSkip)
						}
					}else{
						dispatch({ type: UPDATE_USER, data: {} })
						console.log("pass skip ::>>", PassSkip);
						await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.PassSkip, "0");

						checkVersion(false, PassSkip)
					}
				}
			}
		} catch (e) {
			// saving error
			console.log(e)
			checkVersion(false, false)
		}
	}

	const checkVersion = async (isUserLoggedIn, PassSkip) => {
		const response = await APIKit.post('start-app', {
			app_version: "4.2"
		})
		if (response.data.status === 200) {
			if (response.data.data.should_update) {
				// Show update alert
				setShowNewVersionAlert(true)
			}else{
				if (response.data.data.rate_order) {
					try {
						await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.RateOrderId, "" + response.data.data.rate_order)
					}catch(e) {
						console.log(e)
					}
				}

				redirection(isUserLoggedIn, PassSkip)
			}
		}
	}

	const redirection = (isUserLoggedIn, PassSkip) => {
		fetchSettings()
		fetchAuthQuestions()
		checkEmarahAndRegionLang()

		if (isUserLoggedIn) {
			navigation.navigate("ChooseLanguage", { userExist: true, langChoosen: true })
		}else{
			if (PassSkip == 1) {
				navigation.navigate("OnBoardScreen")
			}else {
				navigation.navigate("ChooseLanguage", { userExist: false, langChoosen: true })
			}
		}
	}

	return (
		<View style={STYLES.container}>
			<Image source={icons.logo} />

			<SuccessModal
				isVisible={showNewVersionAlert}
				title={ strings("NewVersionMsg") }
				rightTitle={strings("Update")}
				rightAction={() => {
					const brand = DeviceInfo.getBrand();
					if (brand === "Apple") {
						const link = "itms-apps://itunes.apple.com/us/app/id1227769641?mt=8"
						Linking.canOpenURL(link).then(supported => {
							supported && Linking.openURL(link);
						}, (err) => console.log(err));
					}else{ // Android
						const link = "https://play.google.com/store/apps/details?id=com.atp.zabehati"
						Linking.canOpenURL(link).then(supported => {
							supported && Linking.openURL(link);
						}, (err) => console.log(err));
					}
				}}
				//rightAction={() => { setAddToFavModal(false) }}
			/>
		</View>
	);
};

export { Splash };
