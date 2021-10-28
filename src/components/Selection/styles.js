import { myColors } from "../../styles/myColors";
import { Platform, StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont } from "../../mutils";


export const styles = StyleSheet.create({
    container: {

    },
    quantity: {
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
    cardRow: {
        paddingHorizontal: w(10),
        paddingVertical: h(10),
        marginHorizontal: w(5)
    },
    cardRowActive:{
        paddingHorizontal: w(15),
        paddingVertical: h(10),
        marginHorizontal: w(5),
        backgroundColor:myColors.green3,
        borderRadius:w(25)
    },
    cardView: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginHorizontal:w(5),
        alignSelf:'center'
    },
    cardTextActive: {
        fontSize: calcFont(16),
        fontFamily: myfonts.TajwalBold,
        color: myColors.white,
        fontWeight: 'bold'
    },
    cardText: {
        fontSize: calcFont(16),
        fontFamily: myfonts.TajwalBold,
        color: myColors.black
    },
    image: {
        width: w(15),
        height: h(15)
    }
});
