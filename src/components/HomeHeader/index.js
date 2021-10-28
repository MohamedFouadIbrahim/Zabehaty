import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { styles } from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { TajwalRegular, Row } from '../../components';
import { CHANGE_BRANCH, CHANGE_EMIRATE, CHANGE_REGION } from "../../Redux/actionTypes";
import { setBranchId } from "../../utils/APIKit";

const HomeHeader = (props) => {

	const {
		onFinish,
		useAddresses = false,
		onSelectAddress
	} = props

	const navigation = useNavigation()
	const dispatch = useDispatch()

	const currentEmirate = useSelector(state => state.address.currentEmirate)
	const currentRegion = useSelector(state => state.address.currentRegion)

	/**
	 *
	 * address: "مصطفى امين - الهرم"
address_type: "???"
apartment_num: "1"
branch: {id: 8, name: "أبوظبي"}
building_number: "2"
fullAddress: "مصطفى امين - الهرم \n1 مصطفى امين - الهرم \nأبوظبي"
id: 8688
img: 70
lat: "29.9956655"
lng: "31.151611"
mobile: "01100677400"
name: "المنزل"
notes: null
region:
branch: {id: 8, name: "أبوظبي"}
id: 190
name: "al muroor"
	 *
	 *
	 */
	return (
		<View style={styles.addressContainer}>

			<View style={styles.addressInfo}>
				<TajwalRegular style={styles.country}>{strings("country")}</TajwalRegular>
				<Text> - </Text>
				<TajwalRegular styles={styles.governorate}>{currentEmirate?.name}</TajwalRegular>
				<Text> - </Text>
				<TajwalRegular styles={styles.city}>{currentRegion?.name}</TajwalRegular>
				<Image source={icons.addressicon} style={styles.addressicon} />
			</View>

			<Row>
				<TouchableOpacity
					onPress={() => {
						/*if (useAddresses) {

							navigation.push('Addresses', {
								lockEmirates: true,
								onSelect: onSelectAddress
							})

							return
						}*/

						navigation.push('PlacesSelectore', {
							onSelectPlace: (emirate, region, branch) => {
								dispatch({ type: CHANGE_EMIRATE, data: emirate })
								dispatch({ type: CHANGE_REGION, data: region })
								dispatch({ type: CHANGE_BRANCH, data: branch })
								// setBranchId(branch?.id)
								onFinish && onFinish(branch)
							}
						})

					}}
				>
					<TajwalRegular>{strings("ChangeArea")}</TajwalRegular>
				</TouchableOpacity>
			</Row>

		</View>
	)

};

export { HomeHeader };
