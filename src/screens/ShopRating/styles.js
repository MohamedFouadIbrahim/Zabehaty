import { StyleSheet, Platform } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont, } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { Spacing } from "../../styles/spacing";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.white
    },

    subContainer: {
        paddingHorizontal: 20,
        flex: 1
    },
    textColor: {
        color: "#505F79"
    },
    logoContainer: {
        alignSelf: 'center', alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#C1C7D0",
        borderRadius: 5,
        minHeight: 120,
        marginBottom: 40,
        padding: 10
    }
});
