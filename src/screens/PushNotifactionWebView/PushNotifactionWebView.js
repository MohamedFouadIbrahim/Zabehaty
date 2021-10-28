import React, { useEffect, useRef } from "react"
import { SafeAreaView, I18nManager, TouchableOpacity } from "react-native"
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PushNotifactionWebView = ({ navigation, route }) => {
	let webView = useRef()
	const {
		params:{
			link
		}
	} = route

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.8}
					style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}
					onPress={() => {
						navigation.popToTop()
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

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<WebView
				ref={ webView }
				source={{ uri: link }}
				javaScriptEnabled = {true}
				domStorageEnabled = {true}
				enableApplePay={ true }
			/>
		</SafeAreaView>
	)
}

export { PushNotifactionWebView }
