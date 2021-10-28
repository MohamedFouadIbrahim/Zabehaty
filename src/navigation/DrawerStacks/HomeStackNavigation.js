import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import {
	Home,
	Zabayh,
	SingleZabeha,
	SingleShop,
	CountryCitySelectore,
	Address,
	Addresses,
	MyAccount,
	UpdateAccount,
	CountryAndCurrency,
	ChooseLanguage,
	MoreDetails,
	Map,
	PlacesSelectore,
	Cart,
	PushNotifactionWebView,
	ShopRating,
	TrackingOrder
} from "../../screens";
import DeviceInfo from 'react-native-device-info';

import { CustomLeftHeader } from '../../components';
import { strings } from '../../i18n';
import { myfonts } from '../../../assets/fonts';
import { Platform } from 'react-native';

const Stack = createStackNavigator()
const HomeStackNavigation = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={Home}
				options={{
					title: "",
					headerShown: true,
					headerLeft: null,
					headerStyle: {
						//height: 70 + (DeviceInfo.hasNotch() ? 44 : 0)
						height: Platform.OS == 'ios' ? 90 : 70 //115
					},
				}}
			/>
			<Stack.Screen
				name="PlacesSelectore"
				component={PlacesSelectore}
			/>
			<Stack.Screen
				name="Zabayh"
				component={Zabayh}
				options={{
					title: "",
					headerLeft: null,
					headerShown: true,
					headerStyle: {
						height: Platform.OS == 'ios' ? 90 : 70 //115
					},
				}}
			/>
			<Stack.Screen
				name="SingleZabeha"
				component={SingleZabeha}
				options={{
					title: "",
					headerShown: true,
					headerLeft: null
				}}
			/>
			<Stack.Screen
				name="SingleShop"
				component={SingleShop}
				options={{
					title: "",
					headerShown: true,
					headerLeft: null,
				}}
			/>
			<Stack.Screen
				name="CountryCitySelectore"
				component={CountryCitySelectore}
			/>

			<Stack.Screen
				name="Addresses"
				component={Addresses}
				options={{
					headerLeft: () => <CustomLeftHeader isClose={false} />,
					headerTitle: strings("SelectAddress"),
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
			/>
			<Stack.Screen
				name="TrackingOrder"
				component={TrackingOrder}
				options={{
					headerLeft: () => <CustomLeftHeader isClose={false} />,
					headerTitle: strings("TrackingOrder"),
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
			/>
			<Stack.Screen
				name="Address"
				component={Address}
			/>

			<Stack.Screen
				name="CountryAndCurrency"
				component={CountryAndCurrency}
				options={{
					headerLeft: () => <CustomLeftHeader isClose={false} />,
					headerTitle: strings("Country"),
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
			/>

			<Stack.Screen
				name="Map"
				component={Map}
				options={{
					headerLeft: () => <CustomLeftHeader isClose={false} />,
					headerTitle: strings("Choose Location"),
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
			/>
			<Stack.Screen
				name="MoreDetails"
				component={MoreDetails}
				options={{
					title: "",
					headerShown: true,
					headerLeft: null,
				}}
			/>
			<Stack.Screen
				name="Cart"
				component={Cart}
				options={{
					title: strings("Shopping Cart"),
					headerShown: true,
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
					headerLeft: null,
				}}
				initialParams={{
					department: null,
				}}
			/>
			<Stack.Screen
				name="PushNotifactionWebView"
				component={PushNotifactionWebView}
				options={{
					title: "",
					headerShown: true,
					headerLeft: null,
				}}
			/>

			<Stack.Screen
				name="ShopRating"
				component={ShopRating}
				options={{
					headerLeft: () => <CustomLeftHeader isClose={false} />,
					title: strings("ShopRating") ,
					headerShown: true
				}}
			/>
			
			{/* <Stack.Screen
				name="MyAccount"
				component={MyAccount}
				options={{
					headerShown: false,
				}}
			/>

			{/* <Stack.Screen
				name="UpdateAccount"
				component={UpdateAccount}
				options={{
					headerShown: false,
				}}
			/>  */}

		</Stack.Navigator>
	)
}

export default HomeStackNavigation
