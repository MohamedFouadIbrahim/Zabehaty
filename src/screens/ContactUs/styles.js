import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";
import { Platform } from "react-native";

export const styles = StyleSheet.create({
	container: {
		//backgroundColor: myColors.white
		paddingVertical: h(20),
	},
	signInContent: {
		paddingBottom: 20,
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
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.green,
		borderRadius: w(20),
		marginTop: h(60),
		height: h(50),
		paddingHorizontal: w(50),
		alignSelf: 'center'
	},
	entering: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	enteringText: {
		color: myColors.white,
		fontFamily: myfonts.TajwalBold,
	},
	pointer: {
		marginLeft: w(40),
	},
	pickerContainer: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal:5,
		borderWidth:1,
		borderColor: myColors.green,
		alignSelf:'center',
		borderRadius:12,
		width:w(320),
		paddingTop:15,
		marginTop:h(30)

	},
	pickerText: {
		fontSize: calcFont(18),
		fontFamily: myfonts.TajwalRegular,
	},
	reasonsList: {
		paddingVertical: h(5),
		paddingHorizontal: w(10),
		width: w(310),
		borderTopWidth:0.5,
		alignSelf:'center',
		marginTop:10
	},
	touch: {
		flexDirection: 'row',
		marginTop: h(10),
		alignItems: Platform.OS == 'ios' ? 'baseline' : 'center'

	},
	input:{
		width: w(320),
		marginTop:h(30),
		backgroundColor: myColors.white,
		borderWidth: 1,
		borderColor: myColors.green,
		borderRadius: h(12),
		fontWeight: "normal",
		alignSelf: "center",

	},
	textInput:{
		width: w(320),
		height:h(130),
		padding:10,
		color: myColors.black,
		fontSize: 16,
		fontFamily: myfonts.TajwalRegular,
		alignSelf:'flex-start',
		textAlignVertical :'top',

	}
});
