import { StyleSheet } from "react-native";
import { calcFont, h, w } from "../../mutils";
import { myColors } from "../../styles/myColors";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: w(15),
        paddingVertical: h(5),
    },
    productImage: {
        width: 80,
        // height: 65,
        // minHeight: h(65),
        minHeight: 65,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        backgroundColor: 'white'
    },
    DeleteButton: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#C9C9C9',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: h(10),
        paddingVertical: h(5),
        width: 70

    },
    DeleteText: {
        color: '#646464'
    },
    TextTitle: {
        color: myColors.blackGray,
        fontSize: calcFont(14),
        // maxWidth: w(100)
    },
    TextPrice: {
        color: myColors.gray10,
        fontSize: calcFont(16)
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
        marginHorizontal: w(2),
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
        alignSelf: 'flex-end', marginBottom: h(30)
    },
    textsContainer: {
        paddingHorizontal: w(15),
        justifyContent: 'flex-end',
        maxWidth: w(180)
    }
});
