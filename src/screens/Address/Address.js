import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { TextInput } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from "react-redux";
import { myfonts } from '../../../assets/fonts';
import { icons } from '../../assets';
import { CartButton, CustomLeftHeader, Row, TajwalRegular } from '../../components';
import { AdressesType, apartmentTypes } from '../../Data/Adresses';
import { strings } from '../../i18n';
import { fullHeight, h, w } from '../../mutils';
import { addAddress, editAddress } from '../../services/Addresses';
import { getBranch } from '../../services/Places';
import { myColors } from '../../styles';
import { locationPermission } from '../../utils';
import { setBranchId } from '../../utils/APIKit';
import { showToast } from '../../utils/Toast';
import { styles } from './styles';
import RTL_STYLES from '../../styles/rtlStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Snackbar from 'react-native-snackbar';
import { I18nManager } from 'react-native';

// CONSTAMTS
import { CHANGE_BRANCH, CHANGE_EMIRATE, CHANGE_REGION } from "../../Redux/actionTypes";


const CustomInput = ({ title, style, required, ...restProps }) => (

	<View style={styles.inputContainer} >
		<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
			<TajwalRegular style={styles.inputTitie} >
				{title}
			</TajwalRegular>
			{required ? <TajwalRegular style={[styles.required, { top: 0 }]} >*</TajwalRegular> : null}
		</View>

		<TextInput
			style={[style, styles.input, (I18nManager.isRTL) ? RTL_STYLES.inputStyle : {}]}
			{...restProps}
		/>
	</View>

)

const CustomSelector = ({ value, title, required, onPress, onChangeText }) => (

	<TouchableOpacity
		style={[styles.inputContainer, styles.input]}
		activeOpacity={1}
		onPress={onPress}
	>
		<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
			<TajwalRegular style={styles.inputTitie} >
				{title}
			</TajwalRegular>
			{required ? <TajwalRegular style={styles.required} >*</TajwalRegular> : null}
		</View>

		<View style={styles.CustomSelectorRow} >
			<TajwalRegular
				style={styles.CustomSelectorInput}
			>
				{value}
			</TajwalRegular>

			<Image
				source={icons.ArrowDown}
				resizeMode='contain'
				style={styles.arrowDownImage}
			/>
		</View>


	</TouchableOpacity>
)

// Mandatory fields are only:
// - choosing location on map
// - choosing emirate & area
// - Street name (change title)
// - unit type (please add Other to the dropdown menu)
// - Unit number
// Optional fields are:
// - Mobile
// - Building number
// - Extra information
// Check XD I added * to the mandatory fields + changed the titles (Done)

// **Remove the Address field it is not longer needed**
// **Choosing address name should be in same language (arabic in arabic version)**

// remove lockEmirates
//

