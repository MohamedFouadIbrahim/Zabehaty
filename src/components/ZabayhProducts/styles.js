import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";

export const styles = StyleSheet.create({
	zabayhCard: {
		width: 140,
		height: 140,
		marginHorizontal: w(10),
		backgroundColor: myColors.yellow1,
		borderRadius: 20,
		marginBottom: 10,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		elevation: 5,
	},
	zabayhImage: {
		borderRadius: 20,
		overflow: 'hidden',
		width: "100%",
		height: "100%",
		alignItems: "flex-start",
		resizeMode: "cover"
	},
	titleText: {
		fontSize: calcFont(14),
		fontFamily: myfonts.TajwalBold,
		margin: 10
	},
});
