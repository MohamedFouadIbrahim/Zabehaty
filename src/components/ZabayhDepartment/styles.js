import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import { color } from "react-native-elements/dist/helpers";

export const styles = StyleSheet.create({
	all: {
		// height: h(100),
	},
	ZabayahCard: {
		width: 80,
		marginTop: 35,
		alignItems: "center",
	},
	ZabayahDepartImgContainer: {
		width: 70,
		height: 70,
		borderRadius: h(18),
		backgroundColor: myColors.gray1,
		padding: 10
	},
	selectedCard: {
		backgroundColor: myColors.yellow1,
	},
	ZabayahDepartImg: {
		flex: 1,
		resizeMode: "contain"
	},
	titleText: {
		fontSize: calcFont(14),
		fontFamily: myfonts.TajwalBold,
		color: myColors.black,
		textAlign: "center",
		marginTop: 5,
		lineHeight: 18
	},
	notificationBadge: {
		backgroundColor: myColors.green,
		width: 16,
		height: 16,
		borderRadius: 8,
		display: "flex",
		alignItems: 'center',
		justifyContent: 'center',
		position: "absolute",
		top: 30
	},
	notificationBadgeText: {
		color: '#FFFFFF',
		fontSize: 12
	}
});
