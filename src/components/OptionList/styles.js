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
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:w(20),
        paddingVertical:h(8)
    },
    cardTextActive:{
        fontSize: calcFont(16),
        fontFamily: myfonts.TajwalBold,
        color:myColors.black,
        paddingHorizontal:7,
        fontWeight:'bold',
    },
    cardText:{
        fontSize: calcFont(16),
        fontFamily: myfonts.TajwalBold,
        paddingHorizontal:7,
        color:myColors.black,
    },
    image:{
        width:w(15),
        height:h(15)
    },
    price:{
        fontSize: calcFont(16),
        fontFamily: myfonts.TajwalBold,
        paddingHorizontal:5,
        color:"#72A15D"
    }
});
