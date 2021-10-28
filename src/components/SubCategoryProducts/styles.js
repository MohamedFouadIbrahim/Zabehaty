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
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		elevation: 5,
	},
	zabayhImage: {
		width: 140,
		height: 140,
		resizeMode: "cover",
		borderRadius: 20,
		overflow: 'hidden',
		alignItems: 'flex-start',

	},
	titleText: {
		fontSize: calcFont(14),
		fontFamily: myfonts.TajwalBold,
		color: myColors.white,
		margin: 10,
	},
});
