import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: myColors.white
  },
  homeheader: {
	  marginHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
    //marginVertical: h(20),
    flexDirection: "row-reverse",
	height: 80
  },
  LogoContainer: {
  },

  addressContainer: {
    height: h(39),
    backgroundColor: myColors.yellow1,
    paddingHorizontal: w(25),
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  addressInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  cart:{
    width:w(25),
    height:h(25),
    resizeMode:'contain'
  },
  addressicon: {
	  marginStart: 5
  }
});
