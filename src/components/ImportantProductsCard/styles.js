import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";
import MurmurHash3 from "imurmurhash";
import { BackgroundColor } from "chalk";

export const styles = StyleSheet.create({
	importantcard: {
		width: 150,
		minHeight: 200,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginHorizontal: 5,
		backgroundColor: myColors.white,
	},
	productImageContainer: {
		borderWidth: 1,
		borderColor: myColors.green,
		borderRadius: 5,
		width: "100%",
		height: 220,
		backgroundColor: myColors.white,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.25,
		elevation: 5
	  },
	  productImage: {
		resizeMode: "cover",
		width: "100%",
		height: "100%",
		borderRadius: 4,
	  },
	priceText: {
		fontFamily: myfonts.TajwalBlack
	},
	oldPriceText: {
		fontFamily: myfonts.TajwalBlack,
		color: myColors.red1,
		fontSize: 12,
		textDecorationLine: 'line-through'
	},
	productInfoTexts: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		width: "100%",
		marginStart: 6,
		marginTop: 10
	},
	descText: {
		textAlign: 'left',
		marginTop: 2,
		fontFamily: myfonts.TajwalRegular,
		color: "#6A6A6A",
		fontSize: 14
	},
	titleText: {
		textAlign: 'left',
		marginTop: 2,
		fontFamily: myfonts.TajwalRegular,
		color: myColors.black,
		fontSize: 16,
		lineHeight: 22
	},
	badgeContainer: {
		minWidth: 50,
		marginBottom: 10,
		height: 25,
		backgroundColor: "#0175fe",
		justifyContent: 'center',
		paddingHorizontal: 10
	},
	badgeText: {
		color: "#FFFFFF",
		fontFamily: myfonts.TajwalRegular,
		fontSize: 13,
	}
});
