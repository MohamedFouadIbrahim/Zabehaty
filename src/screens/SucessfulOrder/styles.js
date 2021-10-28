import { StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";

export const styles = StyleSheet.create({

    conatiner: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: myColors.white
    },
    topContainer: {
        alignItems: 'center', marginTop: '30%'
    },
    orderWasSuccessfullyCompletedText: {
        fontFamily: myfonts.TajwalBold,
        fontSize: calcFont(20),
        color: myColors.blackGray,
        marginTop: h(30),
        maxWidth: '90%',
    },
    youCanFollowOrderText: {
        fontFamily: myfonts.TajwalRegular,
        fontSize: calcFont(14),
        color: '#656565',
        maxWidth: '90%',
        lineHeight: h(20),
        marginTop: h(10)
    },
    followOrderButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: h(15),
        backgroundColor: myColors.gray9,
        marginHorizontal: w(20),
        borderRadius: 7,
        shadowColor: myColors.gray4,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    followOrderText: {
        fontFamily: myfonts.TajwalRegular,
        fontSize: calcFont(18),
        color: myColors.green3
    },
    backToAppButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: h(15),
        backgroundColor: myColors.green3,
        marginHorizontal: w(25),
        borderRadius: 5,
        marginTop: h(20)
    },
    backToAppText: {
        fontFamily: myfonts.TajwalRegular,
        fontSize: calcFont(20),
        color: myColors.white
    }
});
