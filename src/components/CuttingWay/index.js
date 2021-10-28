import React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
} from "react-native";
import { icons } from "../../assets/index";
import { styles } from "./styles";

const CuttingWay = ({ title, departmentImage, onVideoPress, isSelected, onSelect }) => {
	console.log(departmentImage)
	return (
		<TouchableOpacity style={[ styles.deparmentCard, (isSelected) ? styles.selectedCard : {} ]} activeOpacity={0.9} onPress={ onSelect }>
			<View style={styles.departmentImage}>
				<Image source={{ uri: departmentImage }} style={{ resizeMode: "cover", width: "100%", height: "100%"}} />
				{ /*<View style={styles.discountTexts}>
					<Text style={styles.discountText}>{title}</Text>
				</View>*/ }
			</View>
			{ /*<ImageBackground resizeMode={ "cover" } source={{ uri: departmentImage }} style={styles.departmentImage}>
				<View style={styles.discountTexts}>
					<Text style={styles.discountText}>{title}</Text>
				</View>
			</ImageBackground>*/ }
			<View style={styles.departmentInfoTexts}>
				<TouchableOpacity style={{ flex: 1 }} activeOpacity={ 0.6 } onPress={ onVideoPress }>
					<Image source={icons.watchvideo} />
				</TouchableOpacity>
				<View style={{ flex: 3 }}>
					<Text numberOfLines={ 2 } style={styles.titleText}>{title}</Text>
					{ /*<Text style={styles.suitbleText}>{strings("Suitable To Keep")}</Text>*/ }
				</View>
			</View>
		</TouchableOpacity>
	);
};

export { CuttingWay };
