import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  container: {
    // flex:1
  },

  followbg: {
    width: w(375),
    height: h(812),
    flex:1
  },

  followText: {
    position: "absolute",
    bottom: h(138),
    left: w(38),
    zIndex: 2,
    fontSize: calcFont(24),
    fontFamily: myfonts.TajwalBold,
    color: myColors.white,
  },
  connectingText: {
    position: "absolute",
    bottom: h(94),
    left: w(32),
    zIndex: 1,
    width: w(290),
    marginRight: w(112),
    fontSize: calcFont(14),
    fontFamily: myfonts.TajwalRegular,
    color: myColors.gray5,
    textAlign: "left",
  },
});
