import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
const SignIn = ({ title, socialImage, style, txtstyle, imageStyle, onPress }) => {
	return (
		<TouchableOpacity activeOpacity={0.4} style={[styles.signInSocial, style]} onPress={ onPress }>
			<Image source={socialImage} style={[styles.socialImage, imageStyle]} />
			{ /*<Text style={[styles.socialText, txtstyle]}>{title}</Text>*/ }
		</TouchableOpacity>
	);
};

export { SignIn };
