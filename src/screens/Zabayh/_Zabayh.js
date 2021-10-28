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
} from "react-native";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Carousel from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";


import { icons } from "../../assets";
import { myColors } from "../../styles";

import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";

// Helpers
import { strings } from "../../i18n";
import { HomeHeader } from "../../components/HomeHeader";
import { useNavigation } from "@react-navigation/core";
import { ZabayhDepartment } from "../../components/ZabayhDepartment";
import { ZabayhOffer } from "../../components/ZabayhOffer";
import { ZabayhProducts } from "../../components/ZabayhProducts";
import { AllProducts } from "../../components/AllProducts";
import { SubCategoryProducts } from "../../components/SubCategoryProducts";
import { Shop } from "../../components/Shop";

// Helpers
import APIKit from "../../utils/APIKit";

const Zabayh = ({ route, navigation }) => {
	const { navigate } = useNavigation();
	const horizontalMargin = 20;
	const slideWidth = 280;
	const sliderWidth = Dimensions.get("window").width;
	const itemWidth = slideWidth + horizontalMargin * 2;

	const [category, setCategory] = useState(undefined);
	const [mainCategories, setMainCategories] = useState([]);
	const [sliderImgs, setSliderImgs] = useState([]);
	const [bannerImgs, setBannerImgs] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [subCategory, setSubCategory] = useState(undefined)
	const [numColumns, setNumColumns] = useState(0)
	const [shops, setShops] = useState([])
	const [allProducts, setAllProducts] = useState([])

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => {
			navigation.goBack()
			return true;
		});
	}, []);

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
			setSliderImgs([])
			setBannerImgs([])
			setSubCategories([])
			setSubCategory(undefined)
			setAllProducts([])
			setShops([])

			fetchSlider();
			fetchBanners();
			fetchSubCategories(category);
		}
	}, [category]);

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
			setShops(response.data.data.shops)
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

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<HomeHeader showAddress={true} />
			<ScrollView style={styles.container}>
				<View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 30 }}>
					<FlatList
						// style={{ height: 120 }}
						data={mainCategories}
						renderItem={({ item }) => (
							<ZabayhDepartment
								obj={item}
								isSelected={item.id === category.id ? true : false}
								onPress={setCategory}
							/>
						)}
						keyExtractor={(item, index) => index + ""}
						horizontal
						showsHorizontalScrollIndicator={false}
					/>
				</View>
				{
					(sliderImgs.length > 0 &&
						<React.Fragment>
							<View style={styles.titleContainer}>
								<Text style={styles.offersTitle}>{strings("Offers")}</Text>
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
							/>
						</React.Fragment>
					)
				}

				{
					(subCategories.length > 0 && numColumns > 0 &&
						<React.Fragment>
							<View style={styles.titleContainer}>
								<Text style={styles.zabayhTitle}>
									{ category.name }
								</Text>
							</View>
							{ /*<ScrollView
								horizontal
								showsVerticalScrollIndicator={false}
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={{ paddingVertical: 0 }}
							>*/ }
								<FlatList
									horizontal
									style={{ marginTop: 20 }}
									//scrollEnabled={false}
									contentContainerStyle={{
										alignSelf: "flex-start",
									}}
									//numColumns={numColumns}
									showsVerticalScrollIndicator={false}
									showsHorizontalScrollIndicator={false}
									data={subCategories}
									renderItem={({ item }) => (
										<ZabayhProducts
											title={item.name}
											zabayhImage={item.image}
											onPress={ () => setSubCategory(item) }
										/>
									)}
									keyExtractor={(item, index) => index + ""}
								/>
							{ /*</ScrollView>*/ }
						</React.Fragment>
					)
				}
				{/*<ScrollView
							horizontal
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{ paddingVertical: 0 }}
						>*/ }
				{
					(subCategory && subCategory.sub_categories &&
						<FlatList
							style={{ marginTop: 10 }}
							//scrollEnabled={false}
							contentContainerStyle={{
								alignSelf: "flex-start",
							}}
							//numColumns={subCategory.sub_categories.length}
							horizontal
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}
							data={subCategory.sub_categories}
							renderItem={({ item }) => (
								<SubCategoryProducts
									title={item.name}
									zabayhImage={item.image}
									onPress={ () => {
										console.log(item)
										if (item.has_one_product === 1) {
											navigation.navigate('SingleZabeha', {
												mainCategory: category,
												subCategory: subCategory,
												productId: item.product_id
											})
										}
									} }
								/>
							)}
							keyExtractor={(item) => item.id + ""}
						/>
					)
				}
				{
					(shops.length > 0 &&
						<React.Fragment>
							<View style={[ styles.titleContainer, styles.marginTop ]}>
								<Text style={styles.allProductsTitle}>
									{strings("Shops")}
								</Text>
							</View>
							<FlatList
								numColumns={ 1 }
								data={shops}
								renderItem={({ item }) => (
									<Shop
										image={item.image}
										title={item.name}
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
					(allProducts.length > 0 &&
						<React.Fragment>
							<View style={[ styles.titleContainer, styles.marginTop ]}>
								<Text style={styles.allProductsTitle}>
									{strings("All Products")}
								</Text>
							</View>
							<FlatList
								numColumns={ 2 }
								data={allProducts}
								renderItem={({ item }) => (
									<AllProducts
										departmentImage={item.image}
										title1={item.name}
										title2={""}
										onPress={ () => {
											navigation.navigate('SingleZabeha', {
												productId: item.id
											})
										} }
									/>
								)}
								keyExtractor={(item) => item.id}
								showsVerticalScrollIndicator={false}
							/>
						</React.Fragment>
					)
				}
			</ScrollView>
		</SafeAreaView>
	);
};

export { Zabayh };
