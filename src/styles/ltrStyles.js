import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../mutils";

const LTR_STYLES = StyleSheet.create({
  inputStyle: {
    textAlign: "left",
  },
  importantText1: {
    paddingRight: w(20),
  },
  walkthroughtStep2Productsbg: {
    borderBottomRightRadius: h(80),
  },
  walkthroughtStep2seabg: {
    borderBottomRightRadius: h(80),
  },
  walkthroughtStep3bgrestaurant: {
    borderBottomLeftRadius: h(80),
  },
  walkthroughtStep3seabg: {
    borderBottomLeftRadius: h(80),
  },
});

export default LTR_STYLES;
