import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, I18nManager, Image, SafeAreaView, Text, TouchableOpacity, View, Alert, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { icons } from '../../assets';
import { CartButton, Row, TajwalBold, TajwalMedium } from '../../components';
import { strings } from '../../i18n';
import { checkoutSettings } from '../../services/Checkout';
import { getAddresses, deleteAddress } from '../../services/Addresses';
import { myColors } from '../../styles';
import CurrentAddress from './CurrentAddress';
import DeliveryOption from './DeliveryOption';
import { styles } from './styles';
import { checkIfDateOrDay } from './utils';
import { calcFont } from '../../mutils';

const { height } = Dimensions.get('window');


const DeliveryOptions = ({ navigation, route }) => {

	const {
		params: {
			cartItemId,
			department
		}
	} = route

	console.log(department)

	const isFocused = useIsFocused()

	const [userAddresses, setUserAddresses] = useState([])
	const [selectedAdress, setSelectedAdress] = useState(undefined)
	const [settings, setSettings] = useState({})
	const [isLoading, setisLoading] = useState(true)
	const [canChooseAddress, setCanChooseAddress] = useState(true)

	const [selectedOption, setSelectedOption] = useState(department.id==2?
		{
			id: 2,
			name: strings('Option 2'),
			description: 'Standard Delivery' //'Standard Delivery'
		}
		:
		{
		id: 7,
		name: 'Option 1',
		description: 'Standart Delivery',
		shippingMethods: 1,
	})

	const [selectedTime, setSelectedTime] = useState({ from: '', to: '' })
	const [selectedDateOrDay, setSelectedDateOrDay] = useState({ title: '', day: '' })
	const [selectedEidDay, setSelectedEidDay] = useState(1)

	const homeNamed = ['Home', 'home', 'المنزل', 'منزل'];

	useEffect(() => {
		// console.log("department::>>",department);
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
						name={(I18nManager.isRTL) ? 'arrow-forward-outline' : 'arrow-back-outline'}
						//name='close-outline'
						color={'#000000'}
						size={25}
					/>
				</TouchableOpacity>
			)
		})

		//BackHandler.addEventListener('hardwareBackPress', function() {return true})
	}, [])

	const getSettings = () => {
		console.log(cartItemId)
		checkoutSettings({ cartId: cartItemId }, res => {
			console.log("Checkout Settings")
			console.log(res)
			const {
				date_from = "", // "2021-06-22",
				date_style = "", // "date",
				date_to = "", // "2021-07-15",
				delivery_times = [], // [{from, to}]
				available_days = [],
				payments = [] // [1,2]
			} = res.data

			let availableDatesOrDayes = checkIfDateOrDay({ date_style, date_from, date_to, available_days })
			console.log("Alaa")
			console.log(availableDatesOrDayes)
			setSelectedTime({ from: delivery_times[0]?.from, to: delivery_times[0]?.to })
			setSelectedDateOrDay(availableDatesOrDayes[0])
			setSettings(res.data)
			fetchAddresses()
		})
	}

	useEffect(() => {
		fetchAddresses()
	}, [isFocused])

	const fetchAddresses = () => {
		getAddresses(res => {
			console.log("Addresses")
			console.log(res)

			if (res.data.length > 0) {
				setUserAddresses(res.data.map((item) => ({
					...item,
					img: homeNamed.includes(item.name) ? icons.HomeIcon : icons.LocationIcon,
					fullAddress: `${item?.address} \n${item?.apartment_num} ${item?.street_name}`
				})))
				// setCurrentAddress(res.data[0])
				setCanChooseAddress(true)
			}else{
				setUserAddresses([])
				setSelectedAdress(undefined)
			}

			setisLoading(false)
		})
	}


	useEffect(() => { getSettings() }, [])

	const renderOptionsList = () => {
		return (
			<View style={styles.deliveryOptionsContainer} >

				<Row style={{ alignItems: 'center' }} >

					<Image resizeMode='contain' source={icons.calendar} />

					<Text style={styles.selectDeliveryOptionText} >
						{strings('SelectDeliveryOption')}
					</Text>

				</Row>

				{/* <FlatList
                    data={DeliveryOptionsArray}
                    renderItem={renderOneOption}
                /> */}

				<DeliveryOption
					deliveryOption={{
						id: 7,
						name: strings('Option 1'),
						// description: 'Standard Delivery' //'Standard Delivery'
					}}
					selectedOption={selectedOption}
					navigation={navigation}
					onChageOption={(option)=>setSelectedOption(option)}
					selectedTime={selectedTime}
					selectedDateOrDay={selectedDateOrDay}
					onSelectTime={() => {
						navigation.navigate('SelectDeliveryTime', {
							selectedTime,
							selectedDateOrDay,
							settings,
							cartItemId,
							onFinishSelect: (dateOrDay, time) => {
								setSelectedDateOrDay(dateOrDay);
								setSelectedTime(time)
							}
						})
					}}
				/>
				{ department.id === 2 && <DeliveryOption
					deliveryOption={{
						id: 2,
						name: strings('Option 2'),
						description: 'Standard Delivery' //'Standard Delivery'
					}}
					selectedOption={selectedOption}
					navigation={navigation}
					onChageOption={(option)=>setSelectedOption(option)}
					selectedTime={selectedTime}
					selectedDateOrDay={selectedDateOrDay}
					selectedEidDay={selectedEidDay}
					onChangeEidDay={(day)=>setSelectedEidDay(day)}
					onSelectTime={() => {
						navigation.navigate('SelectDeliveryTime', {
							selectedTime,
							selectedDateOrDay,
							settings,
							cartItemId,
							onFinishSelect: (dateOrDay, time) => {
								setSelectedDateOrDay(dateOrDay);
								setSelectedTime(time)
							}
						})
					}}
				/>}

			</View>
		)
	}


	// const renderOneOption = ({ item, index }) => (
	//     <DeliveryOption
	//         deliveryOption={item}
	//         onChageOption={option => setSelectedOption(option)}
	//         selectedOption={selectedOption}
	//         navigation={navigation}
	//         selectedTime={selectedTime}
	//         selectedDate={date_from}
	//         onSelectTime={(time) => { console.log(time) }}
	//     />
	// )


	const onSelectAddress = (address) => {
		setSelectedAdress({ ...address, Region: address?.region })
	}

	const _renderAddress = ({ item, index }) => (
		<TouchableOpacity
			key={ item.id }
			style={[styles.AddressItem, { backgroundColor: item.id == selectedAdress?.id ? myColors.yellow2 : "transparent" }]}
			onPress={() => onSelectAddress(item)}
		>

			<Image
				source={item.img}
				resizeMode='contain'
			/>

			<View style={styles.AddressTextContainer} >

				<TajwalBold style={styles.AddressName}>
					{item.name}
				</TajwalBold>

				<TajwalMedium style={styles.FullAddress} >
					{item.fullAddress}
				</TajwalMedium>

			</View>

		</TouchableOpacity>
	)

	const onEditAddress = () => {

		navigation.navigate('Address', {
			editMode: true,
			selectedAdress: {
				...selectedAdress,
				address_id: selectedAdress.id
			},
			lockEmirates: true,
			onSelectAddress: (Address) => {
				fetchAddresses()
				if (Address.id) {
					setSelectedAdress( prevState => {
						return {
							...prevState,
							...Address
						}
					})
				}
			}
		})
		// navigate to edit address
	}

	const renderAddressOptionsButtons = () => {
		if (selectedAdress?.id) {
			return (
				<Row style={styles.AddressOptionsButtonsContainer} >

					<TouchableOpacity
						style={styles.AddressOptions}
						onPress={() => onEditAddress()}
					>
						<TajwalMedium style={styles.EditSelectedAddressText} >
							{strings("EditSelectedAddress")}
						</TajwalMedium>
					</TouchableOpacity>

					<TouchableOpacity
						disabled={isLoading}
						style={styles.AddressOptions}
					>

						{isLoading ? <ActivityIndicator size='small' /> :
							<TajwalMedium style={styles.EditSelectedAddressText} onPress={() => onDeleteAddress(selectedAdress?.id)} >
								{strings("DeleteSelectedAddress")}
							</TajwalMedium>
						}
					</TouchableOpacity>

				</Row>
			)
		}
	}

	const onDeleteAddress = () => {
		setisLoading(true)
		deleteAddress(selectedAdress?.id, ({ data }) => {
			fetchAddresses()
			setSelectedAdress(undefined)
			setisLoading(false)
		}, err => {
			setisLoading(false)
		})
	}

	const onAddAddress = () => {
		navigation.navigate('Address', {
			editMode: false,
			lockEmirates: true,
			disableEmirateChange: true,
			onSelectAddress: (Address) => {
				fetchAddresses()
				setSelectedAdress(Address)
			}
		})
	}

	if (isLoading) {
		return <ActivityIndicator size='small' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} color={myColors.green3} />
	}

	return (

		<SafeAreaView style={styles.container} >
			<FlatList
				ListHeaderComponent={
					<View style={ styles.secoundContainer }>
						{renderOptionsList()}

						{ /***** New Section show addresses in same view */ }
						{
							(department.id !== 157 &&
								<View style={{ marginTop: 15, marginBottom: 15 }}>
									{
										(userAddresses.length > 0 &&
											<Row style={{ alignItems: 'center' }} >
												<Image resizeMode='contain' source={icons.AddressIcon2} />
												<Text style={styles.selectDeliveryOptionText} >
													{strings('Select Address')}
												</Text>
											</Row>
										)
									}
								</View>
							)
						}
					</View>
				}
				data={ (department.id !== 157) ? userAddresses : [] }
				keyExtractor={(item, index) => String(index)}
				renderItem={_renderAddress}
				alwaysBounceVertical={ false }
				alwaysBounceHorizontal={false}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={
					<React.Fragment>
						{
							(department.id !== 157) ?
								<React.Fragment>
									{ renderAddressOptionsButtons() }
									<TouchableOpacity style={styles.AddNewButton} onPress={() => onAddAddress()} >
										<TajwalMedium style={styles.AddNewText} >
											{strings("ADDNEWADDRESS")}
										</TajwalMedium>
									</TouchableOpacity>
								</React.Fragment>
								:
								<View style={{ height: 40 }}></View>
						}
						<CartButton
							text={strings('ProceedtoCheckout')}
							onPress={() => {
								if (department.id !== 157){
									if (selectedAdress !== undefined) {
										navigation.navigate('Checkout', {
											cartItemId,
											selectedTime,
											selectedDateOrDay,
											department,
											selectedEidDay,
											payments: (settings.payments) ? settings.payments : [],
											date_style: settings.date_style,
											currentAddress: selectedAdress
										})
									} else {
										Alert.alert(
											null,
											strings("Please select or add your address first"),
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
									navigation.navigate('Checkout', {
										cartItemId,
										selectedTime,
										selectedDateOrDay,
										department,
										selectedEidDay,
										payments: (settings.payments) ? settings.payments : [],
										date_style: settings.date_style,
									})
								}
							}}
						/>
					</React.Fragment>
				}
			/>
		</SafeAreaView>

	)

}

export { DeliveryOptions };
