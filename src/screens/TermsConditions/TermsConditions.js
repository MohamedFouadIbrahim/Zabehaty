import React, { useState, useEffect } from "react"
import { SafeAreaView, View, ActivityIndicator, I18nManager, TouchableOpacity } from "react-native"
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';

import APIKit from "../../utils/APIKit";

import { myColors } from "../../styles";

const TermsConditions = ({ navigation }) => {

	const [loading, setLoading] = useState(true)

	const [termsData, setTermsData] = useState("")

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.8}
					style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}
					onPress={() => {
						navigation.goBack()
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

	useEffect(() => {
		fetchTermsAndConditions()
	}, [])

	const fetchTermsAndConditions = async () => {
		const response = await APIKit.get('terms')
		console.log("Terms And Conditions")
		console.log(response)
		if (response.data.status === 200) {
			setTermsData(response.data.data)
			setLoading(false)
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, position: 'relative' }}>
			{ /*<WebView
				onLoad={() => setLoading(false)}
				source={{ uri: `https://www.zabehaty.com/terms-conditions` }}
			/>*/ }

			{
				loading ?
					<View style={{ flex: 1, position: "absolute", top: 0, left: 0, width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center' }}>
						<ActivityIndicator size="large" color={myColors.green}  />
					</View>
					:
					<View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, backgroundColor: "#FFFFFF" }}>
						<WebView
							onLoad={ () => setLoading(false) }
							textZoom={200}
							source={{html: termsData.content}}
						/>
					</View>
			}

		</SafeAreaView>
	)
}

export { TermsConditions };
