import { Platform } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.white
    },
    headerText: {
        fontFamily: myfonts.TajwalRegular,
        fontSize: calcFont(20),
        marginTop: Platform.OS == 'ios' ? h(5) : h(0),
        color: myColors.blackGray
    },
    headerRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: w(20),
        marginVertical: h(5),
        marginTop: h(10)
    },
    orderDetailsContainer: {
        borderRadius: 2,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor: myColors.lightgray,
        padding: 10,
        margin: 15
    },
    orderText: {
        fontSize: calcFont(18),
        color: myColors.blackGray
    },
    orderTextContainer: {
        alignItems: 'center'
    },
    orderTextValue: {
        fontSize: calcFont(20),
        color: myColors.blackGray,
        marginHorizontal: w(10),
    },
    orderSummaryText: {
        color: '#667EEA',
        fontSize: calcFont(18)
    },
    labelRow: {
        alignItems: 'center',
        width: w(Dimensions.get('screen').width / 1.5),
        justifyContent: 'space-between',
    },
    labelText: {
        color: myColors.green3,
        fontSize: calcFont(15),
    },
    buttonContainer: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor: myColors.white,
        minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        height: 30,
        paddingHorizontal: 5,
        marginHorizontal: w(10),
        //padding: 5,
        //paddingTop: Platform.OS == 'ios' ? h(3) : h(0),
        borderWidth: 1,
    },
    buttonText: {
        fontSize: calcFont(12)
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        margin:20
    },
    buttomText: {
        color: '#6D6D6D',
        fontSize: calcFont(12),
        alignSelf: 'center',
        marginTop: h(20),
        paddingHorizontal: w(10)
    },
    contentContainerStyle: {
        backgroundColor: myColors.white,
        paddingVertical: h(20),
    },
    stepIndicatorContainer: {
        paddingHorizontal: w(20),
        paddingVertical: h(20),
        height: Dimensions.get('screen').height / 2
    },
    orderItemContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal: w(10),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        // borderWidth:1
    },
    orderItemTextContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#F5F5F5',
        // backgroundColor: 'white',
        shadowColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: h(5)
    },
    orderItemText: {
        // color: 'black'
		alignSelf: 'flex-start'
    },
    itemRowContainer: {
        paddingHorizontal: w(15),
        flex: 1,
        justifyContent: 'space-between',
    },
    itemImage: {
        marginTop: h(15)
    },
    itemText: {
        // marginTop: h(15),
        marginHorizontal: w(10),
		alignSelf: 'flex-start'
    },
    greenButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: myColors.green3,
        marginHorizontal: h(10),
        height: 60,
        marginTop: h(40)
    },
    greenButtonText: {
        color: myColors.white,
    },
    whiteButtonText: {
        color: '#555555',
    },
    whiteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: h(10),
        height: 60,
        marginTop: h(20),
        borderWidth: 1,
        borderColor: '#B3B3B3',
        marginBottom: h(5)
    },
    headerItemContainer: {
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        backgroundColor: myColors.lightgray,
        paddingHorizontal: h(10),
        marginVertical: h(15),
        marginHorizontal: w(15),
        paddingVertical: h(10)
    },
    productImage: {
        width: w(100),
        height: h(100),
        borderRadius: 10,
    },
    attributesText: {
        fontSize: calcFont(8),
    },
    attributesValue:{
        fontSize: calcFont (10)
    },
    infoText:{
        color: '#16162E'
    }
});
export const stepIndicatorStyles = {
    stepIndicatorSize: 20,
    stepStrokeWidth: 4,
    stepStrokeCurrentColor: myColors.gary0,
    stepStrokeColor: myColors.gary0,
    stepStrokeFinishedColor: myColors.gary0,
    stepStrokeUnFinishedColor: myColors.gary0,
    separatorStrokeWidth: 4,
    separatorFinishedColor: myColors.gary0,
    separatorUnFinishedColor: myColors.gary0,
    stepIndicatorCurrentColor: myColors.white,
    stepIndicatorFinishedColor: myColors.white,
    stepIndicatorUnFinishedColor: myColors.white,
    currentStepStrokeWidth: 4,
    currentStepIndicatorSize: 20
}
