import { StyleSheet } from "react-native";
import { h, w } from "../../mutils";
import { myColors } from "../../styles/myColors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.white
    },
    subContainer: {
        paddingHorizontal: w(15),
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: w(15),
        paddingVertical: w(10),
    },
    cityCountryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: w(10),
        paddingVertical: h(15),
    },
    cityCountryText: {
        color: myColors.green3,
        paddingHorizontal: w(10)
    },
    line: {
        borderBottomColor: '#d9d9d9',
        marginTop: h(10),
    },
    contentContainerStyle: { paddingHorizontal: w(10), }
});
