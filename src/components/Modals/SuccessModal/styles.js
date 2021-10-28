import { myColors } from "../../../styles/myColors";
import { Platform, StyleSheet } from "react-native";
import { myfonts } from "../../../../assets";
import { h, w, calcFont } from "../../../mutils";


export const styles = StyleSheet.create({
  container: {
    borderBottomColor: myColors.gray2,
    borderBottomWidth: 1,
  },
  modalContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    width: w(340),
    borderWidth: 3,
    borderColor: myColors.green3,
    borderRadius: 10,
    paddingVertical: h(20)
  },
  title: {
    textAlign: "center",
    fontSize: calcFont(20),
    fontFamily: myfonts.TajwalRegular,
    paddingHorizontal: w(15)

  },
  description: {
    textAlign: "center",
    fontSize: calcFont(16),
    fontFamily: myfonts.TajawalLight,
    paddingHorizontal: w(25)
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: w(5),
    paddingVertical: h(30),
    alignSelf: 'center'
  },
  button: {
    borderColor: myColors.green3,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: w(5),
    paddingVertical: h(7),
    marginHorizontal: w(5),
    alignSelf: 'center'
  },

  buttonText: {
    textAlign: "center",
    fontSize: calcFont(17),
    fontFamily: myfonts.TajwalBold,
    width: w(140),
    alignSelf: 'center',
  }
});
