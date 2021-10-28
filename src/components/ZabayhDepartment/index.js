import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
	Text,
	Image,
	View,
	TouchableOpacity
} from "react-native";
import { styles } from "./styles";
const ZabayhDepartment = ({ obj, isSelected, onPress, cartItems }) => {
	console.log(cartItems)

	const [numberOfItems, setNumberOfItems] = useState(0)

	useEffect(() => {
		let numOfItems = 0
		if (cartItems && cartItems.length > 0) {
			cartItems.forEach(item => {
				if (item.details) {
					numOfItems += item.details.length
				}
			})
		}
		setNumberOfItems(numOfItems)
	}, [cartItems])

	return (
		<View style={styles.all}>
			<TouchableOpacity style={styles.ZabayahCard} activeOpacity={0.4} onPress={ () => onPress(obj) }>
				<View style={[styles.ZabayahDepartImgContainer, (isSelected) ? styles.selectedCard : {} ]}>
					<Image source={{ uri: obj.icon }} style={ styles.ZabayahDepartImg } />
				</View>
				<Text style={styles.titleText}>{obj.name}</Text>
			</TouchableOpacity>
			{
				(numberOfItems > 0 &&
					<View style={styles.notificationBadge}>
						<Text style={styles.notificationBadgeText}>{ numberOfItems }</Text>
					</View>
				)
			}
		</View>
	);
};

export { ZabayhDepartment };
