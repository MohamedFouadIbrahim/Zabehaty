import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";

export const styles = StyleSheet.create({
	withoutContainer: {
		justifyContent: "space-between",
		flexDirection: "row",
		width: "100%",
		//marginVertical: 20,
		height: 50,
		alignItems: "center",
		paddingHorizontal: 30
	},
	hr: {
		borderBottomWidth: 1,
		borderBottomColor: myColors.lightgray,
		marginHorizontal: 25,
	},
	selected: {
		textDecorationLine: 'line-through'
	}
});
