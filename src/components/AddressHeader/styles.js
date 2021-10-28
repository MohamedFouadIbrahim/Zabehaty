import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: myColors.white,
  },
  homeheader: {
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: h(20),
    flexDirection: "row-reverse",
  },
  LogoContainer: {
    marginHorizontal: w(40),
  },
  addressContainer: {
    height: h(39),
    backgroundColor: myColors.orange,
    paddingHorizontal: w(20),
    flexDirection: "row",
    alignItems: "center",
    marginTop: h(20),
    justifyContent:'space-between'
  },
  addressInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeAddressTxt: {
	  fontFamily: myfonts.TajwalRegular
  }
});
