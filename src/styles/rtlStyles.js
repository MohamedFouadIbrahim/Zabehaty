import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../mutils";

const RTL_STYLES = StyleSheet.create({
  inputStyle: {
     textAlign: "right",
	},
  importantText: {
    paddingRight: w(5),
  },
  departmentText: {
    paddingRight: w(5),
  },
  discountTexts: {
    end: w(20),
  },
  walkthroughtStep2ImgContainer: {
    alignItems: "flex-start",
  },
  walkthroughtStep2Productsbg: {
    borderBottomLeftRadius: h(80),
  },
  walkthroughtStep2seabg: {
    borderBottomLeftRadius: h(80),
  },
  walkthroughtStep3bgrestaurant: {
    borderBottomRightRadius: h(80),
  },
  walkthroughtStep3seabg: {
    borderBottomRightRadius: h(80),
  },
});

export default RTL_STYLES;
