import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { AuthInput, FacebookAndGoogle } from "../../components";
import { styles } from "./styles";
import { icons } from "../../assets";
import { myColors } from "../../styles";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/core";
const InputCountry = ({
	isImgComponent,
	currencycountryicon,
	currencytruemarkIcon,
	countryText,
	second,
	thirdflag,
	thirdText,
	emirateCountry,
	otherCountry,
	spaceCountry,
	saudiaText,
	emirateText,
	flagcontainer,
	onSelect
}) => {
	const { navigate } = useNavigation();

	return (
		<>
			<TouchableOpacity
				activeOpacity={0.9}
				style={[emirateCountry, otherCountry, spaceCountry]}
				onPress={ onSelect }
			>
				<View style={styles.all}>
					<View style={[flagcontainer]}>
						{
							(isImgComponent) ?
								<View style={{ height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
									{ currencycountryicon }
								</View>
								:
								<Image
									source={currencycountryicon}
									style={[styles.currencyCountImg, second, thirdflag]}
								/>
						}
					</View>
					<Text style={[emirateText, thirdText, saudiaText]}>
						{countryText}
					</Text>
					<View style={{ width: 40, height: 30 }}>
						<Image
							source={currencytruemarkIcon}
							style={styles.currencyTruemarkImg}
						/>
					</View>
				</View>
			</TouchableOpacity>
		</>
	);
};

export { InputCountry };
