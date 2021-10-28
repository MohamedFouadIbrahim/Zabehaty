import { StyleSheet } from "react-native";
import { calcFont, h, w } from "../../mutils";
import { myColors } from "../../styles/myColors";

export const styles = StyleSheet.create({
    orderDetailsContainer: {
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
        padding: 10,
        margin: 15
    },
    orderTextContainer: {
        alignItems: 'center'
    },
    orderText: {
        fontSize: calcFont(18),
        color: myColors.blackGray
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
    totalPaidContainer: {
        backgroundColor: '#FFF9DF',
        justifyContent: 'space-between',
        paddingVertical: h(10),
        marginVertical: h(10),
        borderRadius: 5,
        paddingHorizontal: w(20),
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    totalPaidText: {
        color: '#36596A',
        fontSize: calcFont(20)
    },
    totalPaidValue: {
        color: '#8E8E8E',
        fontSize: calcFont(18)
    },
    billingDetailsText: {
        color: "#36596A",
        fontSize: calcFont(20),
        marginVertical: h(15),
		alignSelf: 'flex-start'
    },
    billingDetailsContainer: {
        backgroundColor: 'white',
        paddingVertical: h(10),
        paddingHorizontal: w(20),
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    subTotalText: {
        color: '#36596A',
        fontSize: calcFont(15),
    },
    subTotalValue: {
        color: '#8E8E8E',
        fontSize: calcFont(15),
    },
    taxText: {
        color: '#36596A',
        fontSize: calcFont(15)
    },
    taxValue: {
        color: '#8E8E8E',
        fontSize: calcFont(15)
    },
	addressValue: {
        color: '#8E8E8E',
        fontSize: calcFont(15),
		textAlign: 'left'
    },
    specialRow:{
        justifyContent: 'space-between'
    },
    buttomText: {
        color: '#6D6D6D',
        fontSize: calcFont(12),
        alignSelf: 'center',
        marginTop: h(20),
        paddingHorizontal: w(10),
		textAlign: 'left'
    },
});

