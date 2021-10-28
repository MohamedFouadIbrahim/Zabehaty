import { StyleSheet } from "react-native";
import { h, w } from "../../mutils/";
import { myColors } from "../../styles/myColors";

export const styles = StyleSheet.create({
	container: {
		width: w(335),
		height: h(54),
		backgroundColor: myColors.white,
		alignItems: "center",
		flexDirection: "row",
		borderWidth: h(1),
		borderTopWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderBottomColor: myColors.gray1,
		borderRadius: h(6),
		fontWeight: "normal",
		alignSelf: "center",
		marginRight: w(15),
	},
	imgStyle: {
		width: w(18),
		/*height: h(18),*/
		resizeMode: "contain"
	},
	inputStyle: {
		paddingLeft: w(10),
		width: w(310),
		minHeight: 40,
		textAlign: "auto"
	},
});
