import { StyleSheet } from "react-native";
import { calcFont, h } from "../../mutils";
import { myColors } from "../../styles/myColors";


export const styles = StyleSheet.create({

    required: {
        color: 'red',
        fontSize: calcFont(20),
        position: 'absolute',
        right: 5,
        top: 3
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
        flex: 0.4,
        paddingVertical: h(4)
    },
    arrowDownContainer: {
        alignItems: 'center',
    },
    arrowDown: {
        marginHorizontal: h(10)
    },
});
