import { StyleSheet, Platform } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont, } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { Spacing } from "../../styles/spacing";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.white,
        justifyContent:'space-between'
    },
    subViewContainer: {
		flex: 1,
        paddingHorizontal: Spacing.mediumPagePaddingHorizontal,
        paddingBottom: h(10),
		alignItems: 'flex-start'
    },
	contactWrapper: {
		width: "100%",
		borderWidth: 1,
		borderColor: '#DADADA',
		borderRadius: 8,
		padding: 10
	},
	sendToText: {
		fontFamily: myfonts.TajwalRegular,
		fontSize: 12,
		color: '#9E9E9E'
	},
	contactContainer: {
		borderWidth: 1,
		borderColor: "#DADADA",
		borderRadius: 8,
		padding: 10,
		margin: 10,
		display: 'flex',
		flexDirection: 'row'
	},
	conImg: {
		width: 50,
		height: 50,
		backgroundColor: '#5855FE20',
		borderRadius: 8,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	conText: {
		fontFamily: myfonts.TajwalBlack,
		fontSize: 16,
		color: '#5855FE'
	},
	contactInfo: {
		flex: 1,
		alignItems: 'flex-start',
		paddingStart: 10
	},
	amountInfo: {
		width: 80,
		alignItems: 'center',
		justifyContent: 'center'
	},
	amountText: {
		fontFamily: myfonts.TajwalBold,
		fontSize: 14,
		color: '#01003C'
	},
	contactName: {
		fontFamily: myfonts.TajwalRegular,
		fontSize: 14,
		color: '#01003C'
	},
	contactNumber: {
		fontFamily: myfonts.TajwalBold,
		fontSize: 14,
		color: '#16572C'
	},
	input: {
        fontFamily: myfonts.TajwalBlack,
		width: "100%",
        height: 40,
		color: "#000000",
		textAlign: 'right'
    },
    titleText:{
		fontFamily: myfonts.TajwalRegular,
        fontSize: 15
    },
    profileText: {
        color: myColors.white,
        fontSize: calcFont(18),
        marginHorizontal: h(10),
        // marginBottom : Platform.OS == 'android' ? h(10): 0
    },
    wihteImage:{
        tintColor: myColors.white,
        marginTop: Platform.OS == 'android' ? h(8) : 0
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: myColors.green3,
        padding: 15,
    },

	checkBtn: {
		backgroundColor: "#16572C",
		width: 52,
		height: 30,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center"
	},
	checkBtnText: {
		color: "#FFFFFF",
		fontFamily: myfonts.TajwalBold,
		fontSize: 12
	}
});
