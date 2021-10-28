import React, { useState } from "react";
import { styles } from "./styles";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import FastImage from "react-native-fast-image";
import { icons } from "../../assets";
import { myColors } from "../../styles";

// Helpers
import { strings } from '../../i18n';

const Step4 = () => {
	return (
		<View style={styles.container}>
			<FastImage source={icons.onBoard4} style={styles.followbg}

			/>
			<View style={styles.textsStyle}>
				<Text style={styles.followText}>{ strings("Donate to charitable organizations") }</Text>
				<Text style={styles.connectingText}>
					{ strings("QuranAya") }
				</Text>
			</View>
		</View>
	);
};

export { Step4 };
