import React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	I18nManager,
} from "react-native";
import { styles } from "./styles";
import { strings } from "../../i18n";
const PackagingProduct = ({ title, description, price, departmentImage, isSelected, onSelect }) => {
	console.log({ title, description, price, departmentImage, isSelected, onSelect })
	return (
		<View style={styles.cellContainer}>
			<TouchableOpacity style={[ styles.deparmentCard, (isSelected) ? styles.selectedCard : {} ]} activeOpacity={0.9} onPress={ onSelect }>
				<View style={styles.departmentImage}>
					<Image source={{ uri: departmentImage }} style={{ resizeMode: "cover", width: "100%", height: "100%"}} />
					<View style={[styles.ProdiscountContainer, price && { paddingHorizontal: 10 }]}>
						<Text style={styles.discountText}>{ (price) ? `${price} ${strings("AED")}` : strings("Free")}</Text>
					</View>
				</View>
				<View style={styles.departmentInfoTexts}>
					<Text style={styles.title1Text}>{title}</Text>
					<Text style={styles.title2Text}>{description}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export { PackagingProduct };
