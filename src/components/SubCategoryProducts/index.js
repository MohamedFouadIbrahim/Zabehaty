import React from "react";
import {
	Text,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { styles } from "./styles";


const SubCategoryProducts = ({ title, zabayhImage, onPress }) => {
	return (
		<TouchableOpacity
			style={styles.zabayhCard}
			activeOpacity={0.9}
			onPress={ onPress }
		>
			<ImageBackground source={{ uri: zabayhImage }} style={styles.zabayhImage}>
				<Text style={styles.titleText}>{title}</Text>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export { SubCategoryProducts };
