import { StyleSheet } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
  content: {
    backgroundColor: myColors.white,
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: w(20),
  },
  header: {
    flexDirection: "row",
    marginTop: h(5),
  },
  headerIcon: {
    marginTop: h(12),
    marginRight: w(10),
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: myColors.white,
    width: w(116),
    height: h(116),
    marginVertical: h(16),
    borderRadius: w(58),
    shadowColor: "#979797",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
  headerText: {
    textAlign: "left",
    fontSize: calcFont(22),
    fontFamily: myfonts.TajwalRegular,
  },
  sameBoldStyle: {
    textAlign: "center",
    fontSize: calcFont(24),
    fontFamily: myfonts.TajwalBold,
    color: myColors.green,
  },
  sameRegularStyle: {
    textAlign: "center",
    fontSize: calcFont(12),
    fontFamily: myfonts.TajwalRegular,
    color: myColors.green,
  },
  emirateCountryStyle: {
    borderRadius: 10,
    height: 55,
    paddingTop: 5,
	backgroundColor: myColors.white,
    borderColor: myColors.gray1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#979797",
    marginTop: 16,
    marginBottom: 32,
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  otherCountryStyle: {
    borderRadius: 10,
    height: 55,
    paddingTop: 5,
	backgroundColor: myColors.white,
    borderColor: myColors.gray1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#979797",
    marginVertical: 8,
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
  spaceCountry: {
    marginTop: h(30),
  },

  emirateCountry: {
    borderRadius: w(10),
    height: h(55),
    borderColor: myColors.gray1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#979797",
    marginTop: h(20),
    marginBottom: h(50),
    flexDirection: "row",
    paddingRight: w(20),
    paddingLeft: w(40),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 1,
  },

  second: { marginLeft: w(100) },
  emirateText: {
    fontSize: calcFont(13),
    fontFamily: myfonts.TajwalBold,
    width: w(180),
    textAlign: "center",
  },
  footer: {
    backgroundColor: myColors.green,
    marginTop: h(12),
    height: h(62),
    paddingTop: h(22),
  },
  footerText: {
    fontSize: calcFont(15),
    fontFamily: myfonts.TajwalBold,
    color: myColors.white,
    textAlign: "center",
  },
});
