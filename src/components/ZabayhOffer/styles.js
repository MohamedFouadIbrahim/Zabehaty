import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
export const styles = StyleSheet.create({
	all: {
	},
	offerCard: {
		marginBottom: h(20),
	},
	discountTexts: {
		position: "absolute",
		//backgroundColor: myColors.blue2,
		top: h(20),
		end: w(0),
		zIndex: 3,
		minWidth: 52,
		height: 24,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center"
	},
	discountText: {
		textAlign: "center",
		fontSize: calcFont(14),
		color: myColors.white,
	},

	offerImg: {
		borderRadius: 20,
		width: "100%",
		height: 280,
		zIndex: 1,
		overflow: "hidden"
	},
	textsContainer: {
		position: "absolute",
		bottom: 0,
		backgroundColor: myColors.gray4,
		width: "100%",
		height: 67,
		zIndex: 2,
		opacity: 0.4,
		borderBottomEndRadius: 20,
		borderBottomStartRadius: 20
	},
	firsttitle: {
		fontSize: calcFont(18),
		fontFamily: myfonts.TajwalBold,
		color: myColors.white,
		textAlign: "center",
		zIndex: 4,
		position: "absolute",
		bottom: h(35),
		alignSelf: "center",
	},
	secondtitle: {
		fontSize: calcFont(12),
		fontFamily: myfonts.TajwalBold,
		color: myColors.white,
		textAlign: "center",
		zIndex: 4,
		position: "absolute",
		bottom: h(10),
		width: w(200),
		alignSelf: "center",
	},
});
