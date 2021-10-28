import { Platform, StyleSheet } from "react-native";
import { lineHeight } from "styled-system";
import { myfonts } from "../../../assets";
import { calcFont, h, w } from "../../mutils";
import { myColors } from "../../styles/myColors";


export const styles = StyleSheet.create({
    cartContainer: {
        flex: 1,
        backgroundColor: myColors.white,
    },
    cartItemContainer: {
        justifyContent: 'space-between',
        backgroundColor: myColors.gray1,
        paddingHorizontal: w(20),
        paddingVertical: h(10),
        alignItems: 'center',
    },
    EmptyCart: {
        paddingHorizontal: w(5),
        color: myColors.gray4,
        fontSize: calcFont(10),
        marginTop: Platform.OS == 'ios' ? h(2): 0
    },
    SubTotal: {
        paddingHorizontal: w(5),
        color: myColors.gray4,
        fontSize: calcFont(17)
    },
    CurrencyPrise: {
        color: myColors.gray4,
        fontSize: calcFont(17)
    },
    backHeader: {
        justifyContent: 'space-between',
        paddingHorizontal: w(20),
        marginVertical: h(10),
        alignItems: 'center'
    },
    yourCart: {
        fontSize: calcFont(16),
        marginHorizontal: 10,
		lineHeight: 20
    },
    emptyCartRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    listHeaderComponentStyle: {
        marginTop: h(10)
    },

    departmentHeaderContainer: {
        // height: h(39),
        backgroundColor: myColors.orange,
        paddingHorizontal: w(15),
        flexDirection: "row",
        alignItems: "center",
        marginTop: h(20),
        paddingVertical: w(10),
    },
    exploreCartText:{
        color: myColors.gray8, fontSize: calcFont(15), paddingHorizontal: h(20), marginTop: h(10), textAlign:'center'
    },
    ///////////////////////////////////////// ProductDetails
    container: {
        flex: 1,
        //justifyContent: 'space-between',
		flexDirection: 'column',
        paddingHorizontal: w(15),
        paddingVertical: h(15),
    },
    productImage: {
        width: 80,
        minHeight: 65,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white',
        borderRadius:12
    },
    DeleteButton: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C9C9C9',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: h(10),
        paddingVertical: h(5),
        width: 70,
		height: 35

    },
    DeleteText: {
        color: '#646464'
    },
    TextTitle: {
        color: myColors.blackGray,
        fontSize: calcFont(14),
        marginTop: h(5),
		lineHeight: 22
        // maxWidth: w(100)
    },
    TextPrice: {
        color: myColors.gray10,
        fontSize: calcFont(16)
    },
	TextDescription: {
		color: myColors.gray10,
		fontSize: calcFont(14),
		textAlign: 'left',
		lineHeight: 22
	},
    TextdeliveryType: {
        fontSize: calcFont(10),
        color: myColors.gray10,
        // maxWidth: w(100)
    },
    QuantityButtons: {
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: myColors.gray4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextQuantity: {
        marginHorizontal: w(5),
        fontSize: calcFont(12),
        color: myColors.gray4
    },
    ListHeaderComponentStyle: {
        marginBottom: h(20)
    },
    line: {
        borderBottomColor: myColors.gray4,
        opacity: 0.2,
        marginVertical: h(5)
    },
    addToCartRow: {
        alignItems: 'center',
    },
    addToCartRowContainer: {
        alignSelf: 'flex-end',
		marginBottom: h(30),
        alignItems:'center'
    },
    textsContainer: {
        paddingHorizontal: w(15),
        // justifyContent: 'center',
        maxWidth: w(280),
		alignItems: 'flex-start'
    }
});
