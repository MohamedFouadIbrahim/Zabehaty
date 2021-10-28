import { Dimensions, StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { calcFont, h, w } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { Spacing } from "../../styles/spacing";

export const styles = StyleSheet.create({
    currentAddressContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: h(20),
        backgroundColor: 'white',
        paddingVertical: h(10)
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: myColors.white
    },
    secoundContainer: {
        paddingHorizontal: w(15)
    },
    ChangeAddessButton: {
        backgroundColor: myColors.green3,
        position: 'absolute',
        right: w(10),
        bottom: h(5),
        paddingHorizontal: w(10),
        paddingVertical: w(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },

    ChangeAddessText: {
        color: 'white',
        fontFamily: myfonts.TajwalBold,
        alignSelf: 'center',
        fontSize: 10,
        paddingHorizontal: 10
    },
    SelectDeliveryOptionsContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        marginTop: h(10),
        paddingVertical: h(10),
        paddingHorizontal: w(10)
    },
    delivredToText: {
        fontFamily: myfonts.TajwalMedium,
        color: myColors.blackGray,
        fontSize: 20,
    },
    isDefaultText: {
        fontFamily: myfonts.TajwalMedium,
        color: myColors.blackGray2,
        fontSize: 20,
        marginStart: 5
    },
    fullAdress: {
        fontFamily: myfonts.TajwalRegular,
        color: myColors.blackGray,
        fontSize: 15,
    },

    // one Delivery Option

    deliveryOptionsContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        marginTop: h(10),
        padding: 10
    },
    /*deleviryOptionContainer: {
        paddingHorizontal: w(10),
        shadowColor: '#0D0C0C',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.111111,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: '#E4E4E4',
        marginTop: h(10),
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 5
    },*/
    selectDeliveryOptionText: {
        marginHorizontal: w(10),
        fontFamily: myfonts.TajwalMedium,
        fontSize: 15,
        color: myColors.blackGray
    },
    CartButton: {
        // position:'absolute',
        // bottom:0,
        width: w(Dimensions.get('screen').width),
        alignSelf: 'center'
    },
    cartBackHeaderContainer: {
        marginTop: h(10)
    },
    cartBackHeaderText: {
        fontSize: calcFont(20)
    },

    optionNameText: {
        paddingHorizontal: w(10),
        color: myColors.blackGray,
        fontFamily: myfonts.TajwalRegular,
        fontSize: 16
    },
    optionDecriptionText: {
        color: myColors.green3,
        fontFamily: myfonts.TajwalRegular,
        fontSize: calcFont(8)
    },
    deleviryOptionContainer: {
        shadowColor: '#0D0C0C',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.111111,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: '#E4E4E4',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: h(10),
        paddingVertical: 5,
        flexDirection: 'row',
        marginVertical: h(5),
        marginHorizontal: w(5),
        paddingHorizontal: w(5),
        height: 40
    },
    shippingMethodsText: {
        paddingHorizontal: w(10),
        color: myColors.green3,
        fontFamily: myfonts.TajwalBold,
        fontSize: calcFont(8)
    },
    noteText: {
        paddingHorizontal: w(15),
        fontSize: calcFont(10),
        marginVertical: h(10),
        color: myColors.blackGray,
        fontFamily: myfonts.TajwalBold
    },
    timesContainer: {
        paddingHorizontal: w(10),
        shadowColor: '#0D0C0C',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.62,
        elevation: 4,
        backgroundColor: '#E4E4E4',
        // marginTop: h(10),
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#C9C9C9',
        justifyContent: 'space-between',
        marginHorizontal: w(5)
    },
    viewItemsButton: {
        backgroundColor: myColors.green3,
        paddingHorizontal: w(10),
        paddingVertical: w(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: h(10),
        alignSelf: 'flex-end'
    },
    viewItemsText: {
        color: 'white',
        fontFamily: myfonts.TajwalBold,
        alignSelf: 'center',
        fontSize: calcFont(6)
    },
    addAddressBtn: {
        borderWidth: 1,
        borderColor: myColors.green,
        backgroundColor: myColors.green,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 5,
        marginVertical: 20
    },
    addAddressBtnText: {
        color: myColors.white,
        fontFamily: myfonts.TajwalRegular
    },
    eidContainer: {
        // height: 100,
        paddingVertical:40,
        width: 100,
        borderRadius: 12,
        borderWidth: 1,
        textAlign:'center',
        marginHorizontal:5,
        marginVertical:20
    },
    eidText: {
        fontFamily: myfonts.TajwalMedium,
        fontSize: calcFont(18),
        alignSelf:'center',
        width:95,
        textAlign:'center'
    },
	// Addresses Style
	AddressItem: {
		paddingHorizontal: Spacing.mediumPagePaddingHorizontal,
		paddingVertical: Spacing.mediumPagePaddingVertical,
		flexDirection:'row'
	},
	AddressTextContainer: {
		marginHorizontal: w(10),
		alignItems: 'flex-start'
	},
	AddressName: {
		color: '#444444',
		fontSize: calcFont(15),
	},
	FullAddress: {
		color: '#646464',
		marginTop: h(5),
	},
	AddressOptionsButtonsContainer: {
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: Spacing.mediumPagePaddingHorizontal,
	},
	EditSelectedAddressText: {
		color: '#646464'
	},
	AddressOptions: {
		borderColor: '#C9C9C9',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: Spacing.pagePaddingHorizontal,
		paddingVertical: Spacing.pagePaddingVertical,
		marginTop: h(10),
		alignItems: 'center',
	},
	AddNewButton: {
		borderColor: '#5C9B51',
		borderWidth: 2,
		marginHorizontal: Spacing.mediumPagePaddingHorizontal,
		borderRadius: 5,
		paddingHorizontal: Spacing.pagePaddingHorizontal,
		paddingVertical: Spacing.pagePaddingVertical,
		marginVertical: h(10),
		alignItems: 'center',
	},
	AddNewText: {
		color: '#619857'
	},
	headerContainer: {
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: myColors.green4,
		paddingHorizontal: Spacing.mediumPagePaddingHorizontal,
		paddingVertical: Spacing.pagePaddingVertical
	},
	headerText: {
		color: myColors.white, fontSize: calcFont(20)
	},
	noAddressesLbl: {
		fontFamily: myfonts.TajwalRegular,
		color: myColors.green,
		fontSize: 16
	}
});
