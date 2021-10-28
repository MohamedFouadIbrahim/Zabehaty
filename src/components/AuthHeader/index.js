import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, Animated } from "react-native";

// Constants
import { icons } from "../../assets";
import { styles } from "./styles";

// Helpers
import { strings } from '../../i18n';
import { SKIP_AUTH } from '../../Redux/actionTypes';
import { useDispatch } from 'react-redux';
import { calcHeaderBorderRadius } from "../../mutils";


export const AuthHeader = ({ navigate, img, startContentAnimation, onSkip, forceSkip }) => {
	const dispatch = useDispatch()

	const [headerAnimation] = useState(
		new Animated.Value(0)
	)
	const [headerContainerAnimation] = useState(
		new Animated.Value(1000)
	)

	useEffect(() => {
		animateHeader()
	}, [])

	const animateHeader = () => {
		Animated.parallel([
			Animated.timing(headerAnimation, {
				toValue: calcHeaderBorderRadius(1.2, 50),
				duration: 1000,
				useNativeDriver: true
			}),
			Animated.timing(headerContainerAnimation, {
				toValue: 280,
				duration: 1000,
				//useNativeDriver: true
			})
		]).start(() => {
			// callback
			if (startContentAnimation)
				startContentAnimation()
		});
	}


	const defaultAnimationStyle = {
		borderBottomLeftRadius: headerAnimation,
		borderBottomRightRadius: headerAnimation,
	}
	const defaultHeaderAnimationStyle = {
		height: headerContainerAnimation
	}
	return (
		<React.Fragment>
			<Animated.View style={[styles.logo, defaultHeaderAnimationStyle]}>
				<Animated.View style={[styles.grassBGContainer, defaultAnimationStyle]}>
					<Image source={(img) ? { uri: img } : icons.grassImg} style={styles.grassBG} />
				</Animated.View>
				<View style={[styles.logoContainer]}>
					<Image source={icons.logo} style={styles.imgStyles} />
				</View>
			</Animated.View>
			<TouchableOpacity
				onPress={() => {

					dispatch({ type: SKIP_AUTH, data: true })

					if (forceSkip) {
						onSkip()
						return
					} else {
						//navigate.goBack()
						navigate('DrawerNavigation')
					}

				}}
				style={styles.skip}
			>
				<Text style={styles.skipText}>{strings("Skip")}</Text>
			</TouchableOpacity>
		</React.Fragment>
	);
}
