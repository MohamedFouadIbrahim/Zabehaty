import { StyleSheet } from "react-native";
import { calcFont, h, w } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  container: {
    width: w(271),
    //backgroundColor: myColors.white,
    fontSize: calcFont(16),
    paddingVertical: h(5),
    color: myColors.cool_black,
	fontFamily: myfonts.TajwalRegular
  },
});
