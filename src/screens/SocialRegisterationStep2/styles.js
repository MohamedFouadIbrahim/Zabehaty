import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
	},
	scrollViewContainer: {
		marginBottom: 20
	},
	centerContent: {
		alignItems: "center",
		justifyContent: "center"
	},
	passwordsTexts: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: h(30),
		marginBottom: h(35),
	},
	confirmAction: {
		height: h(45),
		width: w(158),
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.green,
		borderTopLeftRadius: w(20),
		borderBottomLeftRadius: w(20),
		borderLeftWidth: h(1),
		alignSelf: "flex-end",
		marginTop: h(45),
	},
	entering: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	enteringText: {
		color: myColors.white,
		marginLeft: w(35),
		fontSize: calcFont(15),
		fontFamily: myfonts.TajwalBold,
	},
	pointer: {
		marginLeft: w(40),
	},
});
