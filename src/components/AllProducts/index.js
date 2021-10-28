import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	I18nManager,
	Platform
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';


import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";


const AllProducts = ({ title1, title2, departmentImage, onPress, price, description, badges }) => {
	const { navigate } = useNavigation();
	return (
		<View style={styles.cellContainer}>
			<TouchableOpacity
				style={styles.deparmentCard}
				activeOpacity={0.8}
				onPress={onPress}
			>
				<ImageBackground
					source={{ uri: departmentImage }}
					style={styles.departmentImage}
					resizeMode={ 'cover' }
				>
					<View style={{ marginTop: 10, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
						{
							(badges && badges.map( (badge) => {
								return(
									<LinearGradient colors={ Array.isArray(badge.color) ? badge.color : [badge.color, badge.color]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} key={ badge.id } style={styles.badgeContainer}>
										<Text style={styles.badgeText}>{ badge.name }</Text>
									</LinearGradient>
								)
							}))
						}
					</View>
					{ /*<View style={styles.ProdiscountContainer}>
						<Text style={styles.discountText}>-50%</Text>
					</View>*/ }
				</ImageBackground>
				<View style={styles.departmentInfoTexts}>
					<Text style={[styles.title1Text]}>{title1}</Text>
					{title2!=="" && <Text style={styles.title2Text}>{title2}</Text>}
					{price && <Text style={styles.title2Text}>{price}</Text>}
					{description && <Text style={styles.title2Text}>{description}</Text>}

				</View>
			</TouchableOpacity>
		</View>
	);
};

export { AllProducts };
