import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont, fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: myColors.white,
        flex: 1
    },
    downLoadContainer: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor: myColors.green3,
        justifyContent: 'center', alignItems: 'center',
        marginHorizontal: w(20),
        marginVertical: h(10),
        padding: 10,
        borderRadius: 5
    }
});
