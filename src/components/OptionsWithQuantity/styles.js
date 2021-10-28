import { myColors } from "../../styles/myColors";
import { Platform, StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont } from "../../mutils";


export const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        width: w(375),
        height: 40,
        fontSize: calcFont(13),
        fontFamily: myfonts.TajwalBold,
        //marginTop: h(20),
        //marginBottom: h(15),
        backgroundColor: myColors.lightgray,
        lineHeight: 40
    },
    titleText: {
        fontSize: calcFont(18),
        color: myColors.black,
        fontFamily: myfonts.TajwalBold,

    },
    details: {
        fontSize: calcFont(16),
        color: myColors.black,
        fontFamily: myfonts.TajwalMedium,
    },
    greenContainer: {
        borderRadius: 5,
        width: w(100),
        paddingVertical: 3,
        borderWidth:1,
        borderColor:myColors.green3,
        alignItems: 'center',
        marginVertical:10
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: w(20),
        paddingVertical: h(8)
    },
    addReduceContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: h(15),
    },
    cardTextActive: {
        fontSize: calcFont(16),
        fontFamily: myfonts.TajwalBold,
        color: myColors.black,
        paddingHorizontal: 7,
        fontWeight: 'bold',
    },
    addContainer: {
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 3,
        alignItems: 'center',
    },
    cardText: {
        fontSize: calcFont(16),
        fontFamily: myfonts.TajwalBold,
        paddingHorizontal: 7,
        color: myColors.blackGray2
    },
    image: {
        width: w(120),
        height: h(120),
        borderRadius: 12,
    },
    quantityNum: {
        fontSize: calcFont(16),
        paddingHorizontal: 10,
    }
});
