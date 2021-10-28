import { StyleSheet } from "react-native";
import { h } from "../../mutils";
import { myColors } from "../../styles/myColors";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: myColors.green3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: h(50)
    },
    text: {
        color: myColors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
