import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	I18nManager,
	Text,
	View,
	TouchableOpacity,
	Image,
	Dimensions,
	BackHandler,
	FlatList
} from "react-native";
import Carousel from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";
import Ionicons from 'react-native-vector-icons/Ionicons';
import PageControl from 'react-native-page-control';

import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";

// CONSTAMTS
import { CHANGE_BRANCH } from "../../Redux/actionTypes";

// SVGs
import EmirateFlag from '../../assets/SVGs/EmirateFlag'

// Helpers
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { HomeHeader } from "../../components/HomeHeader";
import { useNavigation } from "@react-navigation/core";
import { ZabayhDepartment } from "../../components/ZabayhDepartment";
import { ZabayhOffer } from "../../components/ZabayhOffer";
import { ZabayhProducts } from "../../components/ZabayhProducts";
import { AllProducts } from "../../components/AllProducts";
import { SubCategoryProducts } from "../../components/SubCategoryProducts";
import { Shop } from "../../components/Shop";
import { CustomLeftHeader } from "../../components";
import { useIsFocused } from '@react-navigation/native';
import { getCart } from '../../services/Cart';
import { myColors } from "../../styles";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { SuccessModal } from "../../components/Modals/SuccessModal"


// Helpers
import APIKit, { setBranchId } from "../../utils/APIKit";

