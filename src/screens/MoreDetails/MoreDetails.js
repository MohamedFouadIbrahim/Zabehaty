import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	I18nManager,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
	Dimensions,
	BackHandler,
	RefreshControl
} from "react-native";

// Helpers
import { strings } from "../../i18n";
import { Header } from "../../components/Header";
import { useNavigation } from "@react-navigation/core";
import { FlatList } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TajwalRegular } from '../../components';

// Helpers
import APIKit from "../../utils/APIKit";
import { styles } from "./styles";
import { h, w } from "../../mutils";
import { AirbnbRating } from 'react-native-ratings';

const MoreDetails = ({ route, navigation, }) => {
	const { navigate, goBack } = useNavigation();
	const [shopData, setShopData] = useState(undefined)

	useEffect(() => {
		console.log(route.params)
		if (shopData) {
			navigation.setOptions({
				headerTitle: () => (
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<TajwalRegular style={{ fontSize: 20 }}>{shopData.name}</TajwalRegular>
					</View>
				),
				headerRight: () => (
					<View></View>
				)
			})
		}
	}, [shopData])
	useEffect(() => {
		setShopData(route.params.shopData)
		console.log("in more", route.params.shopData);
		BackHandler.addEventListener("hardwareBackPress", () => {
			navigation.goBack()
			return true;
		});
	}, []);

	const card = (item) => {
		return (
			<>
				<View style={styles.CardContainer}>
					<Text style={styles.cardText}>{item.key}</Text>
					<Text style={styles.cardText}>{item.value}</Text>
				</View>
				<View style={styles.boredr} />
			</>
		)
	}
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

			{shopData && <ScrollView style={styles.container}>
				<View style={styles.header}>
					<Image
						source={{ uri: shopData.image }}
						style={styles.zabehaheaderimg}
						resizeMode={"cover"}
					/>
					<View style={{ paddingHorizontal: w(20) }}>
						<Text style={styles.headerTitle}>{shopData.name}</Text>
						<Text style={styles.headerDesc}>{shopData.description}</Text>

					</View>
				</View>
				<FlatList
					style={{ paddingTop: h(20) }}
					data={shopData.info}
					renderItem={({ item }) => (
						card(item)
					)}
					keyExtractor={(item, index) => index + ""}
					showsHorizontalScrollIndicator={false}
				/>
				<>
					<View style={styles.CardContainer}>
						<Text style={styles.cardText}>{strings("Rating")}</Text>
						<AirbnbRating
							count={5}
							defaultRating={(shopData.rating) ? shopData.rating : 0}
							size={15}
							selectedColor='#215904'
							showRating={false}
							isDisabled={true}
						/>
					</View>
					<View style={styles.boredr} />
				</>
			</ScrollView>}
		</SafeAreaView>
	);
};

export { MoreDetails };
