import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import { strings } from "../../i18n";

const WeightAge = ({ isSelected, weight, age, price, oldPrice, onPress }) => {
	return (
		<TouchableOpacity style={{ marginBottom: 20 }} activeOpacity={0.9} onPress={onPress}>
			<View style={[styles.weightContainer, (isSelected) ? styles.selectedBG : {}]}>
				<Text style={[styles.weight, (isSelected) ? styles.selected : {}]}>{weight}</Text>
				<Text style={[styles.age, (isSelected) ? styles.selected : {}]}>{age}</Text>
				<View style={ styles.priceContainer }>
					<Text style={[styles.priceTxt, (isSelected) ? styles.selected : {}]}>{ price } { strings("AED") }</Text>
					{
						(oldPrice &&
							<Text style={styles.priceBeforeTxt}>{ oldPrice } { strings("AED") }</Text>
						)
					}
				</View>
				{ /*<Text style={styles.sameStyle}>{age}</Text>*/}
			</View>
		</TouchableOpacity>
	);
};

export { WeightAge };
