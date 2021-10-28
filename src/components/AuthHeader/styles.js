import { StyleSheet } from "react-native";

// Helpers
import { w, h, calcFont, calcHeaderBorderRadius } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
	logo: {
		width: "100%",
		//height: 280,
		position: "relative"
	},
	grassBGContainer: {
		resizeMode: "cover",
		position: "relative",
		left: "-10%",
		width: "120%",
		height: 200,
		//borderBottomLeftRadius: calcHeaderBorderRadius(1.2, 50),
		//borderBottomRightRadius: calcHeaderBorderRadius(1.2, 50),
		overflow: "hidden"
	},
	grassBG: {
		width: "100%",
		height: "100%",
	},
	logoContainer: {
		position: "absolute",
		bottom: 10,
		left: (w(375) / 2) - 71,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.white,
		width: 142,
		height: 142,
		borderRadius: 71,
		// ios shadow
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		// android shadow
		elevation: 10,
	},
	skip: {
		position: "absolute",
		top: h(45),
		right: w(30),
	},
	skipText: {
		color: myColors.white,
		fontSize: calcFont(14),
		fontFamily: myfonts.TajwalBold,
	}
});
