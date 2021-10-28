import React, { useState, useEffect } from "react";
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import HomeStackNavigation from './DrawerStacks/HomeStackNavigation';
import CartStackNavigation from './DrawerStacks/CartStackNavigation';
import OrdersStackNavigation from './DrawerStacks/OrdersStackNavigation';
import FavoriteStackNavigation from './DrawerStacks/FavoriteStackNavigation';
import MyAccountStackNavigation from './DrawerStacks/MyAccountStackNavigation';
import NotificationStackNavigation from './DrawerStacks/NotificationStackNavigation';
import ContactUsStackNavigation from './DrawerStacks/ContactUsStackNavigation';
import AuthStackNavigation from './DrawerStacks/AuthStackNavigation';
import TermsAndConditionStackNavigation from './DrawerStacks/TermsAndConditionStackNavigation'
import ReferStackNavigation from './DrawerStacks/ReferStackNavigation'

import DrawerContent, { DrawerItems } from "./DrawerContent";
import { useSelector } from 'react-redux';
import FlashMessage, { showMessage } from 'react-native-flash-message'
import messaging from '@react-native-firebase/messaging';

const Drawer = createDrawerNavigator();
const DrawerNavigation = (props) => {

	const userData = useSelector(state => state.session.user)

	const requestUserPermission = async () => {
		const authorizationStatus = await messaging().requestPermission({
			alert: true,
			announcement: true,
		});

		if (authorizationStatus) {
			console.log('Permission status:', authorizationStatus);
		}
	}

	const getToken = () => {
		messaging().getToken()
			.then(fcmToken1 => {
				if (fcmToken1) {
					global.fcmToken1 = fcmToken1
					console.log("Firebase Token : ", fcmToken1)
				} else {
					// user doesn't have a device token yet
				}


			});

		messaging().onTokenRefresh(token => {
			global.fcmToken1 = token
			console.log("Firebase Token Refresh: ", token)
		});
	}
	useEffect(() => {
		requestUserPermission()
		getToken()
		messaging().onMessage(async remoteMessage => {
			// Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
			console.log("remoteMessage:", remoteMessage)
			let notify = remoteMessage

			showInnerNotifaction(notify)


		});

	}, [])

	const showInnerNotifaction = (notify) => {
		showMessage({
			message: notify.notification.title,
			description: notify.notification.body,
			type: "default",
			backgroundColor: "green",
			// backgroundColor: "#7C7979",
			onPress: () => {
				handlePushNotification(notify.data)
				/* THIS FUNC/CB WILL BE CALLED AFTER MESSAGE PRESS */
			  },
		});
	}
	const handlePushNotification = (pushNotificationData) => {
		console.log("1111",props);
		if (pushNotificationData) {
			console.log("22222");
			if (pushNotificationData.link) {
				props.navigation.navigate('PushNotifactionWebView', {
					link: pushNotificationData.link
				})
			} else if (pushNotificationData.page) {
				if (pushNotificationData.page === "cart") {
					props.navigation.navigate('Cart')
				} else if (pushNotificationData.page === "categories") {
					const params = JSON.parse(pushNotificationData.params)
					if (params && params.id) {
						props.navigation.navigate("Zabayh", { category: { id: parseInt(params.id) }, mainCategories: categories })
					}
				} else if (pushNotificationData.page === "product") {
					console.log("333333");

					const params = JSON.parse(pushNotificationData.params)
					if (params && params.id) {
						console.log("444444");
						props.navigation.navigate('SingleZabeha', {
							productId: parseInt(params.id)
						})
					}
				} else if (pushNotificationData.page === "orders" || pushNotificationData.page === "order") {
					props.navigation.navigate('MyOrders')
				}
			} else {
				props.navigation.navigate('MyNotifactions')
			}
		}
	}
	return (
		<>
			<FlashMessage autoHide={true} position="top" icon="info" animationDuration={500} duration={5000} />
			<NavigationContainer independent={true}>
				<Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} userData={userData} />} >
					<Drawer.Screen name="MyHome" component={HomeStackNavigation} />
					<Drawer.Screen name="MyCart" component={CartStackNavigation} {...props} />
					<Drawer.Screen name="Favorites" component={FavoriteStackNavigation} />
					<Drawer.Screen name="MyOrders" component={OrdersStackNavigation} />
					<Drawer.Screen name="MyNotifactions" component={NotificationStackNavigation} />
					<Drawer.Screen name="ContactUs" component={ContactUsStackNavigation} />
					{/* <Drawer.Screen name="Refer" component={ ReferStackNavigation} /> */}
					<Drawer.Screen name="MyAccount" component={MyAccountStackNavigation} />
					<Drawer.Screen name="MyAuth" component={AuthStackNavigation} />
					<Drawer.Screen name="TermsConditions" component={TermsAndConditionStackNavigation} />
				</Drawer.Navigator>
			</NavigationContainer>
		</>
	)
}

export default DrawerNavigation
