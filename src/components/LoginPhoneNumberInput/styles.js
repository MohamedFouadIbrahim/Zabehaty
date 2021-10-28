import { myColors } from "../../styles";
import { calcFont, h, w } from "../../mutils";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
	},
	Cont: {
		width: w(334),
		height: h(54),
		borderBottomWidth: h(1),
		borderBottomColor: myColors.gray1
	},
	customPhoneStyle: {
		height: h(52),
		marginTop: h(5),
	},
	phoneTitle: {
		fontSize: calcFont(16),
		color: myColors.gray6,
		alignSelf: "center",
	},
	countryPicker: {
		height: h(30),
		alignItems: "flex-end",
		marginTop: h(18),
	},
	imgStyle: {
		width: w(18),
		height: h(10),
		alignSelf: "center",
		marginHorizontal: w(10),
		marginTop: h(3),
	},
	input: {
		width: w(195),
		paddingStart: 10,
		textAlign: "center",
		color: myColors.black
	},
	separator: {
		height: "100%",
		width: 1,
		backgroundColor: myColors.gray1
	}
});
export default styles;
