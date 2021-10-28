import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
		flex: 1,
		position: "relative"
	},
	bottom: {
		flex: 1,
		justifyContent: "flex-end",
		paddingBottom: 36
	},
	bottomContainer: {
		/*position: 'absolute',
		bottom: 0,
		backgroundColor: '#ffffff50',
		width: "100%",
		height: 180*/
	},
	currency: {
		textAlign: "center",
		fontSize: calcFont(12),
		fontFamily: myfonts.TajwalBold,
		color: myColors.white
	},
	flaContainer: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		marginBottom: h(25),
	},
	flagImg: { width: w(21), height: h(14), marginRight: w(8) },
	flagImgContainer: {
		width: w(21),
		height: h(14),
		marginEnd: 8,
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center'
	},
	countryText: {
		fontSize: calcFont(14),
		fontFamily: myfonts.TajwalRegular,
		color: myColors.white
	},
	changeLanguage: {
		fontSize: calcFont(14),
		fontFamily: myfonts.TajwalBold,
		color: myColors.white
	},
	countrySeparator: {
		color: myColors.white
	},
	languageContainer: {
		justifyContent: "space-around",
		flexDirection: "row",
		paddingHorizontal: w(25),
	},
	langButton: {
		width: w(154),
		height: 40,
		borderWidth: 1,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		borderColor: myColors.white,
	},
	langText: {
		color: myColors.white,
		textTransform: "uppercase",
		fontSize: calcFont(18),
		fontFamily: myfonts.TajwalBold
	},
});
