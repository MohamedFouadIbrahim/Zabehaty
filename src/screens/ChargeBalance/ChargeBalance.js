import React, { useState, useEffect, useRef } from "react"
import { SafeAreaView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

// CONSTAMTS
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys"

const ChargeBalance = ({ navigation, route }) => {

    let webView = useRef()

    const {
        params: {
            amount
        }
    } = route

	const [userToken, setUserToken] = useState("")

	useEffect(() => {
		userData()
	}, [])

	const userData = async () => {
		try {
			const userData = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.UserData)

			console.log("UserData")
			console.log(userData)
			if (userData) {
				const userObj = JSON.parse(userData)
				setUserToken(userObj.token)
			}
		} catch (e) {
			// saving error
			console.log(e)
		}
	}

    const _onNavigationStateChange = (webViewState) => {

        // console.log(webViewState)
        // console.log(webViewState.url)
        // if (webViewState.url.includes(`payment/return/${orderId}`)) {
        // 	console.log("HERE")
        // 	if (!webViewState.loading) {
        // 		// Check page content
        // 		console.log("HEREEEEE")
        // 		console.log(webView.current)
        // 		webView.current.injectJavaScript(`
        // 			window.ReactNativeWebView.postMessage(document.getElementById('status').innerHTML);
        // 		`)
        // 		/*
        // 		alert("document.getElementById('status').innerHTML");
        // 		setJsCode(`setTimeout(
        // 			function() {
        // 				alert("Hello! I am an alert box!!");
        // 				window.ReactNativeWebView.postMessage(document.getElementById('status').innerHTML);
        // 			}, 1000)`)*/
        // 	}
        // }

    }

    const _onMessage = (event) => {

        if (event?.nativeEvent?.data === "success") {
            navigation.popToTop()
            navigation.navigate('MyBalance')
        } else if (event?.nativeEvent?.data === "failed") {
            // navigation.popToTop()
            // navigation.jumpTo('MyOrders', { screen: 'MyOrders' })
        }

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
			{
				(userToken !== "" &&
					<WebView
						ref={webView}
						source={{
							uri: `https://v3-testing.zabe7ti.website/public/api/user/balance/payment?amount=${amount}`,
							headers: {
								'Authorization': `Bearer ${userToken}`,
							},
							method:"GET"
						}}
						onNavigationStateChange={_onNavigationStateChange}
						javaScriptEnabled={true}
						domStorageEnabled={true}
						onMessage={(event) => _onMessage(event)}
						enableApplePay={true}
					/>
				)
			}
        </SafeAreaView>
    )
}

export { ChargeBalance };

