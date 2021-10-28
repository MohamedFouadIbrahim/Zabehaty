import { StyleSheet } from "react-native";
import { w, h, calcFont, fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";

export const styles = StyleSheet.create({
	shopContainer: {
		flexDirection: "row",
		width: fullWidth(),
		paddingHorizontal: 15,
	},
	selected: {
		backgroundColor: myColors.yellow1
	},
	imageContainer: {
		width: 110,
		height: 110,
		alignItems: "center",
		justifyContent: "center"
	},
	descriptionContainer: {
		padding: 10,
		alignSelf:'center',
		justifyContent: 'flex-start',
		flex: 1
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 10,
		overflow: 'hidden',
		resizeMode: 'cover'
	},
	titleText: {
		fontSize: 16,
		fontFamily: myfonts.TajwalBold,
		alignSelf: 'flex-start',
	},
	infoContainer: {
		alignItems: 'flex-start',
		marginTop: 2
	},
	infoText: {
		fontSize: 12,
		lineHeight: 18,
		fontFamily: myfonts.TajwalRegular,
		// color: "#8A94A3",
		color: myColors.blackGray,
		alignSelf: 'flex-start',
		textAlign: 'left'
	},
	ratingContainer: {
		alignItems: 'flex-start',
		marginTop: 2
	}
});
