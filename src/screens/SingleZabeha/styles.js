import { StyleSheet, I18nManager } from "react-native";
import { w, h, calcFont } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
		flex: 1,
	},
	zabehaheaderimg: {
		width: w(375),
		height: h(281),
		zIndex: 1,
	},
	allContent: {
		position: "relative",
		bottom: h(25),
		width: w(375),
		flex: 1,
		alignSelf: "center",
		backgroundColor: myColors.white,
		borderTopStartRadius: h(30),
		borderTopEndRadius: h(30),
		borderWidth: 1,
		borderColor: myColors.white,
		zIndex: 2,
	},
	moresellTexts: {
		marginTop: -20,
		width: w(152),
		height: 40,
		backgroundColor: myColors.yellow1,
		borderRadius: w(20),
		justifyContent: "center",
		zIndex: 3,
		left: (I18nManager.isRTL) ? 0 : w(190),
		// right:(I18nManager.isRTL) ? 0: w(190),
	},
	bestsell: {
		textAlign: "center",
		lineHeight: 18
	},
	favouriteimg: {
		zIndex: 3,
		marginTop: -30,
		marginEnd: -10
	},
	nagdyText: {
		textAlign: "center",
		color: myColors.blue3,
		fontSize: calcFont(20),
		fontFamily: myfonts.TajwalBold,
		lineHeight: 28
	},
	descText: {
		fontSize: calcFont(17),
		fontFamily: myfonts.TajwalRegular,
		textAlign: "center",
		// color: myColors.gray8,
		color: myColors.blackGray,
		marginTop: 5,
		paddingHorizontal: 5
	},
	size: {
		textAlign: "center",
		width: w(375),
		height: 40,
		fontSize: calcFont(13),
		fontFamily: myfonts.TajwalBold,
		marginVertical: h(20),
		backgroundColor: myColors.lightgray,
		lineHeight: 40
	},
	allWeightContainer: {
		justifyContent: "space-evenly",
		flexDirection: "row",
	},
	quantity: {
		textAlign: "center",
		width: w(375),
		height: 40,
		fontSize: calcFont(13),
		fontFamily: myfonts.TajwalBold,
		//marginTop: h(20),
		//marginBottom: h(15),
		backgroundColor: myColors.lightgray,
		lineHeight: 40
	},
	donation: {
		textAlign: "center",
		width: w(375),
		height: h(40),
		fontSize: calcFont(13),
		fontFamily: myfonts.TajwalBold,
		marginTop: h(20),
		backgroundColor: myColors.lightgray,
		paddingVertical: h(8),
	},
	addReduceContainer: {
		flexDirection: "row",
		alignSelf: "center",
		marginVertical: h(20),
	},
	quantityNum: {
		marginHorizontal: w(20),
		marginTop: h(2),
		fontSize: calcFont(22),
		color: myColors.blue3,
	},
	withoutContainer: {
		justifyContent: "space-between",
		flexDirection: "row",
		width: w(375),
		marginVertical: h(20),
		alignItems: "center",
		paddingHorizontal: w(30),
	},
	donateText: {
		fontSize: calcFont(15),
		fontFamily: myfonts.TajwalBold,
	},
	cookingText: {
		fontSize: calcFont(15),
		fontFamily: myfonts.TajwalBold,
	},
	hr: {
		borderBottomWidth: 1,
		borderBottomColor: myColors.lightgray,
		marginHorizontal: w(25),
	},
	switchContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},

	addToCartBtn: {
		height: 46,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.green,
		borderTopEndRadius: 23,
		borderBottomEndRadius: 23,
		borderLeftWidth: 1,
		alignSelf: "flex-end",
	},
	cancelOrderBtn: {
		height: 46,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.red1,
		borderTopEndRadius: 23,
		borderBottomEndRadius: 23,
		borderLeftWidth: 1,
		alignSelf: "flex-end",
		marginTop: 20,
	},
	entering: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	enteringText: {
		color: myColors.white,
		//marginEnd: 35,
		fontFamily: myfonts.TajwalBold,
	},
	pointer: {
		marginEnd: 20,
	},
	price: {
		marginEnd: 20,
		marginTop: 5
	},
	priceText: {
		fontSize: 20,
		fontFamily: myfonts.TajwalBold
	},

	floatingPopupCart: {
		position: 'absolute',
		bottom: 5,
		left: 0,
		width: "100%",
		height: 52,
		alignItems: 'center',
		justifyContent: 'center',
	},
	popupCartContent: {
		width: "90%",
		backgroundColor: "#125624",
		borderRadius: 5,
		height: "100%",
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10,
		flexDirection: 'row',
		marginBottom: h(10)
	},
	cartItemsCount: {
		width: 28,
		height: 28,
		borderWidth: 1.5,
		borderColor: "#FFFFFF",
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		color: '#FFFFFF',
		textAlign: 'center',
		lineHeight: 28,
		fontSize: 20,
		fontFamily: myfonts.TajwalBold
	},
	itemContainer: {
		flexDirection: 'row',
		paddingHorizontal:7
	},
	itemsText: {
		color: '#FFFFFF',
		lineHeight: 28,
		fontSize: 18,
		fontFamily: myfonts.TajwalRegular,
		paddingHorizontal:10,
	},
	totalCartContainer: {
		flexDirection: 'row',
		paddingHorizontal:7,
		alignItems:'center'

	},
	totalText: {
		color: '#FFFFFF',
		marginEnd: 10,
		fontSize: 18,
		fontFamily: myfonts.TajwalRegular,
		lineHeight: 28,

	},
	cartTotal: {
		color: '#FFFFFF',
		fontSize: 20,
		fontFamily: myfonts.TajwalBold
	},
	backContainer: {
		width: 50,
		height: 50,
		position: 'absolute',
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		zIndex: 100,
		left: 10,
		top: 10,
		backgroundColor: '#d9d9d9'
	},
	favouriteContainer: {
		width: 44,
		height: 44,
		backgroundColor: 'red',
		borderRadius: 88 / 2,
		position: "absolute",
		borderColor: 'red',
		borderWidth: 1,
		//bottom: h(-25),
		start: I18nManager.isRTL ? null : 25,
		end: I18nManager.isRTL ? 25 : null,
		zIndex: 3,
		marginTop: -22,
		marginEnd: 0,
		alignItems: 'center',
		justifyContent: 'center'
	},
	favouriteIcon: {
		zIndex: 4,
	}
});
