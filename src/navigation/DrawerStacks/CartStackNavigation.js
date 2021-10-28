import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import {
	Cart,
	DeliveryOptions,
	SelectDeliveryTime,
	Checkout,
	ApplyCoupon,
	SucessfulOrder,
	MyOrders,
	TrackingOrder,
	TrackingOrderMap,
	Address,
	Addresses,
	CountryCitySelectore,
	Map,
	OnlinePaymentWebView,
	PlacesSelectore
} from "../../screens";

import { strings } from "../../i18n";

import { CustomLeftHeader } from '../../components';
import { myfonts } from '../../../assets/fonts';

const Stack = createStackNavigator()
const CartStackNavigation = (props) => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Cart"
				component={Cart}
				options={{
					title: strings("Shopping Cart"),
					headerShown: true,
					headerLeft: null,
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
				initialParams={{
					department: null,
					...props?.route?.params
				}}
			/>
			<Stack.Screen
				name="PlacesSelectore"
				component={PlacesSelectore}
			/>
			<Stack.Screen
				name="DeliveryOptions"
				component={DeliveryOptions}
				options={{
					title: strings("Deliver Options"),
					headerShown: true,
					headerLeft: null,
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
			/>
			<Stack.Screen
				name="SelectDeliveryTime"
				component={SelectDeliveryTime}
				options={{
					title: strings("Select a delivery slot"),
					headerShown: true,
					headerLeft: null,
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
			/>
			<Stack.Screen
				name="Checkout"
				component={Checkout}
				options={{
					title: strings("Checkout"),
					headerShown: true,
					headerLeft: null,
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
			/>
			<Stack.Screen
				name="ApplyCoupon"
				component={ApplyCoupon}
				options={{
					headerLeft: () => <CustomLeftHeader isClose={false} />,
					headerTitle: strings("Apply Coupon"),
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
			/>
			<Stack.Screen
				name="SucessfulOrder"
				component={SucessfulOrder}
				options={{
					headerShown: false,
					headerLeft: null,
				}}
			/>
			<Stack.Screen
				name="OnlinePaymentWebView"
				component={OnlinePaymentWebView}
				options={{
					title: strings("Payment"),
					headerShown: true,
					headerLeft: null,
					headerTitleStyle: {
						fontFamily: myfonts.TajwalRegular,
					},
				}}
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
				name="Address"
				component={Address}
			/>

			<Stack.Screen
				name="CountryCitySelectore"
				component={CountryCitySelectore}
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

		</Stack.Navigator>
	)
}

export default CartStackNavigation
