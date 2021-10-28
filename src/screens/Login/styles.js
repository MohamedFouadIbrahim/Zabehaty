import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";

export const styles = StyleSheet.create({
	container: {
		//backgroundColor: myColors.white
	},
	signInContent: {
		paddingStart: 20,
	},
	welcomeText: {
		fontSize: calcFont(24),
		color: myColors.green,
		fontFamily: myfonts.TajwalBlack,
	},
	titles: {
		alignItems: "flex-start",
		marginVertical: 10,
	},
	emailOrPhoneContainer: {
		alignItems: "flex-start",
		marginTop: 10,
	},
	mailPhoneStyle: {
		borderBottomColor: myColors.green2,
	},
	passwordStyle: {
		borderBottomColor: myColors.green2,
	},
	emailOrPhoneText: {
		color: myColors.black,
		fontSize: calcFont(12),
		fontFamily: myfonts.TajwalRegular,
	},
	passwordText: {
		color: myColors.black,
		fontSize: calcFont(12),
		marginTop: h(12),
		textAlign: "left",
		fontFamily: myfonts.TajwalRegular,
	},

	forgetPasswordContainer: {
		alignItems: "flex-start",
		marginVertical: h(30),
	},
	forgetPasswordText: {
		color: myColors.black,
		fontSize: calcFont(12),
		fontFamily: myfonts.TajwalRegular,
	},
	signupAndsignin: {
		justifyContent: "space-between",
		flexDirection: "row",
		height: 45,
		alignItems: "center",
	},
	signup: {
		fontSize: calcFont(14),
		width: w(355) / 2,
		alignItems: "flex-start",
	},
	createAccount: {
		fontSize: calcFont(14),
		fontFamily: myfonts.TajwalBold,
	},
	signinImg: {
		width: w(197),
		height: h(50),
		borderTopLeftRadius: w(50),
		borderBottomLeftRadius: w(50),
		resizeMode: "cover"
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
	pointer: {
		marginLeft: w(40),
	}
});
