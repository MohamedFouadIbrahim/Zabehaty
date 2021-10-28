import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
export const styles = StyleSheet.create({
  container: {
    backgroundColor: myColors.white,
  },
  verificationTexts: {
    marginTop: h(10),
    marginBottom: h(20),
	paddingLeft: w(20),
  },
  VcodeInputsContain: {
	alignItems: "center",
	justifyContent: "center"
  },
  phoneVerifyText: {
    fontSize: calcFont(12),
    textAlign: "left",
    fontFamily: myfonts.TajwalBold,
  },
  codeVerifyText: {
    fontSize: calcFont(24),
    textAlign: "left",
    fontFamily: myfonts.TajwalRegular,
  },
  sameFont: {
    fontSize: calcFont(14),
    textAlign: "left",
  },
  questionNumberContainer: {
    flexDirection: "row",
  },
  notReachText: {
    fontSize: calcFont(14),
    fontFamily: myfonts.TajwalRegular,
  },
  trueText: {
    fontSize: calcFont(14),
    fontFamily: myfonts.TajwalRegular,
  },
  questionText: {
    color: myColors.green2,
    fontSize: calcFont(14),
    fontFamily: myfonts.TajwalBold,
  },

  codeFieldRoot: { marginVertical: 10 },
  cellContainer: {
	width: w(76),
    height: h(55),
	borderRadius: w(10),
	marginRight: 10,
	backgroundColor: myColors.white,
	shadowColor: "#000",
	shadowOffset: {
		width: 0,
		height: 2
	},
	shadowOpacity: 0.25,
	elevation: 3,
  },
  cell: {
    width: w(76),
    height: h(55),
    lineHeight: h(58),
    fontSize: calcFont(18),
    textAlign: "center",
    borderRadius: w(10),
  },
  focusCell: {},

  ConfirmationContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: h(20),
    height: h(45),
    alignItems: "center",
  },
  resend: {
	  flexDirection: "row",
    fontSize: calcFont(12),
	paddingLeft: w(20),
  },
  resendText: {
    fontSize: calcFont(12),
    fontFamily: myfonts.TajwalRegular,
  },
  timeText: {
    color: myColors.green2,
    fontSize: calcFont(12),
    fontFamily: myfonts.TajwalBold,
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
  },
  entering: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: h(10),
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
