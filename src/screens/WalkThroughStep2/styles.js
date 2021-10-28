import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.black,
    width: w(375),
    height: h(812),
    position: "relative",
  },
  Productsbg: {
    width: w(355),
    height: h(680),
    zIndex: 2,
  },
  seabg: {
    width: w(355),
    height: h(680),
    zIndex: 1,
    position: "absolute",
  },
  logoImg: {
    position: "absolute",
    top: h(162),
    left: w(112),
    zIndex: 3,
  },
  freshText: {
    position: "absolute",
    bottom: h(150),
    start: w(20),
    width: w(310),
    zIndex: 4,
    fontSize: calcFont(24),
    fontFamily: myfonts.TajwalBold,
    color: myColors.white,
  },
  shoppingText1: {
    position: "absolute",
    bottom: h(106),
    start: w(20),
    width: w(310),
    zIndex: 4,
    fontSize: calcFont(14),
    fontFamily: myfonts.TajwalRegular,
    color: myColors.white,
  },
  textsStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
});
