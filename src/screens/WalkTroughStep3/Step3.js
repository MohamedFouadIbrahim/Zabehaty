import React, { useState } from "react";
import { I18nManager, Text, View, TouchableOpacity, ScrollView, Image, Platform } from "react-native";
import FastImage from "react-native-fast-image";
import { icons } from "../../assets";
import { myColors } from "../../styles";

import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";

// Helpers
import { strings } from '../../i18n';

const Step3 = () => {
	return (
		<View style={styles.container}>
			<View style={{ alignItems: (Platform.OS === 'ios') ? "flex-start" : "flex-end" }}>
				<Image source={icons.seabg} style={[ styles.seabg, (I18nManager.isRTL) ? RTL_STYLES.walkthroughtStep3seabg : LTR_STYLES.walkthroughtStep3seabg ]} />
				<Image source={icons.onBoard3} style={[ styles.bgrestaurant, (I18nManager.isRTL) ? RTL_STYLES.walkthroughtStep3bgrestaurant : LTR_STYLES.walkthroughtStep3bgrestaurant ]} />
				<Image source={icons.greenlogo} style={styles.logoImg} />
			</View>
			<View style={styles.textsStyle}>
				<Text style={[styles.nearText, (I18nManager.isRTL) ? { textAlign: "right" } : { textAlign: "left" } ]}>{ strings("Your sacrifice with mine") }</Text>
				<Text style={[styles.addingText1, styles.samStyle, (I18nManager.isRTL) ? { textAlign: "right" } : { textAlign: "left" } ]}>
					{ strings("You can book your sacrifice through the app") }
				</Text>
			</View>
		</View>
	);
};

export { Step3 };