const Address = ({ navigation, route }) => {
	const dispatch = useDispatch();

	const currentEmirate = useSelector(state => state.address.currentEmirate)
	const currentRegion = useSelector(state => state.address.currentRegion)
	const currentBranch = useSelector(state => state.address.currentBranch)

	const {
		params: {
			selectedAdress,
			editMode = false,
			onSelectAddress = undefined,
			lockEmirates = true,
			disableEmirateChange = false
		}
	} = route

	const defaultRegion = {
		latitude: 24.488180,
		longitude: 54.354950,
		latitudeDelta: 0.015,
		longitudeDelta: 0.0121,
	}

	const [region, setRegion] = useState(defaultRegion)
	const [isLoading, setIsLoading] = useState(false)
	const [isAprartmentShown, setIsAprartmentShown] = useState(false)
	const [selectedAddressState, setSelectedAddressState] = useState({})
	const [selectedApartmentType, setApartmentType] = useState(apartmentTypes[0]?.name)
	const [lockEmiratesState, setIslockEmiratesState] = useState(true)

	useEffect(() => {
		if (currentBranch && currentRegion) {
			setSelectedAddressState({ ...selectedAddressState, emirate: currentEmirate, region: currentRegion })
		}
	}, [currentBranch, currentRegion])

	const getCuurentLocation = (onSucess) => {

		locationPermission(() => {
			Geolocation.getCurrentPosition((pos) => {
				const {
					coords
				} = pos
				onSucess && onSucess(coords)
			}, () => {
				showToast("PlaeseCheckYourLoctaionServices")
			}, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
		}, err => {
			showToast("PlaeseCheckYourLoctaionServices")
		})

	}

	useEffect(() => {

		if (editMode) {
			setSelectedAddressState({ ...selectedAdress, emirate: currentEmirate })
			if (selectedAdress?.lat && selectedAdress?.lng) {
				setRegion(pervRegion => ({ ...pervRegion, latitude: Number(selectedAdress?.lat), longitude: Number(selectedAdress?.lng) }))
				setApartmentType(selectedAdress?.address_type)
			}
		}
		else {
			getCuurentLocation(({ latitude, longitude }) => {
				setRegion(prevrRegion => ({ ...prevrRegion, latitude: Number(latitude), longitude: Number(longitude) }))
			})
		}

		navigation.setOptions({
			headerLeft: () => <CustomLeftHeader isClose={false} />,
			headerTitle: editMode ? strings("EditAddress") : strings('AddNewAddress'),
			headerTitleStyle: {
				fontFamily: myfonts.TajwalRegular,
			},
		})


		// return () => {
		// 	setBranchId(currentBranch?.id)
		// }

	}, [])

	const onSelectType = (type) => {
		setSelectedAddressState({ ...selectedAddressState, name: type.name })
	}

	const onSubmit = () => {


		const {
			latitude: lat,
			longitude: lng,
		} = region

		const {
			address_id,
			name,
			street_name,
			region: Region,
			emirate,
			apartment_num,
			mobile,
			building_number,
			notes
		} = selectedAddressState


		// console.log('Region', Region)
		// return

		// console.log('selectedApartmentType', selectedApartmentType)

		// - unit type
		// - Unit number

		if (!lat || !lng) {
			showToast("Please Select Location On Map")
			return
		}
		if (!street_name) {
			showToast("Please Enter Vaild Street Name")
			return
		}
		if (!Region?.id) {
			showToast("Please Select Area")
			return
		}
		if (!apartment_num) {
			showToast("Please Apartment Number")
			return
		}
		if (!selectedApartmentType) {
			showToast("Please Enter Address Type")
			return
		}
		if (!name) {
			showToast("Please Enter Address Name")
			return
		}

		setIsLoading(true)

		getBranch(emirate?.id, Region?.id, ({ data: headerBranch }) => {

			if (editMode) {

				const data = {
					address_id,
					name: (AdressesType.map(item => item.name).includes(selectedAddressState?.name)) ? strings(name) : name,
					address: street_name,
					street_name: street_name,
					lat: lat ? lat : null,
					lng: lng ? lng : null,
					region_id: Region?.id,
					apartment_num,
					mobile,
					building_number,
					notes,
					address_type: selectedApartmentType
				}

				editAddress(data, res => {

					setIsLoading(false)
					Snackbar.show({
						text: strings("Your address added successfully"),
						duration: Snackbar.LENGTH_SHORT,
						backgroundColor: myColors.green2,
						action: {
							text: strings('close'),
							textColor: 'white',
							onPress: () => { /* Do something. */ },
						},
					}); if (onSelectAddress) {
						onSelectAddress({ ...data, city: emirate, Region, headerBranch })
					}

					navigation.goBack()

				}, err => {
					console.log(err)
					setIsLoading(false)
				})

			} else {

				const data = {
					name: (AdressesType.map(item => item.name).includes(selectedAddressState?.name)) ? strings(name) : name,
					address: street_name,
					street_name: street_name,
					lat: lat ? lat : null,
					lng: lng ? lng : null,
					region_id: Region?.id,
					apartment_num,
					mobile,
					building_number,
					notes,
					address_type: selectedApartmentType
				}

				// console.log(data)

				addAddress(data, res => {
					console.log(res)
					setIsLoading(false)
					// showToast("Your address added successfully")
					Snackbar.show({
						text: strings("Your address added successfully"),
						duration: Snackbar.LENGTH_SHORT,
						backgroundColor: myColors.green2,
						action: {
							text: strings('close'),
							textColor: 'white',
							onPress: () => { /* Do something. */ },
						},
					});
					if (onSelectAddress) {
						onSelectAddress(res.data)
						//onSelectAddress({ ...data, city: emirate, Region, headerBranch })
					}
					navigation.goBack()

				}, err => {
					console.log(err)
					setIsLoading(false)
				})
			}


		})


	}

	const onSelectApratmentType = (apratment) => {
		setApartmentType(apratment?.name)
		hideApratmentTypeSelector()
	}

	const renderApratmentTypeModal = () => {
		return (
			<Modal
				isVisible={isAprartmentShown}
				style={{ flex: 1, justifyContent: 'center' }}
				onBackdropPress={() => { hideApratmentTypeSelector() }}
				onBackButtonPress={() => { hideApratmentTypeSelector() }}
			>
				<View style={styles.scollViewContainerView} >
					<ScrollView
						contentContainerStyle={styles.scollViewContaiser}
					>
						{apartmentTypes.map((item, index) => (
							<TouchableOpacity
								key={String(index)}
								onPress={() => { onSelectApratmentType(item) }}
							>

								<TajwalRegular style={{ marginVertical: h(15) }} >
									{item?.name}
								</TajwalRegular>

								<View style={styles.oneTimeSeprator} />
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>

			</Modal>
		)

	}

	// const _onSelectPlace = (place) => {

	// 	const {
	// 		id,
	// 		name,
	// 		type
	// 	} = place

	// 	if (type == 'Area') {
	// 		setSelectedAddressState({ ...selectedAddressState, region: { id, name } })
	// 	} else {
	// 		setSelectedAddressState({ ...selectedAddressState, branch: { id, name }, region: null })
	// 		setBranchId(id)
	// 	}
	// }

	const renderCityCountrySelectore = () => (

		<Row style={styles.cityCountryContainer} >
			<TouchableOpacity
				activeOpacity={1}
				style={styles.cityCountryButtons}
				disabled
			>

				<Row style={styles.arrowDownContainer} >
					<Image source={icons.ArrowDown} resizeMode='contain' style={styles.arrowDown} />
					<TajwalRegular>
						{selectedAddressState?.emirate?.name || strings('City')}
					</TajwalRegular>
					{!selectedAddressState?.emirate?.name ? <TajwalRegular style={styles.required} >*</TajwalRegular> : null}
				</Row>

			</TouchableOpacity>

			{
				(!disableEmirateChange &&
					<TajwalRegular
						dataDetectorType='link'
						style={styles.changeText}
						onPress={() => {
							Alert.alert(strings("Confirm ?"), strings("By Changing City You Will Change Cart And Home ,Other Related"),
								[
									{
										text: strings("Yes"),
										onPress: () => {

											navigation.navigate('PlacesSelectore', {
												onSelectPlace: (emirate, region, branch) => {
													dispatch({ type: CHANGE_EMIRATE, data: emirate })
													dispatch({ type: CHANGE_REGION, data: region })
													dispatch({ type: CHANGE_BRANCH, data: branch })


													setSelectedAddressState({ ...selectedAddressState, emirate: emirate, region: region })
													setRegion(defaultRegion)
													showToast("Please Select Location On Map")
												}
											})

											/*navigation.navigate('CountryCitySelectore', {
												isArea: false,
												isCity: true,
												onSelectPlace: (city) => {
													const {
														id,
														name
													} = city
													setSelectedAddressState({ ...selectedAddressState, emirate: { id, name }, region: null })
													setRegion(defaultRegion)
													showToast("Please Select Location On Map")
												}
											})*/
										}
									},
									{
										text: strings("No")
									}
								])
						}}
					>
						{strings("Change City")}
					</TajwalRegular>
				)
			}

			<TouchableOpacity
				activeOpacity={1}
				style={styles.cityCountryButtons}
				onPress={() => {
					console.log(selectedAddressState?.emirate?.id)
					navigation.navigate('CountryCitySelectore', {
						isArea: true,
						isCity: false,
						emirate_id: selectedAddressState?.emirate?.id,
						onSelectPlace: (reg) => {
							const {
								id, name
							} = reg
							setSelectedAddressState({ ...selectedAddressState, region: { id, name } })
						}
					})
				}}
			>
				<Row style={styles.arrowDownContainer} >

					<Image source={icons.ArrowDown} resizeMode='contain' style={styles.arrowDown} />
					<TajwalRegular>
						{selectedAddressState?.region?.name || strings('Area')}
					</TajwalRegular>

					{!selectedAddressState?.region?.name ? <TajwalRegular style={styles.required} >*</TajwalRegular> : null}
				</Row>
			</TouchableOpacity>
		</Row>
	)


	const showApratmentTypeSelector = () => {
		setIsAprartmentShown(true)
	}

	const hideApratmentTypeSelector = () => {
		setIsAprartmentShown(false)
	}

	const renerAddressType = () => (
		<Row style={styles.addressTypeContainer} >
			{AdressesType.map((item, index) => (
				<TouchableOpacity
					onPress={() => onSelectType(AdressesType[index])}
					key={String(item.id + item.name + index)}
					style={[styles.addressTypeButtons, { backgroundColor: selectedAddressState.name == item.name.toLocaleLowerCase() || selectedAddressState.name == item.name ? myColors.yellow2 : myColors.white }]}
				>
					<Row style={styles.addressTypeRow} >

						<Image source={item.img} resizeMode='contain' style={styles.addressTypeImage} />

						<TajwalRegular style={styles.addressTypeText} >
							{strings(item.name)}
						</TajwalRegular>
					</Row>

				</TouchableOpacity>
			))}
		</Row>
	)

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAwareScrollView contentContainerStyle={styles.scrollViewContainer} >
				<MapView
					provider={PROVIDER_GOOGLE}
					style={styles.map}
					initialRegion={{ ...region }}
					region={{ ...region }}
					onPress={() => {
						navigation.navigate("Map", {
							defaultRegion: region,
							onSave: (slectedRegion, tranformetAddress) => {
								setRegion({ ...slectedRegion })

								if (tranformetAddress?.formatted_address) {

									setSelectedAddressState({
										...selectedAddressState,
										address: tranformetAddress?.formatted_address
									})

								}

							}
						})
					}}
				>
					<Marker
						coordinate={{
							latitude: Number(region.latitude),
							longitude: Number(region.longitude),
							latitudeDelta: Number(region.latitudeDelta),
							longitudeDelta: Number(region.longitudeDelta)
						}} />
				</MapView>

				<View style={styles.subContainer} >

					{renderCityCountrySelectore()}
					{renderApratmentTypeModal()}

					<CustomInput
						title={strings('Extra phone number')}
						keyboardType='numeric'
						onChangeText={(text) => {
							setSelectedAddressState({
								...selectedAddressState,
								mobile: text
							})
						}}
						value={selectedAddressState?.mobile}
					/>

					<CustomSelector
						title={strings("AddressType")}
						onPress={() => {
							showApratmentTypeSelector()
						}}
						value={selectedApartmentType}
						onChangeText={text => { setApartmentType(text) }}
						required={true} //!selectedApartmentType
					/>

					<View style={styles.numbersRow} >
						<View style={{ flex: 1 }}>
							<CustomInput
								title={strings('BuildingNumber')}
								style={ (I18nManager.isRTL) ? RTL_STYLES.inputStyle : {} }
								//style={{ flex: 1, width: "100%" }}
								keyboardType='numeric'
								onChangeText={(text) => {
									setSelectedAddressState({
										...selectedAddressState,
										building_number: text
									})
								}}
								value={selectedAddressState?.building_number}
							/>
						</View>
						<View style={{ width: 30 }}></View>
						<View style={{ flex: 1 }}>
							<CustomInput
								title={strings('DepartmentNumber')}
								style={ (I18nManager.isRTL) ? RTL_STYLES.inputStyle : {} }
								//style={{ flex: 1, width: "100%" }}
								keyboardType='numeric'
								onChangeText={(text) => {
									setSelectedAddressState({
										...selectedAddressState,
										apartment_num: text
									})
								}}
								value={selectedAddressState?.apartment_num}
								required={true} //!selectedAddressState?.apartment_num
							/>
						</View>
					</View>

					<CustomInput
						title={strings('Street / Address details')}
						multiline
						style={ (I18nManager.isRTL) ? RTL_STYLES.inputStyle : {} }
						onChangeText={(text) => {
							setSelectedAddressState({
								...selectedAddressState,
								street_name: text
							})
						}}
						value={selectedAddressState?.street_name}
						required={ true } //!selectedAddressState?.street_name
					/>

					<CustomInput
						title={strings('Extra Notes')}
						multiline
						style={ (I18nManager.isRTL) ? RTL_STYLES.inputStyle : {} }
						onChangeText={(text) => {
							setSelectedAddressState({
								...selectedAddressState,
								notes: text
							})
						}}
						value={selectedAddressState?.notes}
					/>

					{/* <CustomInput
                        title={strings('Address')}
                        multiline
                        onChangeText={(address) => {
                            setSelectedAddressState({
                                ...selectedAddressState,
                                address
                            })
                        }}
                        value={selectedAddressState?.address}
                    /> */}

					{renerAddressType()}

					<CustomInput
						title={strings('AddressName')}
						multiline
						style={ (I18nManager.isRTL) ? RTL_STYLES.inputStyle : {} }
						onChangeText={(text) => {
							setSelectedAddressState({
								...selectedAddressState,
								name: text
							})
						}}
						value={AdressesType.map(item => item.name).includes(selectedAddressState?.name) ? strings(selectedAddressState?.name) : selectedAddressState?.name}
						required={ true }
					/>

				</View>

			</KeyboardAwareScrollView>

			<CartButton
				disabled={isLoading}
				text={strings('Continue')}
				onPress={() => { onSubmit() }}
				isLoading={isLoading}
			/>

		</SafeAreaView>
	)
}

export { Address };

