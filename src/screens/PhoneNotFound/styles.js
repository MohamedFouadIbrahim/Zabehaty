import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: myColors.white,
    paddingHorizontal: w(20),
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: h(50),
  },
  responseChoiceText: {
    fontSize: calcFont(12),
    fontFamily: myfonts.TajwalBold,
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
  },
  prefereColorText: {
    fontSize: calcFont(14),
    fontFamily: myfonts.TajwalBold,
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
  },

  transformImgStyle: {
    marginVertical: w(18),
  },
});
