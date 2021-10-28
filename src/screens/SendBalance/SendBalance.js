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
import Snackbar from 'react-native-snackbar';

import { icons } from '../../assets';
import { Button, CartButton, Row, TajwalBlack, TajwalBold, TajwalRegular } from '../../components';
import { strings } from '../../i18n';
import { styles } from './styles';

import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";

import APIKit from "../../utils/APIKit";
import { SuccessModal } from "../../components/Modals/SuccessModal"

const SendBalance = ({ route, navigation }) => {

	const {
		params: {
			balance,
			contactName,
			contactNumber
		}
	} = route

	const [amount, setAmount] = useState("")
	const [shortContactName, setShortContactName] = useState("")

	const [checkLoading, setCheckLoading] = useState(false)

	useEffect(() => {
		if (contactName) {
			const contactArray = contactName.split(' ')
			let shortName = ""
			contactArray.forEach( name => {
				shortName += name.charAt(0)
			})
			setShortContactName(shortName.toUpperCase())
		}
	}, [contactName])

	/*const onSubmit = () => {
		navigation.navigate('ConfirmTransferBalance', {
			contactName: contactName,
			contactNumber: contactNumber
		})
	}*/

	const sendBalance = async () => {
		console.log("HEREE")
		navigation.navigate('ConfirmTransferBalance', {
			contactName: contactName,
			contactNumber: contactNumber,
			amount: amount
		})

		/*if (!checkLoading) {
			try {
				setCheckLoading(true)
				const response = await APIKit.post("user/balance/transfer", {
					amount: amount,
					mobile: contactNumber
				});
				console.log(response)
				if (response.data.status === 200) {
					if (response.data.data) {
						// Balance Transfered Successfully
						setCheckLoading(false)
						setShowSuccessModal(true)
					}
				} else {
					setCheckLoading(false)

					Snackbar.show({
						text: response.data.msg,
						duration: Snackbar.LENGTH_SHORT,
						action: {
							text: strings('close'),
							textColor: 'white',
							onPress: () => { /* Do something. * / },
						},
					});
				}
			}catch(e) {
				console.log(e)
				setCheckLoading(false)
			}
		}*/
	}

	return (
		<SafeAreaView style={styles.container} >
			<View style={styles.subViewContainer} >
				<View style={styles.contactWrapper}>
					<Text style={styles.sendToText}>{ strings("Send to") }</Text>
					<View style={ styles.contactContainer}>
						<View style={ styles.contactImg}>
							<View style={ styles.conImg}>
								<Text style={ styles.conText}>{ shortContactName }</Text>
							</View>
						</View>
						<View style={ styles.contactInfo}>
							<Text style={ styles.contactName }>{ contactName }</Text>
							<Text style={ styles.contactNumber }>{ contactNumber }</Text>
						</View>
					</View>
				</View>
				<View style={{ backgroundColor: '#FAFAFA', marginTop: 15, borderColor: '#5855FE', borderWidth: 1, borderRadius: 5, width: "100%", padding: 5, alignItems: 'flex-start' }} >
					<TajwalBlack style={styles.titleText}  >
						{strings("Amount")}
					</TajwalBlack>
					<TextInput
						value={amount}
						style={styles.input}
						autoFocus={ true }
						onChangeText={amountText => { setAmount(amountText) }}
						keyboardType='numeric'
					/>
				</View>

				<Row style={{ alignItems: 'flex-start', marginTop: 10, marginHorizontal: 5, }} >
					<Image style={{ marginTop: 4 }} source={icons.walletInfo} resizeMode='center' />
					<View style={{ width: 10 }} />
					<Row>
						<TajwalRegular>
							{`${strings("The remaining balance is")}`}
						</TajwalRegular>
						<TajwalBold>
							{` ${balance} ${strings("AED")}`}
						</TajwalBold>
					</Row>
				</Row>
			</View>

			<CartButton
				onPress={() => { sendBalance() }}
				isLoading={ checkLoading }
				text={strings("send")}
				style={{ alignSelf: 'center', width: '90%', borderRadius: 5, marginBottom: 10 }}
			/>
		</SafeAreaView>
	)
}

export { SendBalance };
