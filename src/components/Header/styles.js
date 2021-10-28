import { myColors } from "../../styles/myColors";
import { Platform, StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont } from "../../mutils";


export const styles = StyleSheet.create({
    title: {
        fontSize: calcFont(18),
        fontFamily: myfonts.TajwalBold,
        paddingHorizontal:w(110),
        color:myColors.white,
    },
    backContainer: {
        height: 50,
        flexDirection:'row',
        position: 'absolute',
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
        left: 10,
        top: 5,
    },
});
