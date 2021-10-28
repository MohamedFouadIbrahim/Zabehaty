import { StyleSheet } from "react-native";
import { w, h, calcFont, fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
	},
	header: {
		flexDirection: 'row',
		padding: w(15)
	},
	zabehaheaderimg: {
		width: w(80),
		height: h(80),
		borderRadius: w(10)
	},
	backContainer: {
		margin: w(10)
	},
	headerTitle: {
		fontSize: calcFont(20),
		fontWeight: 'bold',
		fontFamily: myfonts.TajwalBold
	},
	headerDesc: {
		fontSize: calcFont(16),
		fontFamily: myfonts.TajawalLight
	},
	CardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal:w(15),
		paddingVertical: h(20),
	},
	boredr:{
		borderColor: myColors.gray10,
		width:(340),
		borderWidth:0.5,
		alignSelf:'center'
	},
	cardText: {
		fontSize: calcFont(16),
		fontFamily: myfonts.TajwalRegular,
	}
});
