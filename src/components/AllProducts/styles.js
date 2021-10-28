import { StyleSheet } from "react-native";
import { w, h, calcFont, calculateHalfWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";
import MurmurHash3 from "imurmurhash";
import { BackgroundColor } from "chalk";

export const styles = StyleSheet.create({
	cellContainer: {
		flex: 1,
		// marginBottom: 10,
		alignItems: 'center',
		justifyContent: "space-between",
	},
	deparmentCard: {
		width: calculateHalfWidth(10),
		minHeight: 280,
		borderRadius: 10,
		borderColor: myColors.green3,
		borderWidth: 1,
		backgroundColor: myColors.white,
		marginBottom: 20,
		overflow: "hidden",
		elevation: 5,

	},
	departmentImage: {
		width: "100%",
		height: 200,
		//height: "80%",
		/*flex: 3,*/
		resizeMode: "cover"
		// backgroundColor:"orange"
	},
	ProdiscountContainer: {
		backgroundColor: myColors.blue2,
		width: w(52),
		height: h(24),
		borderRadius: w(10),
		marginTop: 10,
		marginEnd: 20,
		alignSelf: "flex-end",
	},
	discountText: {
		textAlign: "center",
		fontSize: calcFont(14),
		color: myColors.white,
	},

	departmentInfoTexts: {
		width: "95%",
		//height: "25%",
		flex: 1,
		alignSelf: "center",
		textAlign: "center",
		justifyContent: "center",
		alignItems: "center"
	},
	title1Text: {
		fontSize: 20,
		lineHeight: 30,
		textAlign: "center",
		color: myColors.green3,
		fontFamily: myfonts.TajwalBold,
	},
	title2Text: {
		fontSize: 12,
		textAlign: "center",
		color: myColors.green3,
		fontFamily: myfonts.TajwalBold,
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
