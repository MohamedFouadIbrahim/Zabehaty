import { StyleSheet } from "react-native";
import { myfonts } from '../../../assets';
import { calcFont, h, w } from '../../mutils';
import { myColors } from '../../styles';

export const styles = StyleSheet.create({

    deliveryHeaderContainer: {
        justifyContent: 'space-between',
        // marginTop: h(10),
        paddingHorizontal: w(10),
        marginBottom: h(10),
    },
    deliveryDescriptionText: {
        color: myColors.blackGray,
        fontFamily: myfonts.TajwalBold,
        fontSize: calcFont(12)
    },
    dateTimeText: {
        fontFamily: myfonts.TajwalBold,
        fontSize: 16,
        color: myColors.green3
    },
    deliveryHeaderSeprator: {
        height: 1,
        backgroundColor: myColors.gray4,
        opacity: 0.2,
        marginTop: h(5)
    },
    addToCartContainer: {
        justifyContent: 'space-between',
        paddingHorizontal: w(10),
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        borderRadius: 5,
        minWidth: w(100),
    },
    quatityText: {
        paddingHorizontal: w(5),
        fontFamily: myfonts.NunitoSansRegular,
        fontSize: calcFont(16)
    },
    productContainer: {
		marginHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        padding: h(15),
        //justifyContent: 'space-between',
        // marginHorizontal: h(20),
        marginVertical: h(5),
		//overflow: 'hidden'
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius:12,
        marginHorizontal:w(5)
    },
    productTextContainer: {
		flex: 1,
		paddingStart: 10,
		alignItems: 'flex-start'
        // height: h(120),

    },
    productNameText: {
        fontFamily: myfonts.TajwalRegular,
        color: myColors.blackGray,
        fontSize: 16,
		lineHeight: 20
    },
    productDescriptionText: {
        fontFamily: myfonts.TajwalRegular,
        color: myColors.gray10,
        fontSize: 14,
		marginBottom: 5,
		alignSelf: 'flex-start',
		textAlign: 'left'
    },
    productPriceText: {
        fontFamily: myfonts.TajwalBold,
        color: myColors.green3,
        fontSize: 16
    },
	productQtyContainer: {
		height: 30,
		minWidth: 30,
		borderRadius: 4,
		backgroundColor: '#F6F6F6',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 10
	},
	qtyText: {
		color: '#565656',
		fontSize: 16,
		fontFamily: myfonts.TajwalMedium
	},
	departmentHeaderContainer: {
		// height: h(39),
		backgroundColor: myColors.orange,
		paddingHorizontal: w(15),
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: w(10),
	},
	yourCart: {
		fontSize: calcFont(16),
		marginHorizontal: 10,
		lineHeight: 20
	},
});
