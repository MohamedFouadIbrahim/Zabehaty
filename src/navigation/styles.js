import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../mutils";
import { myColors } from "../styles/myColors";
import { myfonts } from "../../assets";

export const styles = StyleSheet.create({
    contentContainerStyle: {
        // flex:
    },
    oneDrawerItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: w(20),
        marginTop: h(20)
    },
    oneDrawerItemImage: {
        marginHorizontal: w(8)
    },
    oneDrawerItemText: {
        color: '#4F4F4F',
        marginTop: h(5),
        fontSize: calcFont(15),
		lineHeight: 18
    },
    Line: {
        borderBottomColor: '#d9d9d9',
        marginTop: (15),
    },
    profileRow: {
        alignItems: 'center',
        backgroundColor: '#F1F1F1',
        paddingVertical: h(5),
        paddingVertical: h(20),
        paddingHorizontal: h(20)
    },
    profileImage: {
        marginHorizontal: w(20)
    },
    profileName: {
        color: '#4F4F4F',
        fontSize: calcFont(14)
    },
    bannerImage: {
        alignSelf: 'center',
        marginTop: h(15),
        flex: 1
    },
    logoContainer: {
        alignSelf: 'center',
        marginVertical: h(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        marginTop: h(10),
    },
    logoText: {
        color: '#4F4F4F',
        marginTop: h(10)
    },
    oneDrawerItemIcon: {
        marginHorizontal: w(6)
    },
    imageContainer: {
		height: h(45),
		width: w(355) / 2,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.green,
		borderTopLeftRadius: w(20),
		borderBottomLeftRadius: w(20),
		borderLeftWidth: h(1),
		alignSelf: "flex-end",
		marginTop: h(45),
	},
    entering: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	enteringText: {
		color: myColors.white,
		marginLeft: w(35),
		fontFamily: myfonts.TajwalBold,
        paddingHorizontal: w(10)
	},
});
