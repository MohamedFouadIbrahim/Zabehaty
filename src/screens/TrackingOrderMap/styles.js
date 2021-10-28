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
        color: myColors.blackGray,
        fontSize: calcFont(18)
    },
    dirverContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: myColors.white,
        position: 'absolute',
        // right: 0,
        alignSelf:'center',
        bottom: 30
    },
    dirverRowContainer: {
        alignItems: 'center',
        padding: 20,
    },
    dirverInfoRowContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginHorizontal: h(20)
    },
    textsContainer: {
        justifyContent: 'center', alignItems: 'center',
    },
    onWayText: {
        color: '#505050',
        fontSize: calcFont(12)
    },
    imageRowContainer: {
        alignItems: 'center',
        marginTop: h(5),
    },
    numberText: {
        color: myColors.green3, fontSize: calcFont(12)
    },
    driveTimeText: {
        color: "#ACACAC",
        fontSize: calcFont(11)
    },
    driveTimeTextValue: {
        color: myColors.green3, marginTop: h(5),
    },
    cartBackHeaderContainer: {
        margin: 15,
    },
    mapContainer: {
        height: h(Dimensions.get('screen').height / 1.4),
        backgroundColor: myColors.white
    },
    currentLocationButton: {
        position: 'absolute',
        right: 0,
        // bottom: h(100)
        bottom:0
    },
});
