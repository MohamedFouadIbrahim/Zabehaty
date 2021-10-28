import { StyleSheet } from "react-native";
import { w, h, calcFont, fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import color from "color";
import MurmurHash3 from "imurmurhash";
import { BackgroundColor } from "chalk";

export const styles = StyleSheet.create({
	deparmentCard: {
		flex: 1,
		paddingVertical: h(30),
		paddingHorizontal: w(20),
		width: fullWidth(),
	},
	selectedCard: {
		backgroundColor:  "#FFF7D7" //rgba(255, 240, 176, 0.5) //myColors.yellow1
	},
	headerConatiner: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	titleText: {
		fontSize: calcFont(12),
		color: myColors.black,
		fontFamily: myfonts.TajwalBold,
		maxWidth: fullWidth() - w (120)
	},
	dateText: {
		fontSize: calcFont(10),
		color: myColors.black,
		fontFamily: myfonts.TajawalLight,
	},
	describtion:{
		fontSize: calcFont(11),
		color: myColors.blackGray,
		fontFamily: myfonts.TajwalMedium,
		paddingVertical:h(5)
	},
	Image:{
		width: "100%",
		height: h(300),
		marginVertical:h(15),
		borderRadius:10,
		resizeMode: "cover",
		position: 'relative'
	},

});
