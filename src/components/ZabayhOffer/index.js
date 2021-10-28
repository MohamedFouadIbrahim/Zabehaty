import React from "react";
import {
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	I18nManager,
} from "react-native";
import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";

const ZabayhOffer = ({ title1, title2, offerImage, badge, badgeBackgroundColor }) => {
	return (
		<View style={styles.all}>
			<TouchableOpacity activeOpacity={0.8} style={styles.offerCard}>
				<View
					style={[
						styles.discountTexts,
						I18nManager.isRTL ? RTL_STYLES.discountTexts : styles.discountTexts,
						{ backgroundColor: badgeBackgroundColor }
					]}
				>
					<Text style={styles.discountText}>{badge}</Text>
				</View>
				<ImageBackground source={{ uri: offerImage }} style={styles.offerImg}>
					{(title1 || title2) && <View style={styles.textsContainer}></View>}
					<Text style={styles.firsttitle}>{title1}</Text>
					<Text style={styles.secondtitle}>{title2}</Text>
				</ImageBackground>
			</TouchableOpacity>
		</View>
	);
};

export { ZabayhOffer };
