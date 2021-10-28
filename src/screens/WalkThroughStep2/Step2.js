import React, { useState } from "react";
import { I18nManager, Text, View, TouchableOpacity, ScrollView, Image, Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import FastImage from "react-native-fast-image";
import { icons } from "../../assets";
import { myColors } from "../../styles";

import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";

// Helpers
import { strings } from '../../i18n';

const Step2 = () => {
	const { navigate } = useNavigation();
	return (
		<View style={styles.container}>
			<View style={{ alignItems: (Platform.OS === 'ios') ? "flex-end" : "flex-start" }}>
				<Image source={icons.seabg} style={[ styles.seabg, (I18nManager.isRTL) ? RTL_STYLES.walkthroughtStep2seabg : LTR_STYLES.walkthroughtStep2seabg ]} />
				<Image source={icons.onBoard2} style={[ styles.Productsbg, (I18nManager.isRTL) ? RTL_STYLES.walkthroughtStep2Productsbg : LTR_STYLES.walkthroughtStep2Productsbg ]} />
				<Image source={icons.greenlogo} style={styles.logoImg} />
			</View>
			<View style={styles.textsStyle}>
				<Text style={styles.freshText}>{ strings("The best kind of carcasses") }</Text>
				<Text style={styles.shoppingText1}>
					{ strings("Zabihati application provides you with all kinds of sacrifices") }
				</Text>
			</View>
		</View>
	);
};

export { Step2 };
