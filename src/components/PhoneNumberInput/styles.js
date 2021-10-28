import { myColors } from "../../styles";
import { calcFont, h, w } from "../../mutils";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
	},
	Cont: {
		width: w(334),
		height: h(65),
		marginTop: h(7),
		paddingLeft: w(10),
		borderRadius: h(10),
		backgroundColor: '#FFFFFF',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		elevation: 5,
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
