import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";

export const styles = StyleSheet.create({
	
    entering: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	enteringText: {
		color: myColors.white,
		marginLeft: w(35),
		fontFamily: myfonts.TajwalBold,
	},
    imageContainer: {
		height: h(45),
		width: w(355) / 2,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.green,
		borderTopLeftRadius: w(20),
		borderBottomLeftRadius: w(20),
		borderLeftWidth: h(1),
		alignSelf: "flex-end",
		marginTop: h(45),
	},
    pointer: {
		marginLeft: w(40),
	},
});
