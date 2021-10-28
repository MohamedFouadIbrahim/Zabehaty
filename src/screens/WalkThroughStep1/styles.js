import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  cowbgImg: {
    width: w(375),
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  welcomeText: {
    zIndex: 3,
    fontSize: calcFont(24),
    fontFamily: myfonts.TajwalBold,
    color: myColors.white,
  },
  textsStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  newVersionText: {
    width: w(320),
  },
  samStyle: {
    zIndex: 3,
    fontSize: calcFont(14),
    fontFamily: myfonts.TajwalRegular,
    color: myColors.white,
    textAlign: "center",
  },
});
