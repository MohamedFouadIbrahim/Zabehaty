import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { h, w, calcFont,fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";


export const styles = StyleSheet.create({
    container: {
        backgroundColor: myColors.white,
        flex:1
    },
    scrollContainer: {
        // alignItems: "center",
        // flex: 1,
        //marginHorizontal:calcWidth(20),
        // paddingBottom: h(20),
        width: fullWidth(),
    },
    cartBackHeaderText: {
        fontFamily: myfonts.TajwalRegular,
        color: myColors.blackGray,
        paddingTop: Platform.OS == 'ios' ? h(10) : h(0),
        fontSize: calcFont(30),
    },
    cartBackHeaderContainer: {
        paddingHorizontal: w(20),
        marginTop: h(5)
    },
    checkoutItemContainer: {
        marginTop: h(20),
		paddingBottom: 10
    },
	addressContainer: {
		paddingHorizontal: w(15),
	},
    paymentContainer: {
        borderColor: myColors.gray4,
        borderWidth: 1,
        marginTop: h(20),
        marginHorizontal: w(20),
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: myColors.white,
        borderRadius:12,
        paddingHorizontal:20
    },
    selectaPayMentMethodText: {
		fontFamily: myfonts.TajwalMedium,
        fontSize: calcFont(15),
        marginTop: h(10),
        marginHorizontal: h(20),
		alignSelf: 'flex-start'
    },
    line: {
        borderBottomColor: '#E4E4E4'
    },
    checkCircleContainer: {
        alignItems: 'center', marginTop: h(10)
    },
    checkCircleText: {
        color: myColors.green3,
        fontSize: calcFont(12),
        paddingHorizontal: w(10),
        marginBottom: h(2),
        fontFamily: myfonts.TajwalMedium,
		lineHeight: 14
    },
    notesContainer:{
        width: w(335),
		backgroundColor: myColors.white,
		borderWidth: h(1),
		borderRadius: h(12),
		alignSelf: "center",
        fontFamily: myfonts.TajwalRegular,
        marginVertical:h(10),
		alignContent: 'flex-start'
    },
    inputStyle: {
		width: w(335),
        height: h(120),
		color: myColors.black,
		fontSize: 16,
		fontFamily: myfonts.TajwalRegular,
		//textAlign:'justify',
        textAlignVertical: "top",
        paddingHorizontal:w(10)
	},
    notesTitle:{
        fontSize: 16,
		fontFamily: myfonts.TajwalRegular,
        paddingTop:h(15),
        marginHorizontal:w(20),
		alignSelf: 'flex-start'
    },
    paymentOptionContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: h (10),
        paddingVertical: h(10),
        marginVertical: h(10),
    },
    list:{
        flex: 1,
        alignItems: 'center'
    },
    yourPointText:{
        color: '#36596A', 
        textAlign: 'center'
    },
    pointsContainer:{
        backgroundColor: '#FFF9DF',
        borderRadius: 5,
        padding: 12,
        justifyContent: 'space-between',
        margin: 20
    }
});
