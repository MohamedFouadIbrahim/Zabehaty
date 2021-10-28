import React, { useCallback } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { myColors } from "../../styles";
import { w, h } from "../../mutils";
import { View, Text, Image, TouchableOpacity, I18nManager, SafeAreaView, Platform } from "react-native";
import { Step1 } from "../WalkThroughStep1/Step1";
import { Step3 } from "../WalkTroughStep3/Step3";
import { Step2 } from "../WalkThroughStep2/Step2";
import { Button } from "../../components";
import { Step4 } from "../WalkThroughStep4/Step4";
import { icons } from "../../assets";
import {strings} from "../../i18n"

const _OnBoardCard = ({ data }) => {
	const { navigate } = useNavigation();
	const [index, setIndex] = React.useState(0);
	const isCarousel = React.useRef(null);
	const snapToNext = useCallback(() => isCarousel.current.snapToNext());


	const skip = () => {
		console.log("HEREEE")
		navigate('Login')
	}
	/*const skip = useCallback(() => {
		console.log("HERE")
		navigate("Login");
		// replace('Auth');
		// dispatch(onBoard());
	});*/

	let imgList = []
	if (Platform.OS !== 'ios') {
		imgList = I18nManager.isRTL ? data.slice().reverse() : data;
	}else{
		imgList = data
	}

	return (
		<View style={styles.slideContainer}>
			<Carousel
				layout={"default"}
				data={imgList}
				renderItem={({ item }) => item}
				//sliderWidth={w(600)}
				sliderWidth={w(375)}
				itemWidth={w(375)}
				slideStyle={styles.slideStyle}
				onSnapToItem={(index) => setIndex(index)}
				enableSnap={ true }
				lockScrollWhileSnapping={ true }
				ref={isCarousel}
			/>
			{
				(index === 3 &&
					<TouchableOpacity
						activeOpacity={ 0.4 }
						// text={translate('skip')}
						style={styles.endskip}
						onPress={skip}
					>
						<Text style={styles.endskipText}>{strings('skip')}</Text>
					</TouchableOpacity>
				)
			}
			<View style={styles.pageControlContainer}>
				{
					(index !== 3 &&
						<React.Fragment>
							<TouchableOpacity
								activeOpacity={ 0.4 }
								style={styles.skip}
								onPress={skip}
							>
								<Text style={styles.skipText}>{strings('skip')}</Text>
							</TouchableOpacity>
							<View style={styles.pagination}>
								<Pagination
									dotsLength={imgList.length}
									activeDotIndex={index}
									carouselRef={isCarousel}
									dotStyle={{
										width: h(16),
										height: h(16),
										borderRadius: h(8),
										marginHorizontal: w(0),
										backgroundColor: myColors.white,
										zIndex: 4,
									}}
									inactiveDotStyle={{
										width: h(14),
										height: h(14),
										borderRadius: h(7),
										marginHorizontal: w(0),
										backgroundColor: myColors.white,
									}}
									activeOpacity={1}
									inactiveDotOpacity={0.4}
									inactiveDotScale={0.6}
									tappableDots={true}
								/>
							</View>
							<TouchableOpacity
								style={styles.next}
								onPress={snapToNext}
							>
								{
									(I18nManager.isRTL) ?
										<Image source={icons.walknextstepRTL} style={styles.walkIcon} />
										:
										<Image source={icons.walknextstep} style={styles.walkIcon} />
								}
							</TouchableOpacity>
						</React.Fragment>
					)
				}
				{
					(index === 3 &&
						<React.Fragment>
							<View style={styles.endpagination}>
								<Pagination
									dotsLength={imgList.length}
									activeDotIndex={index}
									carouselRef={isCarousel}
									dotStyle={{
										width: h(16),
										height: h(16),
										borderRadius: h(8),
										marginHorizontal: w(0),
										backgroundColor: myColors.white,
										zIndex: 4,
									}}
									inactiveDotStyle={{
										width: h(14),
										height: h(14),
										borderRadius: h(7),
										marginHorizontal: w(0),
										backgroundColor: myColors.white,
									}}
									activeOpacity={1}
									inactiveDotOpacity={0.4}
									inactiveDotScale={0.6}
									tappableDots={true}
								/>
							</View>
							<TouchableOpacity
								style={styles.next2}
								onPress={() => {
									navigate("Login");
								}}
							>
								{
									(I18nManager.isRTL) ?
										<Image source={icons.walknextstepRTL} style={styles.walkIcon1} />
										:
										<Image source={icons.walknextstep} style={styles.walkIcon1} />
								}
							</TouchableOpacity>
						</React.Fragment>
					)
				}
			</View>
		</View>
	);
};
const OnBoardCard = React.memo(_OnBoardCard);
export const OnBoardScreen = () => {
	const screens = [<Step1 />, <Step2 />, <Step3 />, <Step4 />];
	return <OnBoardCard data={screens} />;
};
