import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";

export const styles = StyleSheet.create({
	weightContainer: {
		width: 140,
		height: 120,
		backgroundColor: myColors.lightgray,
		borderRadius: w(20),
		justifyContent: "center",
		alignItems: "center",
		padding: 15,
		marginHorizontal: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	sameStyle: {
		fontSize: calcFont(17),
		fontFamily: myfonts.TajawalLight,
		textAlign: 'center',
		color: myColors.black
	},
	weight: {
		fontSize: calcFont(17),
		fontFamily: myfonts.TajwalRegular,
		textAlign: 'center',
		color: myColors.black
	},
	age: {
		fontSize: calcFont(15),
		fontFamily: myfonts.TajawalLight,
		textAlign: 'center',
		color: myColors.black
	},
	selectedBG: {
		backgroundColor: myColors.green,
	},
	selected: {
		color: myColors.white
	},
	priceContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	priceTxt: {
		fontFamily: myfonts.TajwalBold,
		fontSize: 17,
		color:myColors.black
	},
	priceBeforeTxt: {
		color: myColors.red1,
		textDecorationLine: 'line-through',
		fontSize: 10,
		fontFamily: myfonts.TajwalBold
	}
});