const Zabayh = ({ route, navigation }) => {
	const dispatch = useDispatch()
	const { navigate } = useNavigation();
	const horizontalMargin = 20;
	const slideWidth = 280;
	const sliderWidth = Dimensions.get("window").width;
	const itemWidth = slideWidth + horizontalMargin * 2;
	const isFocused = useIsFocused();

	const [category, setCategory] = useState(undefined);
	const [selectedSubCategory, setSelectedSubCategory] = useState(0);
	const [mainCategories, setMainCategories] = useState([]);
	const [sliderImgs, setSliderImgs] = useState([]);
	const [bannerImgs, setBannerImgs] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [subCategory, setSubCategory] = useState(undefined)
	const [numColumns, setNumColumns] = useState(0)
	const [shops, setShops] = useState([])
	const [allProducts, setAllProducts] = useState([])
	const [filteredProducts, setFilteredProducts] = useState([])
	const [productsInCart, setProductsInCart] = useState(0)
	const [notifactionCount, setNotifactionCount] = useState(0)
	const userData = useSelector(state => state.session.user)

	const [sectionTitle, setSectionTitle] = useState({})

	const [activeSlide, setActiveSlide] = useState(0)
	const [showCategoryModal, setShowCategoryModal] = useState(false)
	// useEffect(() => {
	// 	BackHandler.addEventListener("hardwareBackPress", () => {
	// 		navigation.goBack()
	// 		return true;
	// 	});
	// }, []);

	useEffect(() => {
		getCart((res) => {
			let totalProdctsInCart = 0
			console.log("response of cart in home::>>", res.data);
			res.data && res.data.map((item) => {
				console.log(item.details);
				let detailsLength = item?.department ? item.details.length : 0
				totalProdctsInCart = totalProdctsInCart + detailsLength;

			})
			console.log(totalProdctsInCart);
			setProductsInCart(totalProdctsInCart)
		})


	}, [isFocused,sliderImgs]);
	useEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<Image source={icons.homeheaderlogo} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
				</View>
			),
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.8}
					style={{ width: 44, height: 44, justifyContent: "center", alignItems: "center", marginHorizontal: 7 }}
					onPress={() => {
						navigation.goBack()
					}}
				>
					<Ionicons
						name={(I18nManager.isRTL) ? 'arrow-forward-outline' : 'arrow-back-outline'}
						//name='close-outline'
						color={'#000000'}
						size={25}
					/>
				</TouchableOpacity>
			),
			headerRight: () => (
				<View style={{ width: 100, paddingEnd: 10, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ width: 25, height: 44, justifyContent: "center", alignItems: "center" }}
						onPress={() => {
							if (userData&&userData.first_name) {
								navigation.navigate('MyNotifactions')
							} else {
								setLoginModal(true)
							}
						}}
					>
						<Ionicons
							name='notifications-outline'
							color={myColors.green3}
							size={25}
						/>
						<View style={{
							backgroundColor: myColors.green3, position: 'absolute', borderRadius: 15 / 2,
							width: 15, height: 15, alignContent: 'center', top: 8, left: 11
						}}>
							<Text style={{ alignSelf: 'center', color: 'white' ,fontSize:11 }}>{notifactionCount}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ width: 55, height: 44, justifyContent: "center", alignItems: "center" }}
						onPress={() => {
							if (userData&&userData.first_name) {
								navigation.navigate('MyCart')
							} else {
								setLoginModal(true)
							}
						}}
					>
						{/* <Ionicons
							name='ios-cart-outline'
							color={'#000000'}
							size={35}
						/> */}

						<EvilIcons
							name='cart'
							color={myColors.green3}
							size={33}
						/>
						<View style={{
							backgroundColor: myColors.green3, position: 'absolute', borderRadius: 15 / 2,
							width: 15, height: 15, alignContent: 'center', top:8, right: 10
						}}>
							<Text style={{ alignSelf: 'center', color: 'white' ,fontSize:11 }}>{productsInCart}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ width: 47, height: 44, justifyContent: "center", alignItems: "center" }}
						onPress={() => { navigation.navigate('CountryAndCurrency') }}
					>
						<EmirateFlag width={40} />
						{ /*<Image source={icons.homeheaderflag} />*/}
					</TouchableOpacity>
				</View>
			)
		})
	}, [productsInCart])

	useEffect(() => {
		if (route.params.category) {
			setCategory(route.params.category);
		}
		if (route.params.mainCategories) {
			setMainCategories(route.params.mainCategories);
		}
	}, [route]);

	useEffect(() => {
		if (category) {
			refreshData()
		}
	}, [category]);

	const refreshData = () => {
		console.log("HERE Refresh Data")


		setSliderImgs([])
		setBannerImgs([])
		setSubCategories([])
		setSubCategory(undefined)
		setAllProducts([])
		setFilteredProducts([])
		setShops([])

		fetchSlider();
		fetchBanners();
		fetchSubCategories(category);
	}

	const fetchSlider = async () => {
		const response = await APIKit.post("slider/category", {
			category_id: category.id,
		});
		console.log(response)
		if (response.data.status === 200) {
			setSliderImgs(response.data.data);
		}
	};

	const fetchBanners = async () => {
		const response = await APIKit.post("banners/category", {
			category_id: category.id,
		});
		if (response.data.status === 200) {
			setBannerImgs(response.data.data);
		}
	};

	const fetchSubCategories = async (categoryData) => {
		console.log(categoryData)
		const response = await APIKit.get(`categories/${categoryData.id}`);
		/*const response = await APIKit.post(`categories`, {
			parent_id: categoryData.id,
		});*/
		console.log(response)
		if (response.data.status === 200) {
			console.log(response.data.data);
			setSubCategories(response.data.data.sub_categories);
			setAllProducts(response.data.data.products)
			setFilteredProducts(response.data.data.products)
			setShops(response.data.data.shops)

			setSectionTitle({
				shop_section_name: response.data.data.shop_section_name,
				slider_section_name: response.data.data.slider_section_name,
			})
		}

		const response2 = await APIKit.post(`categories`, {
			parent_id: categoryData.id,
		});
		console.log(response2)
	};

	useEffect(() => {
		if (subCategories.length > 0) {
			setNumColumns(Math.ceil(subCategories.length / 2))
			setSubCategory(subCategories[0])
		}
	}, [subCategories])

	const handelBranches = (branch = null, onSucessAddBranchId) => {
		console.log(branch)
		if (branch && branch.id) {
			setBranchId(branch.id)
			dispatch({ type: CHANGE_BRANCH, data: branch })
			onSucessAddBranchId && onSucessAddBranchId()
			return
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<HomeHeader
				onFinish={branch => {
					handelBranches(branch, () => {
						refreshData()
					})
				}}
			/>

			<FlatList
				ListHeaderComponent={
					<React.Fragment>
						<View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 30 }}>
							<FlatList
								data={mainCategories}
								renderItem={({ item }) => (
									<ZabayhDepartment
										obj={item}
										isSelected={item.id === category.id ? true : false}
										onPress={ () => {
											if (parseInt(item.is_available) === 1) {
												setCategory(item)
											}else{
												setShowCategoryModal(true)
											}
										}}
									/>
								)}
								keyExtractor={(item, index) => index + ""}
								horizontal
								showsHorizontalScrollIndicator={false}
							/>
						</View>
						{
							(sliderImgs.length > 0 &&
								<View style={{ alignItems: 'flex-start' }}>
									<View style={styles.titleContainer}>
										<Text style={styles.offersTitle}>
											{ sectionTitle.slider_section_name }
										</Text>
									</View>
									<Carousel
										data={sliderImgs}
										sliderWidth={sliderWidth}
										itemWidth={itemWidth}
										renderItem={({ item }) => (
											<ZabayhOffer
												offerImage={item.image}
												title1={item.title}
												title2={item.sub_title}
												badge={item.badge}
												badgeBackgroundColor={item.badge_color}
											/>
										)}
										onSnapToItem={(index) => setActiveSlide(index) }
									/>
									<PageControl
										style={{ marginBottom: 10, alignSelf: 'center' }}
										numberOfPages={sliderImgs.length}
										currentPage={ activeSlide }
										hidesForSinglePage
										pageIndicatorTintColor='#E6E6E6'
										currentPageIndicatorTintColor={ myColors.green }
										indicatorStyle={{borderRadius: 2}}
										//currentIndicatorStyle={{borderRadius: 5}}
										//currentIndicatorStyle={{width: 15}}
										indicatorSize={{width:10, height:4}}
										//onPageIndicatorPress={this.onItemTap}
									/>
								</View>
							)
						}
						{
							(subCategories.length > 0 && numColumns > 0 &&
								<React.Fragment>
									<View style={styles.titleContainer}>
										<Text style={styles.zabayhTitle}>
											{category.name}
										</Text>
									</View>
									<View style={{ alignItems: 'center' }}>
										<FlatList
											horizontal
											contentContainerStyle={{
												alignSelf: "flex-start",
											}}
											showsVerticalScrollIndicator={false}
											showsHorizontalScrollIndicator={false}
											data={subCategories}
											renderItem={({ item, index }) => (
												<ZabayhProducts
													title={item.name}
													zabayhImage={item.image}
													isSelected={index === selectedSubCategory ? true : false}
													onPress={() => {
														if (!item.sub_categories) {
															const products = allProducts.map((prod) => {
																if (prod.category.id === item.id) {
																	return prod
																}
															})
															setFilteredProducts(products)
														}
														setSubCategory(item)
														setSelectedSubCategory(index)
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
							(subCategory && subCategory.sub_categories &&
								<FlatList
									style={{ marginTop: 10 }}
									contentContainerStyle={{
										alignSelf: "flex-start",
									}}
									horizontal
									showsVerticalScrollIndicator={false}
									// showsHorizontalScrollIndicator={false}
									data={subCategory.sub_categories}
									renderItem={({ item }) => (
										<SubCategoryProducts
											title={item.name}
											zabayhImage={item.image}
											onPress={() => {
												console.log(item)
												if (item.has_one_product === 1) {
													navigation.navigate('SingleZabeha', {
														mainCategory: category,
														subCategory: subCategory,
														productId: item.product_id,
														productName: item.name
													})
												}
											}}
										/>
									)}
									keyExtractor={(item) => item.id + ""}
								/>
							)
						}
						{
							(shops.length > 0 &&
								<React.Fragment>
									<View style={[styles.titleContainer, styles.marginTop]}>
										<Text style={styles.allProductsTitle}>
											{ sectionTitle.shop_section_name }
										</Text>
									</View>
									<FlatList
										numColumns={1}
										data={shops}
										renderItem={({ item }) => (
											<Shop
												image={item.image}
												title={item.name}
												desc={item.description}
												info={item.info}
												rating={item.rating}
												onPress={() => {
													navigate("SingleShop", {
														shop: item
													});
												}}
											/>
										)}
										keyExtractor={(item) => item.id}
										showsVerticalScrollIndicator={false}
									/>
								</React.Fragment>
							)
						}
						{
							(filteredProducts.length > 0 &&
								<View style={[styles.titleContainer, styles.marginTop]}>
									<Text style={styles.allProductsTitle}>
										{strings("All Products")}
									</Text>
								</View>
							)
						}
					</React.Fragment>
				}
				numColumns={2}
				data={filteredProducts}
				renderItem={({ item }) => (
					<AllProducts
						departmentImage={item.image}
						title1={item.name}
						title2={""}
						badges={item.badges}
						onPress={() => {
							navigation.navigate('SingleZabeha', {
								productId: item.id,
								productName: item.name,
								mainCategory: category
							})
						}}
					/>
				)}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
			/*ListFooterComponent={
				<Footer/>
			}*/
			/>

			{
				(showCategoryModal &&
					<SuccessModal
						isVisible={true}
						title={strings("This department is not currently available")}
						leftTitle={strings("Close")}
						onClose={() => { setShowCategoryModal(false) }}
						leftAction={() => {
							setShowCategoryModal(false)
						}}
					/>
				)
			}
		</SafeAreaView>
	);
};

export { Zabayh };
