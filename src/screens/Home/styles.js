import { StyleSheet } from "react-native";
import { w, h, calcFont, fullWidth } from "../../mutils";
import { myColors } from "../../styles/myColors";
import { myfonts } from "../../../assets";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: myColors.white,
	},
	homeheader: {
		justifyContent: "space-around",
		alignItems: "center",
		marginVertical: h(20),
		flexDirection: "row-reverse",
	},
	LogoContainer: {
		marginHorizontal: w(40),
	},

	addressContainer: {
		height: h(39),
		backgroundColor: myColors.orange,
		paddingHorizontal: w(25),
		justifyContent: "space-between",
		flexDirection: "row-reverse",
		alignItems: "center",
	},
	addressInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	pointsContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 10
	},
	sliderImgContainer: {
		flex: 1
	},
	sliderImg: {
		flex: 1,
		resizeMode: "cover",
		borderRadius: 20,
		width: "100%",
		height: 280,
		overflow: "hidden"
	},
	advantagesContainer: {
		flex: 1,
		height: 73,
		marginTop: 25,
		marginBottom: 25,
		marginStart: 16,
		marginEnd: 16,
		borderRadius: 10,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: "#FFD700",
		backgroundColor: myColors.green,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	advantagesText: {
		width: h(203),
		fontSize: calcFont(13),
		fontFamily: myfonts.TajwalBold,
		color: "#FFD700",
		textAlign: "center",
		marginRight: w(20),
	},
	importantText: {
		fontSize: 20,
		fontFamily: myfonts.TajwalBold,
		marginHorizontal: 15,
		lineHeight: 50,
		alignSelf: 'flex-start'
	},
	todayOffers: {
		fontSize: calcFont(20),
		fontFamily: myfonts.TajwalBold,
		marginHorizontal: 15,
		lineHeight: 50,
		alignSelf: 'flex-start'
	},
	departmentText: {
		fontSize: calcFont(20),
		fontFamily: myfonts.TajwalBold,
		marginHorizontal: 15,
		lineHeight: 50,
		alignSelf: 'flex-start'
	},
	welcomeText: {
		fontSize: calcFont(24),
		fontFamily: myfonts.TajwalBold,
	},
	advertismentImgContainer: {
		flex: 1,
		width: w(375),
		height: h(150),
		marginBottom: 15
	},
	advertismentImg: {
		flex:1,
		resizeMode: "contain"
	},
	titleContainer: {
		alignItems: "flex-start",
		justifyContent: 'center',
		width: fullWidth(),
		height: 50,
		backgroundColor: myColors.lightgray,
		marginBottom: 10
	},
	textsContainer: {
		position: "absolute",
		bottom: 0,
		backgroundColor: myColors.gray4,
		width: "100%",
		height: 67,
		zIndex: 2,
		opacity: 0.4,
		borderBottomEndRadius: 20,
		borderBottomStartRadius: 20
	},
	firsttitle: {
		fontSize: calcFont(18),
		fontFamily: myfonts.TajwalBold,
		color: myColors.white,
		textAlign: "center",
		zIndex: 4,
		position: "absolute",
		bottom: h(35),
		alignSelf: "center",
	},
	secondtitle: {
		fontSize: calcFont(12),
		fontFamily: myfonts.TajwalBold,
		color: myColors.white,
		textAlign: "center",
		zIndex: 4,
		position: "absolute",
		bottom: h(10),
		width: w(200),
		alignSelf: "center",
	},
});
