import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import React, { useEffect, useState } from "react";
import { Settings } from "react-native-fbsdk-next";
import { Provider } from "react-redux";
import ApplicationContainer from "./navigation";
import configureStore from './Redux/configureStore';
import ASYNC_STORAGE_KEYS from "./utils/AsyncStorageKeys";
import { PersistGate } from 'redux-persist/integration/react'
import { initGoecoding } from "./utils";

const {
	store,
	persistor
} = configureStore()


const App = () => {
	// const persistor = persistStore(store);
	const [pushNotificationOpened, setPushNotificationOpened] = useState(false)
	const [pushNotificationData, setPushNotificationData] = useState(undefined)



	useEffect(() => {
		Settings.initializeSDK();
		initGoecoding()
	}, []);

	useEffect(() => {
		if (pushNotificationOpened) {
			setTimeout(() => {
				setPushNotificationOpened(false)
			}, 2000)
		}
	}, [pushNotificationOpened])

	useEffect(() => {
		// Assume a message-notification contains a "type" property in the data payload of the screen to open

		messaging().onNotificationOpenedApp( async (remoteMessage) => {
			console.log("Alaa 11")
			console.log(remoteMessage)
			if (remoteMessage.data) {
				setPushNotificationData(remoteMessage.data)
			}
			setPushNotificationOpened(true)

			//await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.OpenedPushNotification, "Open");
			/*console.log(
				'Notification caused app to open from background state:',
				remoteMessage.notification,
			);*/
			//navigation.navigate(remoteMessage.data.type);
		});

		// Check whether an initial notification is available
		messaging()
			.getInitialNotification()
			.then( async (remoteMessage) => {
				console.log("Alaa 112")
				console.log(remoteMessage)
				if (remoteMessage) {
					await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.OpenedPushNotification, "Open");
					await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.PushNotificationData, remoteMessage.data)
				}

				/*if (remoteMessage) {
					console.log(
						'Notification caused app to open from quit state:',
						remoteMessage.notification,
					);
					//setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
				}
				setLoading(false);*/
			});
	}, []);


	const requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			getFcmToken();
			console.log("Authorization status:", authStatus);
		}
	};

	useEffect(() => {
		requestUserPermission();
	}, []);

	const getFcmToken = async () => {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
			try {
				await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.FirebaseToken, fcmToken);
			} catch (e) {
				// saving error
				console.log(e);
			}
			console.log(fcmToken);
			console.log("Your Firebase Token is:", fcmToken);
		} else {
			console.log("Failed", "No token received");
		}
	};

	const _onBeforeLift = () => { }

	return (
		<Provider store={store}>

			<PersistGate
				loading={null}
				// onBeforeLift={_onBeforeLift}
				persistor={persistor}
			>
				<ApplicationContainer
					pushNotification={ pushNotificationOpened }
					pushNotificationData={ pushNotificationData }
				/>
			</PersistGate>

		</Provider>
	);
};

export default App;
