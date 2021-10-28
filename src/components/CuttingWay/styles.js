import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";
import MurmurHash3 from "imurmurhash";
import { BackgroundColor } from "chalk";

export const styles = StyleSheet.create({
	deparmentCard: {
		flex: 1,
		width: 191,
		height: 250,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		borderColor: myColors.green3,
		borderWidth: 1,
		backgroundColor: myColors.white,
		marginHorizontal: 10,
		overflow: 'hidden'
	},
	selectedCard: {
		backgroundColor: myColors.yellow1
	},
	departmentImage: {
		width: "100%",
		height: "80%",
		resizeMode: "cover",
		position: 'relative'
	},
	discountTexts: {
		position: 'absolute',
		top: 0,
		end: 0,
		backgroundColor: myColors.green3,
		width: 52,
		height: 24,
		borderBottomStartRadius: 10,
		alignSelf: "flex-end",
	},
	discountText: {
		textAlign: "center",
		fontSize: calcFont(14),
		color: myColors.white,
	},

	departmentInfoTexts: {
		width: "100%",
		height: "20%",
		alignItems: "center",
		justifyContent: "space-around",
		flexDirection: "row",
		paddingHorizontal: 15
	},
	titleText: {
		fontSize: calcFont(10),
		textAlign: "center",
		color: myColors.green3,
		fontFamily: myfonts.TajwalBold,
	},
	suitbleText: {
		fontSize: calcFont(10),
		textAlign: "center",
		color: myColors.gray3,
		fontFamily: myfonts.TajwalBold,
	},
});
