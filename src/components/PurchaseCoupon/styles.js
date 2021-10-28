import { StyleSheet } from 'react-native';
import { h, w, calcFont } from '../../mutils';
import { myColors } from '../../styles';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: w(10),
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        height: h(70),
        marginHorizontal: w(20),
        borderRadius: 5,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        justifyContent: 'space-between',

    },
    rowContainer: {
        width: '100%'
    },
    startText: {
        fontSize: calcFont(12),
        color: myColors.black
    },
    titleText: {
        fontSize: calcFont(12),
        color: myColors.black,
        alignSelf: 'center'
    }
});
