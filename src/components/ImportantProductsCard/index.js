import React from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

import { styles } from "./styles";
import { strings } from "../../i18n";

const ImportantProducts = ({ price, title, desc, productImage, onPress, shop, badges, oldPrice }) => {
	return (
		<TouchableOpacity activeOpacity={ 0.8 } onPress={ onPress } style={styles.importantcard}>
			<View style={styles.productImageContainer}>
				<Image source={{ uri: productImage }} style={styles.productImage} />
				<View style={{ marginTop: 10, alignItems: 'flex-start', justifyContent: 'flex-start', position: 'absolute', top: 0 }}>
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
			</View>
			<View style={styles.productInfoTexts}>
				{
					(oldPrice &&
						<Text style={styles.oldPriceText}>{ oldPrice } {strings("AED")}</Text>
					)
				}
				<Text style={styles.priceText}>{price} {strings("AED")}</Text>
				<Text style={styles.titleText}>{title}</Text>
				<Text style={styles.descText}>{desc}</Text>
				<Text style={styles.descText}>{strings("From")} {(shop) ? shop : strings("Zabehaty")}</Text>

			</View>
		</TouchableOpacity>
	);
};

export { ImportantProducts };
