import React, { useEffect } from "react";
import {
	I18nManager,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions,
	BackHandler
} from "react-native";
import Video from "react-native-video"
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart';

// Constants
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys"
import { styles } from "./styles";
import { icons } from "../../assets";

// Helpers
import I18n, { strings } from '../../i18n';

// SVGs
import EmirateFlag from '../../assets/SVGs/EmirateFlag'
import { setAppLanguage } from "../../utils/APIKit";


const { height } = Dimensions.get("window");
const ChooseLanguage = (Props) => {

	const onSelectLanguage = async (lang) => {
		try {
			await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.SelectedLanguage, lang);
			await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.PassSkip, '1');

		} catch (error) {
			console.log(error)
		}

		if (lang === "ar") {
			I18nManager.forceRTL(true)
			I18nManager.allowRTL(true)
		} else {
			I18nManager.forceRTL(false)
			I18nManager.allowRTL(false)
		}
		setAppLanguage(lang)

		I18n.locale = lang
		const PassSkip = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.PassSkip)
		RNRestart.Restart();
	}
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', () => true)
		// console.log("im language ::>>", Props.route.params);
		return () => BackHandler.removeEventListener('hardwareBackPress', () => false)

	}, [])
	return (
		<View style={styles.container}>
			<Video
				source={require("../../assets/video1.mp4")}
				//source={{uri: "https://youronlineVideo.mp4"}}
				style={{
					height: height,
					position: "absolute",
					top: 0,
					left: 0,
					alignItems: "stretch",
					bottom: 0,
					right: 0
				}}
				muted={true}
				repeat={true}
				resizeMode={"cover"}
				rate={1.0}
				ignoreSilentSwitch={"obey"}
			/>
			{ /*<View style={{ backgroundColor: "#000000", opacity: 0.8, height: height, position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}></View>*/}
			<View style={styles.bottom}>
				<View style={styles.bottomContainer}></View>
				<Text style={styles.currency}>{strings('countryLang')}</Text>
				<View style={styles.flaContainer}>
					<View style={styles.flagImgContainer}>
						<EmirateFlag width={22} />
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.countryText}>{strings('UAE')}</Text>
						<Text style={styles.countrySeparator}> | </Text>
						<TouchableOpacity
							activeOpacity={0.4}
							onPress={() => {
								Props.navigation.navigate("CountryAndCurrency", {
									showHeader: true
								});
							}}
						>
							<Text style={styles.changeLanguage}>{strings('change')}</Text>

						</TouchableOpacity>
					</View>
				</View>
				{Props.route && Props.route.params && Props.route.params.langChoosen ?
					<TouchableOpacity
						style={[styles.langButton, { alignSelf: 'center' }]}
						activeOpacity={0.4}
						onPress={() => Props.route.params.userExist ? Props.navigation.navigate("DrawerNavigation") : Props.navigation.navigate("OnBoardScreen")}
					>
						<Text style={styles.langText}>{strings('skip')}</Text>
					</TouchableOpacity>
					:
					<View style={styles.languageContainer}>
						<TouchableOpacity
							style={styles.langButton}
							activeOpacity={0.4}
							onPress={() => onSelectLanguage("en")}
						>
							<Text style={styles.langText}>English</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.langButton}
							activeOpacity={0.4}
							onPress={() => onSelectLanguage("ar")}
						>
							<Text style={styles.langText}>العربية</Text>
						</TouchableOpacity>
					</View>
				}
			</View>
		</View>
	);
};

export { ChooseLanguage };
