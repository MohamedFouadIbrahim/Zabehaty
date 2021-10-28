import { StyleSheet } from "react-native";
import { w, h, calcFont, calcHeaderBorderRadius } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: myColors.white,
  },
  emailOrPhoneContainer: {
    alignItems: "flex-start",
    marginTop: h(12),
    marginLeft: w(25),
  },
  emailOrPhoneText: {
    marginLeft: w(30),
  },
  phoneEmailInputStyle: {
    fontSize: calcFont(17),
  },
  passwordContainer: {
    alignItems: "flex-start",
    marginTop: h(12),
    marginLeft: w(25),
  },
  passwordsStyle: {
    fontSize: calcFont(12),
    fontFamily: myfonts.TajwalBlack,
    color: myColors.green,
  },
  confirmPasswordContainer: {
    alignItems: "flex-start",
    marginTop: h(12),
    marginLeft: w(25),
  },
  borderStyle: {
    borderBottomColor: myColors.green2,
  },
  termsContainer: {
    paddingHorizontal: w(25),
    marginTop: h(20),
	alignItems: 'flex-start'
  },
  confirmAction: {
    height: h(45),
    width: w(158),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: myColors.green,
    borderTopLeftRadius: w(20),
    borderBottomLeftRadius: w(20),
    borderLeftWidth: h(1),
    alignSelf: "flex-end",
    marginTop: h(45),
  },
  entering: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  enteringText: {
    color: myColors.white,
    marginLeft: w(35),
    fontSize: calcFont(15),
    fontFamily: myfonts.TajwalBold,
  },
  pointer: {
    marginLeft: w(40),
  },
});
