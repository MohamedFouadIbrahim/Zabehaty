import { StyleSheet } from "react-native";
import { w, h, calcFont, fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  cellContainer: {
    flex: 1,
	width: fullWidth(),
    // marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deparmentCard: {
    width: "90%",
    height: 250,
    borderRadius: 15,
    borderColor: myColors.green3,
    borderWidth: 1,
    backgroundColor: myColors.white,
    overflow: "hidden",
	position: "relative"
  },
  selectedCard: {
	backgroundColor: myColors.yellow1
  },
  departmentImage: {
    width: "100%",
    height: "75%",
	resizeMode: "cover"
    // backgroundColor:"orange"
  },
  ProdiscountContainer: {
    backgroundColor: myColors.green3,
    minWidth: 52,
    height: 24,
    borderRadius: 10,
    alignSelf: "flex-end",
	position: "absolute",
	top: 10,
	end: 20
  },
  discountText: {
    textAlign: "center",
    fontSize: 14,
    color: myColors.white,
  },

  departmentInfoTexts: {
    width: "100%",
    height: "25%",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  title1Text: {
    fontSize: 20,
    textAlign: "center",
    color: myColors.green3,
    fontFamily: myfonts.TajwalBold,
  },
  title2Text: {
    fontSize: 12,
    textAlign: "center",
    color: myColors.green3,
    fontFamily: myfonts.TajwalBold,
  },
});
