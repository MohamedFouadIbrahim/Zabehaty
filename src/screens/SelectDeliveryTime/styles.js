import { StyleSheet } from "react-native";
import { w, h, calcFont, fullHeight } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";


export const styles = StyleSheet.create({

    container: {
		flex: 1,
        paddingHorizontal: 20
    },
    currentDayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.111111,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: '#E4E4E4',

        marginTop: 20,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginRight: 10,
        marginBottom: 20,
		height: 40
    },
    currentDayText: {
        fontFamily: myfonts.TajwalMedium,
        color: myColors.blackGray,
        fontSize: 18
    },
    dayText: {
        fontFamily: myfonts.TajwalMedium,
        color: myColors.green3,
        paddingHorizontal: w(20),
        fontSize: calcFont(16)
    },
    oneTimeContainer: {
        alignItems: 'center',
        paddingHorizontal: w(20)
    },
    rangeText: {
        fontFamily: myfonts.TajwalMedium,
        color: myColors.blackGray,
        paddingHorizontal: w(10),
        fontSize: 16
    },
    oneTimeSeprator: {
        height: h(1),
        backgroundColor: '#E4E4E4',
        marginVertical: h(20)
    },
    closeHeaderContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: h(10)
    },
    closeHeaderText: {
        fontFamily: myfonts.TajwalRegular,
        color: myColors.blackGray,
        fontSize: calcFont(20),
    },
    closeHeaderImage: {
        marginHorizontal: w(20),
        marginTop: h(5)
    },
    closeHeaderSeprator: {
        height: h(1), backgroundColor: '#E4E4E4', marginTop: h(5)
    },
    scollViewContaiser: {
        backgroundColor: myColors.white,
        paddingTop: h(20)
    },
    scollViewContainerView:{
		backgroundColor: myColors.white
        //height: (fullHeight() - h(10))
    },
    activityIndicator:{
        flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
    },
    timesContentContainerStyle:{
        //marginTop: h(30)
    }
});
