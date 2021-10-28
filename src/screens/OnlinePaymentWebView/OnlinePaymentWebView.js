import React, { useState, useEffect, useRef } from "react"
import { SafeAreaView, View, ActivityIndicator, I18nManager, TouchableOpacity } from "react-native"
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OnlinePaymentWebView = ({ navigation, route }) => {
	let webView = useRef()
	const {
		params:{
			onBack
		}
	} = route

	const [orderId, setOrderId] = useState(route.params.orderId)
	const [jsCode, setJsCode] = useState("")


	useEffect(() => {
		console.log(`https://v3-testing.zabe7ti.website/public/payment?order_id=${orderId}`)
	}, [orderId])

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.8}
					style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}
					onPress={() => {
						if (onBack) {
							onBack()
						} else {
							navigation.popToTop()
							navigation.jumpTo('MyHome', { screen: 'Home' })
						}
					}}
				>
					<Ionicons
						name={(I18nManager.isRTL) ? 'arrow-forward-outline' : 'arrow-back-outline'}
						color={'#000000'}
						size={25}
					/>
				</TouchableOpacity>
			)
		})
	}, [])

	const _onNavigationStateChange = (webViewState) => {
		console.log(webViewState)
		console.log(webViewState.url)
		if (webViewState.url.includes(`payment/return/${orderId}`)) {
			console.log("HERE")
			if (!webViewState.loading) {
				// Check page content
				console.log("HEREEEEE")
				console.log(webView.current)
				webView.current.injectJavaScript(`
					window.ReactNativeWebView.postMessage(document.getElementById('status').innerHTML);
				`)
				/*
				alert("document.getElementById('status').innerHTML");
				setJsCode(`setTimeout(
					function() {
						alert("Hello! I am an alert box!!");
						window.ReactNativeWebView.postMessage(document.getElementById('status').innerHTML);
					}, 1000)`)*/
			}
		}
	}

	const _onMessage = (event) => {
		console.log("HEREEE 111")
		console.log(event.nativeEvent.data)
		if (event.nativeEvent.data === "success") {
			console.log("Success")
			navigation.navigate('SucessfulOrder')
		}else if (event.nativeEvent.data === "failed") {
			console.log("Failed")
			navigation.popToTop()
			navigation.jumpTo('MyOrders', { screen: 'MyOrders' })
		}
	}

	return (
		//`https://v3.zabe7ti.website/public/payment?order_id=${orderId}`
		//`https://v3.zabe7ti.website/public/payment/return/${orderId}`
		<SafeAreaView style={{ flex: 1 }}>
			<WebView
				ref={ webView }
				source={{ uri: `https://v3.zabe7ti.website/public/payment?order_id=${orderId}` }}
				onNavigationStateChange={_onNavigationStateChange}
				javaScriptEnabled = {true}
				domStorageEnabled = {true}
				onMessage={ (event) => _onMessage(event) }
				enableApplePay={ true }
				//injectedJavaScript={jsCode ? jsCode : undefined}
			/>
		</SafeAreaView>
	)
}

export { OnlinePaymentWebView }
