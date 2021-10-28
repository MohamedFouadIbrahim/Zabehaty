import { StyleSheet } from "react-native";
import { w, h, calcFont, fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end'
    },
    mainContainer: {
        backgroundColor: myColors.white,
        paddingVertical: h(20),
        borderRadius: 10
    },
    subContainer: {
        paddingHorizontal: w(20)
    },
    topText: {
        alignSelf:'center',
        color:'#404040'
    },
    ratingContainer: {
        alignSelf: 'center',
        marginVertical: h(5)
    },
    checkBoxText: {
        fontFamily: myfonts.TajwalRegular,
        paddingHorizontal: 1,
        color:'#A6A6A6'
    },
    checkBoxContainer: {
        width: w(150),
        borderWidth:0,
        backgroundColor:'white'

    },
    checkBoxListContainer:{
        alignItems: 'center'
    },
    suggestionsTextInput: {
        height: h(50),
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#A6A6A6',
        margin: 10,
        color: '#A6A6A6',
        paddingHorizontal: w(5)
    },
    buttonsRow: {
        justifyContent: 'space-between',
        marginHorizontal: w(20)
    },
    cancelContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#125624',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: h(10),
        padding: 5,
        width: w(140)
    },
    cancelText: {
        color: '#125624'
    },
    submitContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#125624',
        marginTop: h(10),
        padding: 5,
        width: w(140)
    },
    submitText: {
        color: myColors.white
    },
});
