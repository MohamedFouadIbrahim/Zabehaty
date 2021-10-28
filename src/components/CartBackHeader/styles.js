import { StyleSheet } from "react-native";
import { myColors } from "../../styles";
import { w } from '../../mutils';
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
    deliverOptionsText: {
        marginHorizontal: w(5),
        fontFamily: myfonts.TajwalRegular,
        color: myColors.blackGray
    },
    image: {
        tintColor: '#404040'
    },
    container: {
        alignItems: 'center'
    }
});
