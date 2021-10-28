import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: myColors.white,
  },
  scrollViewContainer: {
	marginBottom: 20
  },
  centerContent: {
	alignItems: "center",
	justifyContent: "center"
},
  passwordsTexts: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: h(30),
    marginBottom: h(35),
  },
  forgetText: {
    fontSize: calcFont(12),
    color: myColors.green,
    fontFamily: myfonts.TajwalRegular,
  },
  repeateText: {
    fontSize: calcFont(24),
    color: myColors.green,
    fontFamily: myfonts.TajwalBold,
  },
  response: {
	width: w(300),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: h(50),
  },
  responseChoiceText: {
    fontSize: calcFont(12),
    fontFamily: myfonts.TajwalBold,
	textAlign: "center"
  },
  preferableColor: {
    width: w(334),
    borderRadius: w(10),
    height: h(60),
    borderColor: myColors.gray1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#979797",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
	padding: 10
  },
  prefereColorText: {
    fontSize: calcFont(14),
    fontFamily: myfonts.TajwalBold,
	textAlign: "center"
  },
  all: {
    borderRadius: w(10),
    shadowColor: "#979797",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
    marginTop: h(10),
    paddingBottom: h(5),
    height: h(60),
  },
  responseContainer: {
    flexDirection: "row",
    width: w(334),
    borderColor: myColors.gray1,
    justifyContent: "center",
  },
  responseInputStyle: {
    width: w(200),
    textAlign: "center",
    marginRight: w(10),
    paddingLeft: w(28),
    height: h(50),
    marginTop: h(8),
    fontFamily: myfonts.TajwalMedium,
	color: "#000"
  },
	transformImgStyle: {
		marginVertical: w(18),
	},

	imageContainer: {
		height: 45,
		width: w(375) / 2,
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
	},
	pointer: {
		marginLeft: w(40),
	},
});
