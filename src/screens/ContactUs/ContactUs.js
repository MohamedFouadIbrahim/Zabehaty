import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Platform } from "react-native";
import { I18nManager, Linking, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import call from 'react-native-phone-call';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { height } from "styled-system";
import { icons } from "../../assets";
import { TajwalRegular, Row, TajwalBold } from '../../components';
import { strings } from "../../i18n";
import { h, w } from "../../mutils";
import { getCurrentApplicationState } from "../../Redux/states";
import { addToContactUs, getContactUs } from "../../services/ContactUs";
import { myColors } from "../../styles";
import inputStyles from "../../styles/inputStyles";
import LTR_STYLES from "../../styles/ltrStyles";
import RTL_STYLES from "../../styles/rtlStyles";
import { showToast } from '../../utils';
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys";
import { styles } from "./styles";

const ContactUs = ({ route, navigation }) => {
	const isFocused = useIsFocused()

	const [loading, setIsLoading] = useState(false);


	const [mailIsFocus, setmailIsFocus] = useState(false);
	const [nameIsFocus, setNameIsFocus] = useState(false);
	const [messageIsFocus, setMessageIsFocus] = useState(false);
	const [mobileIsFocus, setMobileIsFocus] = useState(false);
	const [reasonIsFocus, setReasonIsFocus] = useState(false);
	const [openPicker, setOpenPicker] = useState(false);

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [mobile, setMobile] = useState("");
	const [reasonsList, setReasonsList] = useState([{ reason: strings('Inquiry') }, { reason: strings('Complain') }, { reason: strings('Other') }]);
	const [reason, setReason] = useState("");
	const [userState, setUserState] = useState({});
	const [contactData, setContactData] = useState(undefined);
	const [lang, setLang] = useState("");


	const user = getCurrentApplicationState('session').user;



	const onPressContact = (item) => {

		switch (item?.text) {

			case 'phone':
				call({
					number: item?.value,
					prompt: false
				})
				break

			case 'whatsapp':
				Linking.openURL(`whatsapp://send?text=&phone=${item?.value}`)
				break
			case 'fax': // dont forget to handel it
				call({
					number: item?.value,
					prompt: false
				})
				break

			case 'Email':
				Linking.openURL(`mailto:${item?.value}`)
				break

			case 'link':
				if (Linking.canOpenURL(`${item?.value}`)) {
					Linking.openURL(`${item?.value}`)
				}
				break

			default:
				return
		}

	}

	useEffect(() => {
		setUserState(user)
	}, [])

	useEffect(() => {
		getContactUs((res) => {
			console.log(res)
			setContactData(res)
			AsyncStorage.getItem(ASYNC_STORAGE_KEYS.SelectedLanguage).then(value => {
				setLang(value);
				//setIsLoading(false)
			}).catch((e) => {
				//setIsLoading(false)
			})
		}, e => {
			//setIsLoading(false)
		})
	}, [isFocused])


	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.8}
					style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}
					onPress={() => {
						navigation.goBack()
					}}
				>
					<Ionicons
						// name={ (I18nManager.isRTL) ? 'arrow-forward-outline' : 'arrow-back-outline' }
						name='close-outline'
						color={'#000000'}
						size={25}
					/>
				</TouchableOpacity>
			)
		})
	}, [])

	const onSubmit = () => {


		const {
			first_name,
			last_name,
			mobile,
			name,
			email
		} = userState

		let dataToSend;


		if (userState?.id) {
			dataToSend = {
				name: first_name + ' ' + last_name,
				mobile: mobile,
				msg: message,
				reason: reason,
				email: email
			}
		} else {
			dataToSend = {
				name,
				mobile: mobile,
				msg: message,
				reason: reason,
				email: email
			}
		}


		const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (email && reg.test(email) === false) {
			showToast("invalidEmail")
			return
		}

		if (!reason) {
			showToast("Please Enter Reason")
			return
		}

		if (!message) {

			showToast("Please Enter Message")
			return
		}

		setIsLoading(true);

		addToContactUs({ ...dataToSend }, res => {
			setIsLoading(false);
			setReason("")
			setMessage("")
			showToast("MsgSened")
		}, err => {
			setIsLoading(false);
		})

	}

	/**
	 * contactus.address: "الامارات العربية المتحدة أبو ظبي"
	contactus.address_en: "United Arab EmiratesAbu Dhabi"
	contactus.email: "zabehati@oasislivestock.com"
	contactus.fax: "026733044"
	contactus.mobile: "8004664"
	contactus.website: "https://www.oasislivestock.com"
	contactus.whatsapp1: "0551770884"
	contactus.whatsapp2: "0508112340"
	social.facebook: "https://www.facebook.com/oasis.livestock"
	social.instagram: "https://www.instagram.com/Oasis_livestock/"
	social.snapchat: "https://www.snapchat.com/ooasislivestovk"
	social.twitter: "https://twitter.com/@Oasis_livestock"
	 */
	/*if (loading) {
		return <Spinner size='large' color={myColors.green3} visible={true} />
	}*/

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", alignItems: 'center' }}>
			<ScrollView bounces={false} style={styles.container}>
				<View style={{ backgroundColor: "#FFFFFF" }}>
					<View style={styles.signInContent}>

						{!(userState && userState.id) && <>



							<View style={[styles.input, mailIsFocus ? styles.mailPhoneStyle : ""]}>
								<TextInput
									placeholder={strings("email")}
									placeholderTextColor={myColors.black}
									style={[inputStyles.inputStyle, (I18nManager.isRTL) ? RTL_STYLES.inputStyles : LTR_STYLES.inputStyles]}
									// onSubmitEditing={() => nameInput.current.focus()}
									autoFocus={false}
									value={userState?.email}
									onFocus={() => setmailIsFocus(true)}
									onBlur={() => setmailIsFocus(false)}
									returnKeyType={"next"}
									onChangeText={value => setUserState(prev => ({ ...prev, email: value }))}
								//isIcon
								//icon={icons.truemark}
								/>
							</View>

							<View style={[styles.input, mobileIsFocus ? styles.mailPhoneStyle : ""]}>
								<TextInput
									placeholder={strings("mobile")}
									placeholderTextColor={myColors.black}
									style={[inputStyles.inputStyle, (I18nManager.isRTL) ? RTL_STYLES.inputStyles : LTR_STYLES.inputStyles]}
									// onSubmitEditing={() => nameInput.current.focus()}
									autoFocus={false}
									value={userState?.mobile}
									onFocus={() => setMobileIsFocus(true)}
									onBlur={() => setMobileIsFocus(false)}
									returnKeyType={"next"}
									onChangeText={value => setUserState(perv => ({ ...perv, mobile: value }))}
								//isIcon
								//icon={icons.truemark}
								/>
							</View>

							<View style={[styles.input, nameIsFocus ? styles.mailPhoneStyle : ""]}>
								<TextInput
									placeholder={strings("CustomerName")}
									placeholderTextColor={myColors.black}
									style={[inputStyles.inputStyle, (I18nManager.isRTL) ? RTL_STYLES.inputStyles : LTR_STYLES.inputStyles]}
									// onSubmitEditing={() => messageInput.current.focus()}
									autoFocus={false}
									value={userState?.name}
									onFocus={() => setNameIsFocus(true)}
									onBlur={() => setNameIsFocus(false)}
									returnKeyType={"next"}
									onChangeText={value => setUserState(prev => ({ ...prev, name: value }))}
								//isIcon
								//icon={icons.truemark}
								/>
							</View>

						</>}




						<View style={styles.pickerContainer}>
							<TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: w(10) }}
								onPress={() => { setOpenPicker(!openPicker) }}
							>
								<Text style={styles.pickerText}>{reason ? reason : strings('chooseReason')}</Text>
								<View style={{ flexDirection: 'row' }}>
									<View style={{ height: 28, borderWidth: 1, borderColor: myColors.green, marginHorizontal: 10 }} />
									<Ionicons
										name={openPicker ? 'chevron-up' : 'chevron-down'}
										color={myColors.green}
										size={25}
									/>
								</View>
							</TouchableOpacity>
							{openPicker && <View style={styles.reasonsList}>
								{reasonsList.map((item, index) => {
									return (
										<TouchableOpacity key={ index } style={{ borderBottomWidth: 1, borderBottomColor: myColors.gray1, height: 50, alignItems: 'flex-start', justifyContent: 'center' }} onPress={() => { setReason(item.reason), setOpenPicker(!openPicker) }}>
											<Text style={styles.pickerText}>{item.reason}</Text>
										</TouchableOpacity>
									)
								})}
							</View>}
						</View>
						<View style={[styles.input,{height: h(160)}]}>
							<TextInput
								placeholder={strings("message")}
								placeholderTextColor={myColors.black}
								style={[styles.textInput, (I18nManager.isRTL) ? RTL_STYLES.inputStyle : LTR_STYLES.inputStyle,{height:h(130)}]}
								// onSubmitEditing={() => passwordInput.current.focus()}
								autoFocus={false}
								value={message}
								onFocus={() => setMessageIsFocus(true)}
								onBlur={() => setMessageIsFocus(false)}
								returnKeyType={"next"}
								onChangeText={value => setMessage(value)}
								multiline={true}
								numberOfLines={4}
							/>
							{
								(loading) ?
									<View style={{ alignSelf: 'flex-end' }}>
										<ActivityIndicator
											style={{ marginVertical: h(-10), marginHorizontal: 10 }}
											color={ myColors.green }
										/>
									</View>
									:
									<TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={onSubmit}>
										<Ionicons
											name={'md-send'}
											color={myColors.green}
											size={25}
											style={{ marginVertical: h(-10), marginHorizontal: 10, transform: (I18nManager.isRTL) ? [{ rotateY: '180deg' }] : null }}
										/>
									</TouchableOpacity>
							}
						</View>

						{/* <TouchableOpacity activeOpacity={0.4} style={styles.imageContainer} onPress={onSubmit}>
							<Text style={styles.enteringText}>{strings("send")}</Text>
						</TouchableOpacity> */}
					</View>




					{
						(contactData &&
							<View style={{ paddingHorizontal: w(30) }} >
								<TajwalBold style={{ alignSelf: 'flex-start' }} >{lang == "en" ? contactData['contactus.address_en'] : contactData['contactus.address']} </TajwalBold>
								<Row style={{ justifyContent: 'space-between' }} >
									<View style={{ flex: 1, marginTop: h(10), alignItems: 'flex-start' }} >
										<TouchableOpacity style={styles.touch} activeOpacity={0.5} onPress={() => onPressContact({ text: 'fax', value: contactData['contactus.fax'] })}  >
											<FontAwesome name={'fax'} size={15} style={{ minWidth: 15 }} />
											<TajwalRegular style={{ marginHorizontal: w(10) }} >{contactData['contactus.fax']}</TajwalRegular>
										</TouchableOpacity>

										<TouchableOpacity style={styles.touch} activeOpacity={0.5} onPress={() => onPressContact({ text: 'whatsapp', value: contactData['contactus.whatsapp1'] })} >
											<FontAwesome name={'whatsapp'} size={15} style={{ minWidth: 15 }} />
											<TajwalRegular style={{ marginHorizontal: w(10) }} >{contactData['contactus.whatsapp1']}</TajwalRegular>
										</TouchableOpacity>
									</View>

									<View style={{ flex: 1, marginTop: h(10), alignItems: 'flex-start' }} >
										<TouchableOpacity style={styles.touch} activeOpacity={0.5} onPress={() => onPressContact({ text: 'phone', value: contactData['contactus.mobile'] })}  >
											<FontAwesome name={'phone'} size={15} style={{ minWidth: 15 }} />
											<TajwalRegular style={{ marginHorizontal: w(10) }} >{contactData['contactus.mobile']}</TajwalRegular>
										</TouchableOpacity>

										<TouchableOpacity style={styles.touch} activeOpacity={0.5} onPress={() => onPressContact({ text: 'whatsapp', value: contactData['contactus.whatsapp2'] })} >
											<FontAwesome name={'whatsapp'} size={15} style={{ minWidth: 15 }} />
											<TajwalRegular style={{ marginHorizontal: w(10) }} >{contactData['contactus.whatsapp2']}</TajwalRegular>
										</TouchableOpacity>
									</View>
								</Row>

								<View style={{ justifyContent: 'space-between', marginTop: h(5) }} >
									<TouchableOpacity style={styles.touch} activeOpacity={0.5} onPress={() => onPressContact({ text: 'Email', value: contactData['contactus.email'] })} >
										<TajwalBold>{strings("emaill")}</TajwalBold>
										<TajwalRegular style={{ marginHorizontal: 5 }} >{contactData['contactus.email']}</TajwalRegular>
									</TouchableOpacity>

									<TouchableOpacity style={styles.touch} activeOpacity={0.5} onPress={() => onPressContact({ text: 'link', value: contactData['contactus.website'] })} >
										<TajwalBold  >{strings("website")}</TajwalBold>
										<TajwalRegular style={{ marginHorizontal: 5 }} >{contactData['contactus.website']}</TajwalRegular>
									</TouchableOpacity>
								</View>

							</View>
						)
					}

				</View>
				{
					(contactData &&
						<Row style={{ paddingHorizontal: w(40), marginVertical: h(60) }} >
							<TouchableOpacity onPress={() => { onPressContact({ text: 'link', value: contactData['social.facebook'] }) }}>
								<Image source={icons.facebookIcon} style={{ width: 40, height: 40, marginHorizontal: w(10) }} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => { onPressContact({ text: 'link', value: contactData['social.instagram'] }) }}>
								<Image source={icons.instgram} style={{ width: 40, height: 40, marginHorizontal: w(10) }} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => { onPressContact({ text: 'link', value: contactData['social.twitter'] }) }}>
								<Image source={icons.twitter} style={{ width: 40, height: 40, marginHorizontal: w(10) }} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => { onPressContact({ text: 'link', value: contactData['social.snapchat'] }) }}>
								<Image source={icons.snap} style={{ width: 40, height: 40, marginHorizontal: w(10) }} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => onPressContact({ text: 'whatsapp', value: contactData['contactus.free-call'] })}>
								<Image source={icons.whatsapp} style={{ width: 40, height: 40, marginHorizontal: w(10) }} />
							</TouchableOpacity>
						</Row>
					)
				}
			</ScrollView>



		</SafeAreaView>
	);
};

export { ContactUs };
