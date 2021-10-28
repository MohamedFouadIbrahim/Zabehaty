import { StyleSheet } from "react-native";
import { calcFont, h, w, fullWidth, fullHeight } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { Spacing } from "../../styles/spacing";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.white
    },
    scrollContainer: {
        // alignItems: "center",
        // flex: 1,
        //marginHorizontal:calcWidth(20),
        paddingBottom: h(20),
        width: fullWidth(),
    },
    subContainer: {
        marginHorizontal: 20
    },
    cityCountryContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 20
    },
    cityCountryButtons: {
        borderWidth: 1,
        borderColor: '#125624',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: myColors.white,
        justifyContent: 'center',
        // flex: 0.6,
        paddingVertical: h(4),
        paddingHorizontal: w(10)
    },
    arrowDownContainer: {
        alignItems: 'center',
    },
    arrowDown: {
        marginHorizontal: h(10)
    },
    inputTitie: {
        fontSize: calcFont(12),
        color: '#919191'
    },
    inputContainer: {
        marginTop: 20,
    },
    input: {
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
        color: '#000000',
        fontSize: calcFont(12),
        paddingVertical: h(5)
    },
    addressTypeContainer: {
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'space-between'
    },
    addressTypeButtons: {
        paddingHorizontal: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#125624',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: myColors.white,
    },
    addressTypeRow: {
        alignItems: 'center',
        padding: 5
    },
    addressTypeText: {
        marginTop: 4,
        color: myColors.blackGray
    },
    addressTypeImage: {
        marginHorizontal: 5
    },
    logoImage: {
        alignSelf: 'center',
        borderRadius: 10,
        marginVertical: Spacing.mediumPagePaddingVertical
    },
    headerContainer: {
        paddingHorizontal: Spacing.mediumPagePaddingHorizontal,
        paddingVertical: Spacing.mediumPagePaddingVertical,
    },
    scrollViewContainer: {
        padding: Spacing.mediumPagePaddingHorizontal
    },
    numbersRow: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    scollViewContaiser: {
        backgroundColor: '#f2f2f2',
        paddingHorizontal: h(20),
        paddingVertical: h(10),
        borderRadius: 20
    },
    scollViewContainerView: {
        // height: (fullWidth() - h(10)),
    },
    map: {
        width: fullWidth() - 20,
        height: h(180),
        alignSelf: 'center',
        borderRadius: 20
    },
    CustomSelectorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: h(5)
    },
    arrowDownImage: {
        marginHorizontal: w(10),
        // position: 'absolute',
    },
    CustomSelectorInput: {
        color: '#000000',
        fontSize: calcFont(12),
        marginTop: h(5)
    },
    required: {
        color: 'red',
        //fontSize: calcFont(20)
    },
    changeText: {
        textDecorationLine: 'underline',
        paddingHorizontal: w(10)
    }
});
