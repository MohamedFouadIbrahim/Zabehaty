import { StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { calcFont, fullWidth, h, w } from "../../mutils";
import { myColors } from "../../styles";

const styles = StyleSheet.create({
	slideContainer: {
		flex: 1,
		backgroundColor: myColors.black,
		position: 'relative',
		alignItems: 'flex-start'
	},
	slideStyle: {
		overflow: "hidden",
		alignItems: "center",
		// height: h(373),
	},
	modal: {
		margin: 0,
	},
	pageControlContainer: {
		width: fullWidth(),
		height: 56,
		position: 'absolute',
		bottom: 25,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 20
	},
	skip: {
		height: 30,
		justifyContent: "center",
		alignItems: "center"
	},
	endskip: {
		height: h(30),
		position: "absolute",
		top: 60,
		end: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	next: {
		width: h(56),
		height: h(56),
		borderRadius: h(8),
		borderColor: myColors.white,
		borderWidth: h(1),
		borderRadius: w(28),
		justifyContent: "center",
		alignItems: "center",
	},
	next2: {
		width: h(56),
		height: h(56),
		borderRadius: h(8),
		borderRadius: w(28),
		backgroundColor: myColors.green,
		justifyContent: "center",
		alignItems: "center",
	},
	skipText: {
		fontSize: calcFont(16),
		color: myColors.white,
		fontFamily: myfonts.TajwaRegular
	},
	endskipText: {
		fontSize: calcFont(16),
		color: myColors.white,
		fontFamily: myfonts.TajwalBold,
	},
	getStartedText: {
		color: myColors.white,
		fontSize: calcFont(14),
	},
	getStarted: {
		width: w(311),
		height: h(41),
		position: "absolute",
		bottom: h(-40),
		backgroundColor: myColors.blue,
	},

	container: {
		// backgroundColor: colors.cool_blue,
		alignItems: "center",
		flex: 1,
	},
	contentStyle: {
		marginLeft: w(0),
		width: w(275),
	},
	logoStyle: {
		alignSelf: "center",
	},
	welcome: {
		marginVertical: h(14),
		fontSize: calcFont(20),
		color: myColors.gray1,
		width: w(275),
		textAlign: "center",
	},
	pagination: {
		width: 70
	},
	endpagination: {
		width: 70,
		marginStart: 20,
	}
});
export default styles;
