import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import { Platform } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: myColors.white,
        flex: 1
    },
    headerRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: w(20),
        marginTop: h(10)
    },
    headerText: {
        fontFamily: myfonts.TajwalRegular,
        fontSize: calcFont(20),
        marginTop: Platform.OS == 'ios' ? h(5) : h(0),
        color: myColors.blackGray
    },
    refreshRow: {
        alignItems: 'center',
        paddingHorizontal: w(20),
        marginTop: h(10),
        flexDirection:'row'
    },
    refreshText: {
        color: myColors.blue6,
        marginTop: Platform.OS == 'ios' ? h(5) : 0
    },
    refreshImage: {
        tintColor: myColors.blue6,
        marginHorizontal: w(10)
    },
    line: {
        marginTop: h(10),
        borderBottomColor: '#E4E4E4',
        marginHorizontal: w(20)
    },
    //////////////////////// order ///////////////

    productRowContainer: {
        alignItems: 'center',
        marginTop: h(10),
    },
    productRowImage: {
        width: 70,
        height: 55,
    },
    productRowText: {
        fontSize: calcFont(12),
        color: myColors.gray10,
        maxWidth: '70%',
        marginHorizontal: w(10)
    },
    oredrItemContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        padding: h(10),
        justifyContent: 'space-between',
        marginHorizontal: h(20),
        marginVertical: h(5),
        marginTop: h(20)
    },
    oredrItemStatusAndDateContainer: {
        padding: w(10),
        shadowColor: '#0D0C0C',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.111111,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: '#E4E4E4',
        borderRadius: 5,
    },
    oredrItemStatusAndDateRow: {
        justifyContent: 'space-between'
    },
    oredrItemOrderedOnText: {
        fontSize: calcFont(12),
        color: myColors.blackGray,
		alignSelf: 'flex-start',
		marginBottom: 5
    },
    oredrItemDateText: {
        fontSize: calcFont(10),
        color: myColors.blue6,
    },
    oredrItemStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: w(10),
        borderRadius: 10
    },
    checkImage: {
        tintColor: myColors.white,
        marginHorizontal: w(5)
    },
    statusText: {
        fontSize: calcFont(9),
        color: myColors.white
    },
    productListContainer: {
        marginHorizontal: w(5)
    },
    productHeaderText: {
        fontSize: calcFont(12),
        color: myColors.blackGray2,
        marginTop: h(5),
        marginHorizontal: w(5),
		alignSelf: 'flex-start'
    },
    productFooterContainer: {
        marginVertical: h(10),
        marginHorizontal: w(5),
    },
    productFooterText: {
        fontSize: calcFont(12),
        color: myColors.blue6
    },
    productFooterRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    productFooterImage: {
        marginHorizontal: w(2),
        marginTop: Platform.OS == 'ios' ? h(2) : 0
    },
    priceInfoContainer: {
        borderBottomColor: '#BBB8B8',
        borderTopColor: '#BBB8B8',
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
        justifyContent: 'space-between',
        paddingHorizontal: w(10),
        paddingTop: h(5),
        paddingBottom: h(10)
    },
    titleInfoText: {
        color: myColors.green3,
		alignSelf: 'flex-start',
		marginBottom: 5
    },
    titleValueText: {
        color: myColors.gray10,
		alignSelf: 'flex-start',
    },
    reportAProblemContainer: {
        alignItems: 'center',
        // alignSelf: 'flex-end',
        marginTop: h(5),
        flexDirection: 'row'
    },
    reportAProblemText: {
        color: '#FF4D4D',
        fontSize: calcFont(14),
        marginTop: Platform.OS == 'android'? h(5): h(8),
        marginHorizontal: w(5),
    }
});
