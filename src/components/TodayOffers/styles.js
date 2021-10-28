import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";

export const styles = StyleSheet.create({
	importantcard2: {
		width: 150,
		minHeight: 270,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginHorizontal: 5,
		marginBottom: 10
	},
	productImageContainer: {
		borderWidth: 1,
		borderColor: myColors.green,
		borderRadius: 5,
		width: "100%",
		height: 200,
		backgroundColor: myColors.white,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.25,
		elevation: 5
	},
	productImage: {
		resizeMode: "cover",
		width: "100%",
		height: "100%"
	},
	priceText: {
		fontFamily: myfonts.TajwalBlack
	},

	productInfoTexts: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginLeft: 6,
		marginTop: 10
	},
	descText: {
		textAlign: 'left',
		marginTop: 2,
		fontFamily: myfonts.TajwalRegular,
		fontSize: 16
	},
	advertismentImg: {
		marginVertical: h(50),
	},
});
