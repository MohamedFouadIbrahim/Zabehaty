import React, { useEffect, useState } from 'react';
import {
	Image,
	SafeAreaView,
	TextInput,
	View,
	Text,
	TouchableOpacity,
	I18nManager,
	ActivityIndicator
} from 'react-native';
import { icons } from '../../assets';
import { Button, CartButton, Row, TajwalBlack, TajwalBold, TajwalRegular } from '../../components';
import { strings } from '../../i18n';
import { showToast } from '../../utils/Toast';
import { styles } from './styles';

import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";

import APIKit from "../../utils/APIKit";


const TransferBalance = ({ route, navigation }) => {

	const {
		params: {
			balance
		}
	} = route

	const [contactName, setContactName] = useState("")
	const [contactNumber, setContactNumber] = useState("")

	const [checkLoading, setCheckLoading] = useState(false)
	const [isValidNumber, setIsValidNumber] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")

	const [userData, setUserData] = useState(undefined)


	const onSubmit = () => {
		navigation.navigate('SendBalance', {
			contactName: `${userData.first_name} ${userData.last_name}`,
			contactNumber: contactNumber,
			balance: balance
		})
	}

	const checkNumber = async () => {
		console.log("HEREE")
		if (!checkLoading) {
			try {
				setCheckLoading(true)
				const response = await APIKit.post("user/balance/check_mobile", { mobile: contactNumber });
				console.log(response)
				if (response.data.status === 200 || response.data.status === 201) {
					if (response.data.data) {
						if (response.data.data.exists) {
							// User Exists
							setIsValidNumber(true)
							setErrorMessage("")
							if (response.data.data.user) {
								setUserData(response.data.data.user)
							}
						}else{
							// User Not Exists
							setErrorMessage("Error")
						}
						setCheckLoading(false)
					}
				} else {
					setCheckLoading(false)
					setErrorMessage("Error")
				}
			}catch(e) {
				console.log(e)
				setCheckLoading(false)
				setErrorMessage("Error")
			}
		}
	}

	return (
		<SafeAreaView style={styles.container} >
			<View style={styles.subViewContainer} >
				<View style={styles.textFieldContainer}>
					<TextInput
						value={contactName}
						style={[styles.input, (I18nManager.isRTL) ? RTL_STYLES.inputStyle : LTR_STYLES.inputStyle]}
						onChangeText={text => { setContactName(text) }}
						placeholder={ strings("Name") }
						placeholderTextColor={ "#2F2F2F" }
					/>
				</View>

				<View style={[styles.textFieldContainer, {flexDirection: "row", borderColor: (errorMessage !== "") ? "#FF2A2A" : "#F1F1F1" } ]}>
					<TextInput
						value={contactNumber}
						style={[styles.input, (I18nManager.isRTL) ? RTL_STYLES.inputStyle : LTR_STYLES.inputStyle]}
						onChangeText={text => {
							setContactNumber(text)
							setIsValidNumber(false)
						}}
						placeholder={ strings("Phone") }
						placeholderTextColor={ "#2F2F2F" }
					/>
					<TouchableOpacity
						activeOpacity={ 0.8 }
						style={ styles.checkBtn }
						onPress={checkNumber}
					>
						{
							(checkLoading) ?
								<ActivityIndicator
									color={ "#FFFFFF" }
								/>
								:
								<Text style={styles.checkBtnText}>{ strings("Check") }</Text>
						}
					</TouchableOpacity>
				</View>

				{
					(errorMessage !== "" &&
						<Row style={{ alignItems: 'flex-start', marginTop: 10, marginHorizontal: 5, }} >
							<Image style={{ marginTop: 4 }} source={icons.walletInfo} resizeMode='center' />
							<View style={{ width: 10 }} />
							<Row>
								<TajwalRegular style={{ lineHeight: 20 }}>
									{ strings("NotExistUser") }
								</TajwalRegular>
							</Row>
						</Row>
					)
				}
				{
					(userData !== undefined &&
						<View>
							<TajwalRegular style={{ marginTop: 10, color: "#777777", fontSize: 12 }}>{ strings("Result") }</TajwalRegular>
							<Row style={{ alignItems: 'flex-start', marginTop: 10, marginHorizontal: 5, }} >
								<TajwalBold style={{ lineHeight: 16 }}>
									{ `${userData.first_name} ${userData.last_name}` }
								</TajwalBold>
							</Row>
						</View>
					)
				}
			</View>

			{
				(isValidNumber === true &&
					<CartButton
						onPress={() => { onSubmit() }}
						text={strings("Transfer")}
						style={{ alignSelf: 'center', width: '90%', borderRadius: 5, marginBottom: 10 }}
					/>
				)
			}
		</SafeAreaView>
	)
}

export { TransferBalance };
