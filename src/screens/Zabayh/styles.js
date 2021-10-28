import { StyleSheet } from "react-native";
import { w, h, calcFont, fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
	},
	offersTitle: {
		fontSize: calcFont(24),
		fontFamily: myfonts.TajwalBold,
		marginHorizontal: 20,
		alignSelf: 'flex-start'
	},
	zabayhTitle: {
		fontSize: calcFont(24),
		fontFamily: myfonts.TajwalBold,
		marginHorizontal: 20,
		alignSelf: 'flex-start'
	},
	allProductsTitle: {
		fontSize: calcFont(24),
		fontFamily: myfonts.TajwalBold,
		marginHorizontal: 20,
		alignSelf: 'flex-start'
	},
	marginTop: {
		marginTop: 30
	},
	card: {
		width: 327,
		height: 213,
		// borderWidth: 1,
		borderColor: myColors.green4,
		borderRadius: 10,
		alignSelf: "center",
	},
	PlayContainer: {
		position: "absolute",
		alignContent: "flex-end",
		bottom: 0,
		color: myColors.white,
		alignSelf: "center",
		width: "100%",
		height: h(70),
		borderWidth: 1,
		borderColor: myColors.green4,
		backgroundColor: myColors.white,
		borderBottomLeftRadius: w(10),
		borderBottomRightRadius: w(10),
	},
	advertismentImg: {
		alignSelf: "center",
		marginVertical: h(15),
	},
	titleContainer: {
		alignItems: "flex-start",
		width: fullWidth(),
		height: 50,
		backgroundColor: myColors.lightgray,
		justifyContent: 'center',
		marginBottom: 10
	}
});
