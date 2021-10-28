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
	textFieldContainer: {
		paddingHorizontal: 10,
		marginTop: 15,
		borderRadius: 8,
		backgroundColor: "#FAFAFA",
		borderWidth: 1,
		borderColor: "#F1F1F1",
		height: 60,
		width: "100%",
		alignItems: "center"
	},
	input: {
		flex: 1,
        fontFamily: myfonts.TajwalRegular,
		width: "100%",
        height: "100%",
        borderRadius: 5,
		color: "#000000"
    },
    titleText:{
        marginTop: h(5),
        marginHorizontal: w(5),
        fontSize: calcFont(15)
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
