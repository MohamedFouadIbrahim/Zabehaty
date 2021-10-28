import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
	Text,
	Image,
	View,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { myColors } from "../../styles";
import { styles } from "./styles";


const ZabayhProducts = ({ title, zabayhImage, onPress ,isSelected}) => {
	console.log("is selected ::>>",isSelected);
	return (
		<TouchableOpacity
			style={[styles.zabayhCard, (isSelected) ? {borderColor:myColors.green3,borderWidth:2} : {}]}
			activeOpacity={0.9}
			onPress={ onPress }
		>
			<ImageBackground source={{ uri: zabayhImage }} style={styles.zabayhImage}>
				<Text style={styles.titleText}>{title}</Text>
			</ImageBackground>
			{ /*<Text style={styles.titleText}>{title}</Text>
			<Image source={{ uri: zabayhImage }} style={styles.zabayhImage} />*/ }
		</TouchableOpacity>
	);
};

export { ZabayhProducts };
