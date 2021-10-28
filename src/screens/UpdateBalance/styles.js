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
    input: {
        // marginTop: h(10),
        fontFamily: myfonts.TajwalRegular,
        backgroundColor: myColors.white,
        height: 40,
		width: "100%",
        borderRadius: 5,
		color: "#000000",
        paddingHorizontal: Spacing.pagePaddingHorizontal
    },
    subViewContainer: {
		flex: 1,
        paddingHorizontal: Spacing.mediumPagePaddingHorizontal,
        paddingBottom: h(10),
		alignItems: 'flex-start'
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
});
