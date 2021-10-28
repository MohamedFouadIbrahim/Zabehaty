import React, { useState, useEffect } from "react";
import { Image, Text, View, TextInput, TouchableOpacity, I18nManager } from "react-native";
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { calcFont, h } from "../../mutils";
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { myColors } from "../../styles/myColors";
import { useNavigation } from "@react-navigation/core";

type Props = {
	title: String,
	backColor: String,
	hideback: True | False,
	goBack: Function,
}

export const Header = (props: Props) => {
	const { hideback = false, title ,backColor} = props;
	const { navigate ,goBack} = useNavigation();

	useEffect(() => {
		console.log("prosp in the headre ::>>", props);
	}, [])

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.backContainer}
			onPress={() => {
				goBack()
			}}
		>
			<Icon
				name={(I18nManager.isRTL) ? 'arrow-forward-outline' : 'arrow-back-outline'}
				color={backColor?backColor:myColors.white}
				size={25}
			/>
			<Text style={styles.title}>{title}</Text>

		</TouchableOpacity>
	)
};
