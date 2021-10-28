import { StyleSheet } from "react-native";
import { w, h } from "../../mutils";
import { myColors } from "../../styles/myColors";

export const styles = StyleSheet.create({
	facebookAndGoogle: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
		marginBottom: 10,
		width: 200,
		alignSelf: "center",
	},
	google: {
		borderColor: myColors.red1,
		color: myColors.red1,
		marginEnd: 5
	},
	googleText: {
		color: myColors.red1,
	},
	facbookImageStyle: {
		width: 13,
		height: 26
	},
	GoogleImageStyle: {
		width: 29,
		height: 21
	},
	AppleImageStyle: {
		width: 29,
		height: 21
	},
	apple: {
		borderColor: myColors.black,
		backgroundColor: myColors.black,
		marginEnd: 5
	},
	facebook: {
		marginEnd: 5
	},
});
