import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";

export const styles = StyleSheet.create({
  currencyCountImg: {
    // marginLeft: w(40),
	resizeMode: 'stretch',
	width: 30,
	height: 20,
	borderRadius: 10,
	overflow: 'hidden'
  },

  currencyTruemarkImg: {
    marginLeft: w(30),
  },
  all: {
    width: w(250),
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
