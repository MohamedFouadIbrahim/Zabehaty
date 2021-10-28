import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	ScrollView,
	BackHandler,
	TouchableOpacity,
	Image,
	I18nManager,
	ImageBackground,
	Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import Carousel from "react-native-snap-carousel";

import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";
// CONSTAMTS
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys";
import { CHANGE_ADDRESS, CHANGE_BRANCH, UPDATE_USER } from "../../Redux/actionTypes";

// Helpers
import APIKit, { setBranchId, setClientToken } from "../../utils/APIKit";
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { ImportantProducts } from "../../components/ImportantProductsCard";
import { TodayOffers } from "../../components/TodayOffers";
import { DepartmentShopping } from "../../components/DepartmentShopping";
import { HomeHeader } from "../../components/HomeHeader";
import { FlatList } from "react-native-gesture-handler";
import FastImage from "react-native-fast-image";

import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native";


import { useIsFocused } from '@react-navigation/native';
import { getBranches } from "../../services/Places";

const Home = ({ route, navigation }) => {
	const horizontalMargin = 20;
	const slideWidth = 280;
	const sliderWidth = Dimensions.get("window").width;
	const itemWidth = slideWidth + horizontalMargin * 2;

	const currentBranch = useSelector(state => state.address.currentBranch)

	const { navigate } = useNavigation();
	const dispatch = useDispatch();

	const isFocused = useIsFocused();

	const [offersNumberOfColumn, setOffersNumberOfColumn] = useState(0)
	const [sliderImgs, setSliderImgs] = useState([])
	const [bannerImgs, setBannerImgs] = useState([])
	const [categories, setCategories] = useState([])
	const [topProducts, setTopProducts] = useState([])
	const [offers, setOffers] = useState([])

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => true);
		return () =>
			BackHandler.removeEventListener("hardwareBackPress", () => false);
	}, []);

	/*useEffect(() => {
		// Prevent Back
		console.log(isFocused)
		if (isFocused) {
			BackHandler.addEventListener("hardwareBackPress", () => true);
		}else{
			BackHandler.removeEventListener("hardwareBackPress", () => true);
		}
		//return () =>
			//BackHandler.removeEventListener("hardwareBackPress", () => true);
	}, [isFocused]);*/

	const handelBranches = (branch = null, onSucessAddBranchId) => {

		if (branch?.id) {
			setBranchId(branch.id)
			dispatch({ type: CHANGE_BRANCH, data: branch })
			onSucessAddBranchId && onSucessAddBranchId()
			return
		}

		if (currentBranch?.id) { // we stoed braches before 
			setBranchId(currentBranch?.id)
			onSucessAddBranchId && onSucessAddBranchId()
		} else {
			getBranches(({ data }) => {
				const defaultBranch = data.find(item => item.id == 1)
				setBranchId(defaultBranch.id)
				dispatch({ type: CHANGE_BRANCH, data: defaultBranch })
				onSucessAddBranchId && onSucessAddBranchId()
			})
		}
	}

	const fetchData = () => {
		fetchSlider()
		fetchBanners()
		fetchCategories()
		fetchTopProducts()
		fetchOffers()
	}

	useEffect(() => {
		handelBranches(null, () => {
			fetchData()
		})
	}, [])

	useEffect(() => {
		if (offers.length > 0) {
			setOffersNumberOfColumn(Math.ceil((offers.length / 2)))
		}
	}, [offers])

	const fetchSlider = async () => {
		const response = await APIKit.get('slider/home')
		if (response.data.status === 200) {
			setSliderImgs(response.data.data)
		}
	}

	const fetchBanners = async () => {
		const response = await APIKit.get('banners/home')
		if (response.data.status === 200) {
			setBannerImgs(response.data.data)
		}
	}

	const fetchCategories = async () => {
		const response = await APIKit.get('categories')
		if (response.data.status === 200) {
			setCategories(response.data.data)
		}
	}

	const fetchTopProducts = async () => {
		const response = await APIKit.get('product/badges/top_products')
		if (response.data.status === 200) {
			setTopProducts(response.data.data)
			console.log(response.data.data)
		}
	}

	const fetchOffers = async () => {
		const response = await APIKit.get('product/badges/daily_offers')
		if (response.data.status === 200) {
			setOffers(response.data.data)
		}
	}

	const logoutAction = async () => {
		setClientToken("");
		try {
			await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.FirebaseToken);
			await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.SelectedLanguage);
			await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.AuthBanners);
			await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.UserData);
		} catch (e) {
			// saving error
			console.log(e);
		}

		dispatch({ type: UPDATE_USER, data: {} });

		RNRestart.Restart();
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<HomeHeader
				showAddress={true}
				governorate={currentBranch?.name}
				onSelectAddess={(branch) => {
					handelBranches(branch, () => {
						fetchData()
					})
				}}
			/>
			<ScrollView style={styles.container}>
				{
					(sliderImgs.length > 0 &&
						<View style={styles.pointsContainer}>
							<Carousel
								data={sliderImgs}
								sliderWidth={sliderWidth}
								itemWidth={itemWidth}
								enableSnap={true}
								autoplay={true}
								enableMomentum={false}
								lockScrollWhileSnapping={true}
								loop={true}
								renderItem={({ item }) => (
									<TouchableOpacity activeOpacity={0.9} style={styles.sliderImgContainer}>
										<Image source={{ uri: item.image }} style={styles.sliderImg} />
									</TouchableOpacity>
								)}
							/>
							{ /*<FlatList
								style={{ width: "100%" }}
								scrollEnabled={true}
								data={sliderImgs}
								renderItem={({ item }) =>
									<TouchableOpacity activeOpacity={0.9} style={styles.sliderImgContainer}>
										<ImageBackground source={{ uri: item.image }} style={styles.sliderImg}>
										</ImageBackground>
									</TouchableOpacity>
								}
								pagingEnabled={true}
								keyExtractor={(item, index) => index + ""}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>*/ }
						</View>
					)
				}


				<View style={styles.advantagesContainer}>
					<Text style={styles.advantagesText}>
						{strings("Become Distingushed Customer")}
					</Text>
					<Image source={icons.advantagesimg} style={styles.advantagesImg} />
				</View>

				{
					(topProducts.length > 0 &&
						<React.Fragment>
							<View style={styles.titleContainer}>
								<Text style={styles.importantText}>
									{strings("Important Products")}
								</Text>
							</View>
							<FlatList
								style={{ height: 270 }}
								data={topProducts}
								renderItem={({ item }) => (
									<ImportantProducts
										price={item.price}
										desc={item.name}
										productImage={item.image}
										onPress={() => {
											navigation.navigate('SingleZabeha', {
												productId: item.id
											})
										}}
									/>
								)}
								keyExtractor={(item, index) => index + ""}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
						</React.Fragment>
					)
				}
				{
					(offers.length > 0 && offersNumberOfColumn > 0 &&
						<React.Fragment>
							<View style={styles.titleContainer}>
								<Text style={styles.todayOffers}>{strings("Today Offers")}</Text>
							</View>
							<View style={{ alignItems: 'flex-start' }}>
								<FlatList
									horizontal
									//scrollEnabled={false}
									contentContainerStyle={{
										//alignSelf: "flex-start",
									}}
									//numColumns={offersNumberOfColumn}
									showsVerticalScrollIndicator={false}
									showsHorizontalScrollIndicator={false}
									data={offers}
									renderItem={({ item }) => (
										<TodayOffers
											price={item.price}
											desc={item.name}
											productImage={item.image}
											onPress={() => {
												navigation.navigate('SingleZabeha', {
													productId: item.id
												})
											}}
										/>
									)}
									keyExtractor={(item, index) => index + ""}
								/>
							</View>
						</React.Fragment>
					)
				}
				{
					(bannerImgs.length > 0 &&
						<View style={styles.advertismentImgContainer}>
							<Image source={{ uri: bannerImgs[0].image }} style={styles.advertismentImg} />
						</View>
					)
				}
				{ /* <Image source={icons.advertismentImg} style={styles.advertismentImg} /> */}
				<View style={styles.titleContainer}>
					<Text style={styles.departmentText}>
						{strings("Departmental Shopping")}
					</Text>
				</View>

				<FlatList
					scrollEnabled={false}
					numColumns={2}
					data={categories}
					columnWrapperStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}
					renderItem={({ item }) => (
						<DepartmentShopping
							departmentImage={item.image}
							title={item.name}
							onPress={() => navigate("Zabayh", { category: item, mainCategories: categories })}
						/>
					)}
					keyExtractor={(item, index) => index + ""}
				/>

				{
					(bannerImgs.length > 1 &&
						<View style={styles.advertismentImgContainer}>
							<Image source={{ uri: bannerImgs[1].image }} style={styles.advertismentImg} />
						</View>
					)
				}
				{ /*<Image source={icons.advertismentImg} style={styles.advertismentImg} />*/}

				{ /*<TouchableOpacity
					style={{ marginTop: 20, height: 30 }}
					activeOpacity={0.4}
					onPress={logoutAction}
				>
					<Text>Logout</Text>
				</TouchableOpacity>*/ }
			</ScrollView>
		</SafeAreaView>
	);
};

export { Home };
