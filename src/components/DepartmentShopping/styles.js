import { StyleSheet } from "react-native";
import { w, h, calcFont, calculateHalfWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";

export const styles = StyleSheet.create({
	cellContainer: {
		flex: 1,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center"
	},
	deparmentCard: {
		width: calculateHalfWidth(10),
		height: 250,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		borderColor: myColors.green3,
		borderWidth: 1,
		backgroundColor: myColors.white,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.25,
		elevation: 5
	},
	departmentImageContainer: {
		width: "100%",
		height: "80%",
		borderTopStartRadius: 10,
		borderTopEndRadius: 10,
		overflow: 'hidden'
	},
	departmentImage: {
		width: "100%",
		height: "100%",
		resizeMode: "cover"
	},
	discountTexts: {
		backgroundColor: myColors.yellow1,
		width: w(52),
		height: h(24),
		borderRadius: w(10),
		marginTop: 10,
		marginStart: 10
	},
	discountText: {
		textAlign: "center",
		fontSize: calcFont(14),
		color: myColors.green3,
	},

  departmentInfoTexts: {
    width: "100%",
    height: "20%",
    alignSelf: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: calcFont(20),
    textAlign: "center",
	lineHeight: 50,
    color: myColors.green3,
	fontFamily: myfonts.TajwalBold
  },
});
