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
import { string } from 'yup';

const ConfirmTransferBalance = ({ route, navigation }) => {

	const {
		params: {
			balance,
			contactName,
			contactNumber,
			amount
		}
	} = route

	const [shortContactName, setShortContactName] = useState("")
	const [showSuccessModal, setShowSuccessModal] = useState(false)

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
		if (!checkLoading) {
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
							onPress: () => { /* Do something. */ },
						},
					});
				}
			}catch(e) {
				console.log(e)
				setCheckLoading(false)
			}
		}
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

				<View style={ styles.confirmationRow }>
					<View style={styles.confirmationTitle}>
						<Text style={styles.confirmationTitleText}>{ strings("Amount") }</Text>
					</View>
					<View style={styles.confirmationValue}>
						<Text style={styles.confirmationValueText}>{ amount } { strings("AED") }</Text>
					</View>
				</View>

				<View style={ styles.confirmationRow }>
					<View style={styles.confirmationTitle}>
						<Text style={styles.confirmationTitleText}>{ strings("Fees") }</Text>
					</View>
					<View style={styles.confirmationValue}>
						<Text style={styles.confirmationValueText}>0 { strings("AED") }</Text>
					</View>
				</View>

				<View style={ styles.saparator}></View>
				<View style={ styles.confirmationRow }>
					<View style={styles.confirmationTitle}>
						<Text style={styles.totalTitleText}>{ strings("Total") }</Text>
					</View>
					<View style={styles.confirmationValue}>
						<Text style={styles.totalValueText}>{ amount } { strings("AED") }</Text>
					</View>
				</View>
			</View>

			<CartButton
				onPress={() => { sendBalance() }}
				isLoading={ checkLoading }
				text={strings("send")}
				style={{ alignSelf: 'center', width: '90%', borderRadius: 5, marginBottom: 10 }}
			/>

			<SuccessModal
				isVisible={showSuccessModal}
				title={strings("Balance has been transfered successfully")}
				leftTitle={strings("MyAccount")}
				onClose={() => { navigation.popToTop() }}
				leftAction={() => {
					navigation.popToTop()
				}}
			/>
		</SafeAreaView>
	)
}

export { ConfirmTransferBalance };
