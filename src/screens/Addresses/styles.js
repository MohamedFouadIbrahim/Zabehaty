import { StyleSheet } from "react-native";
import { myfonts } from "../../../assets";
import { calcFont, h, w } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { Spacing } from "../../styles/spacing";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.white,
    },
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
