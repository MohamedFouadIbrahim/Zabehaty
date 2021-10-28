import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.black,
	width: w(375),
  },
  bgrestaurant: {
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
    left: w(134),
    zIndex: 3,
  },
  nearText: {
    position: "absolute",
    bottom: h(150),
    end: w(20),
    zIndex: 3,
    fontSize: calcFont(24),
    fontFamily: myfonts.TajwalBold,
    color: myColors.white,
  },
  addingText1: {
    bottom: h(106),
    start: w(40),
	width: w(310),
  },
  samStyle: {
    position: "absolute",
    zIndex: 3,
    fontSize: calcFont(14),
    fontFamily: myfonts.TajwalRegular,
    color: myColors.white,
  },
});
