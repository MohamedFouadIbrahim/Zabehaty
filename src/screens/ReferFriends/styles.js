import { I18nManager, StyleSheet } from "react-native";
import { w, h, calcFont, fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
	},
	title: {
		fontFamily: myfonts.TajwalBold,
		fontSize: 20,
		marginHorizontal: w(25),
		color: '#2F2F2F',
		marginTop: h(23)
	},
	subTitle: {
		fontFamily: myfonts.NunitoSansRegular,
		fontSize: 14,
		marginHorizontal: w(25),
		color: '#2F2F2F'
	},
	stepTitle: {
		fontFamily: myfonts.TajwalBold,
		fontSize: 14,
		color: '#58595B'
	},
	stepSubTitle: {
		fontFamily: myfonts.TajwalRegular,
		fontSize: 10,
		color: '#58595B',
		width: w(75),
		textAlign: 'center',
		lineHeight:15
	},
	referIcon: {
		marginTop: h(17),
		marginHorizontal: h(126)
	},
	input: {
		width: w(326),
		backgroundColor: '#FAFAFA',
		borderColor: myColors.green3,
		borderWidth: 1,
		borderRadius: 8,
		alignSelf: 'center',
		paddingHorizontal: w(21),
		textAlign: I18nManager.isRTL?'right':'left'

	},
	button: {
		backgroundColor: myColors.green3,
		width: w(326),
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		marginVertical: h(27),
		height: h(55),
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,

		elevation: 2,
	},
	buttonText: {
		color: myColors.white,
		justifyContent: 'center',
		alignItems: 'center'
	},
	checkMess: {
		marginHorizontal: w(6),
		width: w(272),
		// textAlign: 'center',
		fontSize: 14,
		fontFamily: myfonts.TajwalMedium
	},
	referrd: {
		borderColor: '#F1F1F1',
		borderRadius: 8,
		marginVertical: 20,
		marginHorizontal: w(25),
		paddingVertical: h(22),
		borderWidth: 1
	},
	referredText: {
		fontFamily: myfonts.NunitoSansRegular,
		fontSize: 12,
		color: '#DADADA'
	},
	nameCapital: {
		fontFamily: myfonts.NunitoSansRegular,
		fontSize: 16,
		color: '#DADADA'
	},
	name: {
		fontFamily: myfonts.NunitoSansRegular,
		fontSize: 14,
		color: '#01003C'
	},
	code: {
		fontFamily: myfonts.NunitoSansRegular,
		fontSize: 12,
		color: myColors.green3,
	},
	nameBox:{
		width:w(43),
		height:w(43),
		alignItems:'center',
		justifyContent:'center'
	}
});
