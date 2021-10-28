import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import {
	Splash,
	ChooseLanguage,
	CountryAndCurrency,
	OnBoardScreen,
	Login,
	ForgetPassword,
	VerificationCode,
	ResetPassword,
	Registeration,
	RegisterationStep2,
	SocialRegisterationStep2,
	PhoneNotFound,
	Auth,
	Favorites,
	MyOrders,
	Cart,
	Notifactions,
	PushNotifactionWebView,
	Zabayh,
	SingleZabeha
} from "../screens";
import DrawerNavigation from './DrawerNavigation';
import { strings } from '../i18n';
import { myfonts } from '../../assets/fonts';


const Stack = createStackNavigator()
const MainStackNavigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ gestureEnabled: false }}>
				<Stack.Screen
					name="Splash"
					component={Splash}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="ChooseLanguage"
					component={ChooseLanguage}
					options={{
						gestureEnabled: false,
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="CountryAndCurrency"
					component={CountryAndCurrency}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="OnBoardScreen"
					component={OnBoardScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Login"
					component={Auth}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Auth"
					component={Login}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="ForgetPassword"
					component={ForgetPassword}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="VerificationCode"
					component={VerificationCode}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="ResetPassword"
					component={ResetPassword}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Registeration"
					component={Registeration}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="RegisterationStep2"
					component={RegisterationStep2}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="SocialRegisterationStep2"
					component={SocialRegisterationStep2}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="PhoneNotFound"
					component={PhoneNotFound}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="Favorites"
					component={Favorites}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="MyOrders"
					component={MyOrders}
					options={{
						headerLeft: () => <CustomLeftHeader />,
						headerTitle: strings("MyOrders"),
						headerTitleStyle: {
							fontFamily: myfonts.TajwalRegular,
						},
					}}
				/>
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
				/>
				<Stack.Screen
					name="Notifactions"
					component={Notifactions}
					options={{
						title: strings("Notifactions"),
						headerShown: true,
						headerTitleStyle: {
							fontFamily: myfonts.TajwalRegular,
						},
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
					name="DrawerNavigation"
					component={DrawerNavigation}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default MainStackNavigation
