import { Platform, StyleSheet } from "react-native";
import { calcFont, h, w, fullWidth, fullHeight } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { Spacing } from "../../styles/spacing";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.white
    },
    map: {
        ...StyleSheet.absoluteFill
    },
    headerContainer: {
        paddingHorizontal: Spacing.mediumPagePaddingHorizontal,
        paddingVertical: Spacing.mediumPagePaddingVertical,
        position: 'absolute',
        zIndex: 1,
        top: Platform.OS == 'ios' ? h(30) : 0,
        backgroundColor: 'white',
        width: '100%'
    },
    currentPosionButton: {
        position: 'absolute',
        right: w(15),
        bottom: h(60),
        borderRadius: 7,
        paddingHorizontal: w(8),
        paddingVertical: 7,
        borderColor: '#aaa',
        borderWidth: 0.8
    },
    saveButton: {
        position: 'absolute',
        bottom: Platform.OS == 'android' ? 0: h(5),
    },
    marker: {
        position: 'absolute',
        top: '44.5%',
        left: '47%',
    }
});
