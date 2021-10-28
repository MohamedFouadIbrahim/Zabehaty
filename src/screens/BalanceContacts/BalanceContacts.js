import React, { useEffect, useState } from 'react';
import {
	Image,
	SafeAreaView,
	TextInput,
	View,
	Text,
	TouchableOpacity,
	I18nManager,
	ActivityIndicator,
	FlatList
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
import { myColors } from '../../styles';

const BalanceContacts = ({ route, navigation }) => {

	const {
		params: {
			balance
		}
	} = route

	const [listOfContacts, setListOfContacts] = useState([])

	const [loading, setLoading] = useState(true)

	/*useEffect(() => {
		if (contactName) {
			const contactArray = contactName.split(' ')
			let shortName = ""
			contactArray.forEach( name => {
				shortName += name.charAt(0)
			})
			setShortContactName(shortName)
		}
	}, [])*/

	useEffect(() => {
		fetchContacts()
	}, [])

	const fetchContacts = async () => {
		const response = await APIKit.get('user/balance/contacts')
		console.log(response)
		if (response.data.status === 200) {
			setLoading(false)
			setListOfContacts(response.data.data)
		}
	}

	const newContact = () => {
		navigation.navigate('TransferBalance', {
			balance: balance
		})
	}

	const sendBalance = (contact) => {
		navigation.navigate('SendBalance', {
			contactName: contact.user_name,
			contactNumber: "",
			balance: balance
		})
	}

	return (
		<SafeAreaView style={styles.container} >
			{
				(loading) ?
					<ActivityIndicator
						size={ 'large' }
						color={ myColors.green }
					/>
					:
					<View style={{ flex: 1 }}>
						<FlatList
							numColumns={1}
							data={listOfContacts}
							renderItem={({ item }) => {
								const contactArray = item.user_name.split(' ')
								let shortName = ""
								contactArray.forEach( name => {
									shortName += name.charAt(0)
								})

								return (
									<TouchableOpacity
										activeOpacity={ 0.8 }
										style={ styles.contactContainer}
										onPress={ () => sendBalance(item) }
									>
										<View style={ styles.contactImg}>
											<View style={ styles.conImg}>
												<Text style={ styles.conText}>{ shortName.toUpperCase() }</Text>
											</View>
										</View>
										<View style={ styles.contactInfo}>
											<Text style={ styles.contactName }>{ item.user_name }</Text>
											<Text style={ styles.contactNumber }>{ item.user_mobile }</Text>
										</View>
										<View style={ styles.amountInfo }>
											<Text style={ styles.amountText }>{ item.amount } { strings("AED") }</Text>
										</View>
									</TouchableOpacity>
								)
							}}
							showsVerticalScrollIndicator={true}
						/>

						<CartButton
							onPress={() => { newContact() }}
							text={strings("Transfer to new contact")}
							style={{ alignSelf: 'center', width: '90%', borderRadius: 5, marginBottom: 10 }}
						/>
					</View>
			}
		</SafeAreaView>
	)
}

export { BalanceContacts };
