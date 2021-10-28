import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.white,
    },
    subContainer:{
        paddingHorizontal: w(20),
    },
    headerText: {
        fontFamily: myfonts.TajwalBold,
        fontSize: calcFont(15),
        color: myColors.blackGray,
		alignSelf: 'flex-start'
    },
    couponContainer: {
        marginTop: h(15)
    },
    couponRowContainer: {
        justifyContent: 'space-between',
    },
    couponTextContainer: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: myColors.green3,
        minWidth: '32%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: h(5),

        backgroundColor: myColors.white,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,

    },
    couponText: {
        color: myColors.green3,
        fontFamily: myfonts.TajwalBold,
        fontSize: calcFont(10)
    },
    applyText: {
        color: myColors.green3,
        fontFamily: myfonts.TajwalBold,
        fontSize: calcFont(15)
    },
    descretionText: {
        color: myColors.gray10,
        fontSize: calcFont(10),
        fontFamily: myfonts.TajwalBold,
        maxWidth: '60%',
        marginTop: h(10),
        marginHorizontal:h(10)
    },
    backHeaderText: {
        fontFamily: myfonts.TajwalRegular,
        color: myColors.blackGray,
        fontSize: calcFont(20),
        paddingHorizontal: w(5)
    },
    backHeaderContainer: {
        marginTop: h(10)
    },
    applyCouponContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#0D0C0C',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.111111,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: '#E4E4E4',
        marginTop: h(20),
        borderRadius: 10,
        paddingHorizontal: w(12),
        paddingVertical: Platform.OS == 'ios'? w(10): 0,
    },
    line: {
        marginTop: h(10),
        borderBottomColor: '#E4E4E4',
    },
    textInput: {
        maxWidth: '50%',
        color: myColors.blue6,
    },
    apply2Text: {
        fontFamily: myfonts.TajwalBold,
        color: myColors.blue6, opacity: 0.75
    },
    moreText: {
        fontFamily: myfonts.TajwalBold,
        color: myColors.blue6,
        marginTop: h(10)
    },
    contentContainerStyle: {
        marginTop: h(15),
        paddingHorizontal: w(20),
    }
});
