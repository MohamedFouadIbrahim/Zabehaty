import { Platform, StyleSheet } from "react-native";
import { calcFont, h, w } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { Spacing } from "../../styles/spacing";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    firstRow: {
        backgroundColor: myColors.white,
        paddingHorizontal: w(15),
        paddingVertical: h(15),
		alignItems: 'flex-start'
    },
    infroContainer: {
        alignItems: 'center',
        marginTop: h(5),
    },
    dot: {
        backgroundColor: '#555555',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: w(10)
    },
    secoundRow: {
        backgroundColor: myColors.white,
        marginTop: h(10),
        paddingVertical: h(15),
        paddingHorizontal: w(15)
    },
    specialRow: {
        alignItems: 'center', justifyContent: 'space-between',
    },
    lstText: {
        alignSelf: 'center',
        marginTop: h(10)
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: myColors.green3,
        padding: 15,
    },
    myAccountText: {
        color: myColors.white,
        fontSize: calcFont(18),
        marginHorizontal: h(10),
        // marginBottom : Platform.OS == 'android' ? h(10): 0
    },
    wihteImage:{
        tintColor: myColors.white
    },
    grayImage:{
        tintColor: '#6D6D6D'
    },
	scollViewContaiser: {
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },
    buttons:{
        justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: '#16572C', width: 100, borderRadius: 5
    },
    transActionRow:{
        justifyContent: 'space-between', padding: 20, marginTop: 10
    }
});
