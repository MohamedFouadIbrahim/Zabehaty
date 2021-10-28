import { StyleSheet } from "react-native";
import { h, w } from "../../mutils";
import { myColors } from "../../styles/myColors";

export const styles = StyleSheet.create({
	signInSocial: {
		justifyContent: "center",
		borderWidth: 1,
		borderColor: myColors.blue1,
		width: 50,
		height: 50,
		borderRadius: 25,
		alignItems: "center"
	},
	socialImage: {
		resizeMode: "center"
	},
	socialText: {
		color: myColors.blue1,
	},
});
