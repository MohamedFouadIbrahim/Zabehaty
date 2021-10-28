import { Platform, StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { calcFont, h, w } from "../../mutils";
import { myColors } from "../../styles/myColors";


export const styles = StyleSheet.create({
    fullContainer:{
            flex: 1,
            backgroundColor: myColors.white,
    },
    container: {
        flex: 1,
        //justifyContent: 'space-between',
		// flexDirection: 'column',
            // paddingHorizontal: w(15),
        paddingVertical: h(15),
    },
    noResult:{
        alignSelf:'center',
        fontFamily:myfonts.TajwalBold,
        fontSize:calcFont(18),
        marginVertical:h(50)
    }
});
