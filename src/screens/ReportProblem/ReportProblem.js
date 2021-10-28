import React, { useState, useRef, useEffect } from "react";
import {
	Text,
	View,
	ScrollView,
	Image,
	TouchableOpacity,
	TextInput,
	Alert,
	I18nManager,
	ImageBackground,
} from "react-native";
import { useDispatch } from 'react-redux'
import SmsRetriever from 'react-native-sms-retriever';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
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



import { AuthHeader, SocialLogin } from "../../components";

import { styles } from "./styles";
import { icons } from "../../assets";
import { myColors } from "../../styles";
import inputStyles from "../../styles/inputStyles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";
import Ionicons from 'react-native-vector-icons/Ionicons';

// CONSTAMTS
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys";
import { UPDATE_USER } from "../../Redux/actionTypes";

// Helpers
import APIKit, { setClientToken } from "../../utils/APIKit";
import { strings } from "../../i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const ReportProblem = ({ route, navigation }) => {
	const dispatch = useDispatch();

	const [spinner, setSpinner] = useState(false);


	const [orderId, setOrderId] = useState(undefined);
	const [messageIsFocus, setMessageIsFocus] = useState(false);
	const [reasonIsFocus, setReasonIsFocus] = useState(false);

	const [message, setMessage] = useState("");
	const [reason, setReason] = useState("");


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

	useEffect(() => {
		if (route.params.id) {
			setOrderId(route.params.id)
		}
	}, [route])

	const onSubmit = async () => {
		setSpinner(true);

		try {
			const obj = {
				order_id: orderId,
				description: message,
				title: reason
			}

			const response = await APIKit.post("user/order-problems/create", obj);
			if (response.data.status === 200) {
				if (response.data.data) {
					console.log('response of Report problem ::>>', response);
					Alert.alert(
						null,
						strings("send successfully"),
						[
							{
								text: strings("Done"),
								onPress: () => navigation.goBack(),
								style: 'cancel'
							},
						],
						{ cancelable: false }
					);
				}
			}
			setSpinner(false)
		} catch (e) {
			console.log(e)
			setSpinner(false)
		}

	}



	return (
		<View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<ScrollView bounces={false} style={styles.container}>
				<View style={{ backgroundColor: "#FFFFFF" }}>
					<View style={styles.signInContent}>
						<View>
							<Text>{ strings("Order Number:") } { orderId }</Text>
						</View>
						<View style={styles.emailOrPhoneContainer}>
							<Text style={styles.emailOrPhoneText}>
								{strings("title")}
							</Text>
						</View>
						<View style={[inputStyles.container, reasonIsFocus ? styles.mailPhoneStyle : ""]}>
							<TextInput
								placeholder={strings("title")}
								placeholderTextColor={myColors.black}
								style={[inputStyles.inputStyle, (I18nManager.isRTL) ? RTL_STYLES.inputStyles : LTR_STYLES.inputStyles]}
								// onSubmitEditing={() => nameInput.current.focus()}
								autoFocus={false}
								value={reason}
								onFocus={() => setReasonIsFocus(true)}
								onBlur={() => setReasonIsFocus(false)}
								returnKeyType={"next"}
								onChangeText={value => setReason(value)}
							//isIcon
							//icon={icons.truemark}
							/>
						</View>
						<View style={styles.emailOrPhoneContainer}>
							<Text style={styles.emailOrPhoneText}>
								{strings("message")}
							</Text>
						</View>
						<View style={[inputStyles.container, messageIsFocus ? styles.mailPhoneStyle : "", { height: 100 }]}>
							<TextInput
								placeholder={strings("message")}
								placeholderTextColor={myColors.black}
								style={[inputStyles.inputStyle, (I18nManager.isRTL) ? RTL_STYLES.inputStyles : LTR_STYLES.inputStyles, { height: 100 }]}
								// onSubmitEditing={() => passwordInput.current.focus()}
								autoFocus={false}
								value={message}
								onFocus={() => setMessageIsFocus(true)}
								onBlur={() => setMessageIsFocus(false)}
								returnKeyType={"next"}
								onChangeText={value => setMessage(value)}
								multiline={true}
								numberOfLines={4}
							//isIcon
							//icon={icons.truemark}
							/>
						</View>

						<TouchableOpacity activeOpacity={0.4} style={styles.imageContainer} onPress={onSubmit}>
							<Text style={styles.enteringText}>{strings("send")}</Text>
						</TouchableOpacity>
					</View>

				</View>
			</ScrollView>
			<Spinner
				visible={spinner}
			/>
		</View>
	);
};

export { ReportProblem };
