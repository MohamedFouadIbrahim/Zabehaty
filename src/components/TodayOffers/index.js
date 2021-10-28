import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { strings } from "../../i18n";

const TodayOffers = ({ price, desc, productImage, onPress }) => {
	return (
		<TouchableOpacity activeOpacity={ 0.8 } onPress={ onPress } style={styles.importantcard2}>
			<View style={styles.productImageContainer}>
				<Image source={{ uri: productImage }} style={styles.productImage} />
			</View>
			<View style={styles.productInfoTexts}>
				<Text style={styles.priceText}>{price} {strings("AED")}</Text>
				<Text style={styles.descText}>{desc}</Text>
			</View>
		</TouchableOpacity>
	);
};

export { TodayOffers };
