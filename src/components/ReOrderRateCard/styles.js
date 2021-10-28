import { myColors } from "../../styles/myColors";
import { Platform, StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont } from "../../mutils";


export const styles = StyleSheet.create({
    frame: {
        borderRadius: 16,
        borderWidth: 1,
        borderColor: myColors.green3,
        marginHorizontal:w(8)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: w(11),
        paddingVertical: h(20),
    },
    title: {
        fontSize: calcFont(16),
        fontFamily: myfonts.SegoeUISemibold,
        color: myColors.black,
    },
    price: {
        fontSize: calcFont(13),
        fontFamily: myfonts.TajwalRegular,
        color: '#6E7191',
    },
    reOrder: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reOrderText: {
        fontSize: calcFont(14),
        fontFamily: myfonts.SegoeUISemibold,
        color: myColors.green3,
        alignSelf:'center',
        marginVertical:h(11)
    },
    refreshImage: {
        tintColor: myColors.green3,
        marginHorizontal: w(5)
    },
    more: {
        fontSize: calcFont(10),
        fontFamily: myfonts.TajwalRegular,
        color: '#6E7191',
    },
    description: {
        fontSize: calcFont(10),
        fontFamily: myfonts.SegoeUISemibold,
        color: myColors.black,
    }
});
