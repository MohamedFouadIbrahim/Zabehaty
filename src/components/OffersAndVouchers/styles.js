import { myColors } from "../../styles/myColors";
import { Platform, StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont } from "../../mutils";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: myColors.gray9,
        marginTop: h(20),
        borderWidth: 1,
        borderColor: 'rgba(151,151,151,0.1)',
    },
    headerTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        fontFamily: myfonts.TajwalBold,
		lineHeight: 18
    },
    line: {
        borderBottomColor: 'rgba(151,151,151,0.2)',
        borderBottomWidth: 1,
    },
    secoundContainer: {
        paddingHorizontal: w(15),
        paddingBottom: h(20)
    },
    browseVouchersContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#E4E4E4',
        marginTop: h(20),
        marginBottom: h(30),
        justifyContent: 'space-between',
        paddingHorizontal: w(20),
        marginHorizontal: w(5),
        alignItems: 'center',
        paddingVertical: w(10),
        borderRadius: 5,
    },
    browseVouchersText: {
        fontFamily: myfonts.TajwalBold,
        color: myColors.green3,
        fontSize: calcFont(12),
		lineHeight: 16
    },
    selectedVoucherConatiner: {
        justifyContent: 'space-between',
        paddingHorizontal: w(10),
        backgroundColor: 'white',
        alignItems: 'center',
        paddingVertical: Platform.OS == 'android' ? 0 : h(10),
        borderColor: myColors.green3,
        borderWidth: 1,
        borderRadius:12

    },
    selectedVoucherText: {
		fontFamily: myfonts.TajwalRegular,
        color: '#080808',
        width: '50%',
        fontSize: 16,


    },
    deleteText: {
        fontFamily: myfonts.TajwalBlack,
        color: myColors.green3,
        // marginTop: h(5)
    },
    infoContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: h(15)
    },
    infoText: {
        fontFamily: myfonts.TajwalBold,
        color: '#080808',
        fontSize: calcFont(14),
		textAlign: 'left',
		lineHeight: 18
    },
    infoValueText: {
        fontFamily: myfonts.TajwalBold, color: '#080808',
    },
    giftedContainer: {
        backgroundColor: '#EBFEE0',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginTop: h(15)
    },
    giftedText: {
        fontFamily: myfonts.TajwalRegular,
        color: myColors.green3,
        paddingHorizontal: w(10),
        fontSize: calcFont(12),
        marginTop: h(5)
    },
    discountText: {
        fontFamily: myfonts.TajwalBold,
        color: '#FF5A5A',
        fontSize: calcFont(16)
    },
    taxesIncldedText: {
        fontFamily: myfonts.TajwalRegular,
        fontSize: calcFont(8),
        color: "#080808",
        marginTop: h(1),
		lineHeight: 12
    },
    taxesincludedRow: {
        alignItems: 'center',
    }
});
