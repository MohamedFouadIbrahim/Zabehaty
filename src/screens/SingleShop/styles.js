import { StyleSheet,I18nManager } from "react-native";
import { w, h, calcFont, fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";
import { Dimensions } from "react-native";
export const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
		flex: 1,
	},
	zabehaheaderimg: {
		width: fullWidth(),
		height: 235,
		resizeMode: 'cover',
		zIndex: 1
	},
	allContent: {
		position: "relative",
		bottom: 25,
		width: fullWidth(),
		flex: 1,
		alignSelf: "center",
		backgroundColor: myColors.white,
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
		borderWidth: 1,
		borderColor: myColors.white,
		zIndex: 2,
	},
	moresellTexts: {
		position: "absolute",
		bottom: 5,
		end: 24,
		width: 152,
		height: 40,
		backgroundColor: myColors.yellow1,
		borderRadius: 20,
		justifyContent: "center",
		zIndex: 3,
	},
	bestsell: {
		textAlign: "center",
	},
	favouriteimg: {
		position: "absolute",
		bottom: h(-24),
		start: I18nManager.isRTL ? null : 6,
		end: I18nManager.isRTL ? 6 : null,
		zIndex: 3,
		marginTop: -30,
		marginEnd: -10
	},
	nagdyText: {
		textAlign: "center",
		color: myColors.blue3,
		fontSize: calcFont(20),
		fontFamily: myfonts.TajwalBold,
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
		height: h(40),
		fontSize: calcFont(16),
		fontFamily: myfonts.TajwalBold,
		marginVertical: h(20),
		backgroundColor: myColors.lightgray,
		paddingVertical: h(8),
	},
	hr: {
		borderBottomWidth: 1,
		borderBottomColor: myColors.lightgray,
		marginHorizontal: 20,
	},
	switchContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	infoContainer: {
		flexDirection: 'row',
		paddingHorizontal: 15,
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 40
	},
	keyContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexDirection: 'row',
		paddingStart: 10
	},
	valueContainer: {
		flex: 2,
		alignItems: 'flex-start'
	},
	infoKey: {
		fontSize: 16,
		fontFamily: myfonts.TajwalRegular,
		color: myColors.green
	},
	infoValue: {
		fontSize: 14,
		fontFamily: myfonts.TajwalRegular,
		// color: "#8A94A3"
		color: myColors.blackGray
	},
	menuItem: {
		marginTop: 7,
		marginBottom: 7,
		minWidth: 80,
		paddingHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: myColors.green,
		borderRadius: 10,
		marginEnd: 10
	},
	selectedMenu: {
		backgroundColor: myColors.green,
	},
	selectedMenuText: {
		color: myColors.white,
		fontFamily: myfonts.TajwalMedium,
		fontSize: calcFont(16),
	},
	notSelectedMenu: {
		// color: "#8A94A3",
		color: myColors.green,
		fontFamily: myfonts.TajwalMedium,
		fontSize: calcFont(16)

	},
	fullWidthContainer: {
		flex: 1,
		width: fullWidth(),
		paddingHorizontal: 20,
		paddingVertical:10
	},
	shopProduct: {
		height: 138,
		elevation: 3,
		backgroundColor: myColors.white,
		padding: 10,
		borderRadius: 12,
		backgroundColor: myColors.white,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.25,
		paddingHorizontal:w(15),
	},
	shopProductContainer: {
		flexDirection: 'row'
	},
	shopProductImageContainer: {
		width: 100,
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: h(10)

	},
	shopProductImg: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		borderRadius: 12,

	},
	shopProductDetailsContainer: {
		paddingHorizontal: 15,
		alignSelf:'center',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		flex: 1
	},
	productName: {
		fontSize: 16,
		fontFamily: myfonts.TajwalRegular,
		color: "#434343",
		marginBottom: 5,
		alignSelf: 'flex-start'
	},
	productDescription: {
		fontSize: 16,
		fontFamily: myfonts.TajwalRegular,
		color: "#919191",
		marginBottom: 5,
		alignSelf: 'flex-start',
		textAlign: 'left'
	},
	productPrice: {
		fontSize: 16,
		fontFamily: myfonts.TajwalRegular,
		color: myColors.green3,
		marginBottom: 5,
		alignSelf: 'flex-start'
	},
	menuContainer: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		backgroundColor: "#FFFFFF",
		elevation: 3,
		height: 50,
		backgroundColor: myColors.white,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.25
	},
	menuTitle: {
		textAlign: "center",
		width: w(375),
		height: h(40),
		fontSize: calcFont(16),
		fontFamily: myfonts.TajwalBold,
		backgroundColor: myColors.lightgray,
		paddingVertical: h(8),
		marginTop: 20
	},
	screen: {
		// backgroundColor: 'yellow',
		flexDirection: 'column',
		height: Dimensions.get('window').height,
		justifyContent: 'center',
		flex: 1
	},
	sliderImgContainer: {
		flex: 1,
		marginVertical: h(30)
	},
	sliderImg: {
		flex: 1,
		resizeMode: "contain",
		borderRadius: 20,
		width: "100%",
		height: 280,
		overflow: "hidden"
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
