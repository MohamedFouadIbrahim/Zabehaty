import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	I18nManager,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Image,
	Dimensions,
	BackHandler,
	RefreshControl
} from "react-native";
import Carousel from "react-native-snap-carousel";
import FastImage from "react-native-fast-image";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from "react-redux";

import { icons } from "../../assets";
import { myColors } from "../../styles";

import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";

// SVGs
import EmirateFlag from '../../assets/SVGs/EmirateFlag'

// Helpers
import { strings } from "../../i18n";
import { HomeHeader } from "../../components/HomeHeader";
import { useNavigation } from "@react-navigation/core";
import { ZabayhDepartment } from "../../components/ZabayhDepartment";
import { ZabayhOffer } from "../../components/ZabayhOffer";
import { ZabayhProducts } from "../../components/ZabayhProducts";
import { FlatList } from "react-native-gesture-handler";
import { AllProducts } from "../../components/AllProducts";
import { SubCategoryProducts } from "../../components/SubCategoryProducts";
import { Shop } from "../../components/Shop";

// Helpers
import APIKit, { setBranchId } from "../../utils/APIKit";

const Favorites = ({ route, navigation }) => {
	const dispatch = useDispatch();
	const currentBranch = useSelector(state => state.address.currentBranch)

	const { navigate } = useNavigation();
	const [category, setCategory] = useState({ id: 0 });
	const [categories, setCategories] = useState([])
	const [shops, setShops] = useState([])
	const [products, setProducts] = useState([])
	const [shopsFiltered, setShopsFiltered] = useState([])
	const [productsFiltered, setProductsFiltered] = useState([])
	const [RefreshList, setRefreshList] = useState(false)

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => {
			navigation.goBack()
			return true;
		});
	}, []);

	useEffect(() => {
		navigation.setOptions({
			headerTitle: () => (
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<Image source={icons.homeheaderlogo} style={{ width: 40, height: 40 }} />
				</View>
			),
			headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.8}
					style={{ width: 44, height: 44, justifyContent: "center", alignItems: "center" }}
					onPress={() => {
						navigation.toggleDrawer()
					}}
				>
					<Image source={icons.homedrawericon} />
				</TouchableOpacity>
			),
			headerRight: () => (
				<View style={{ width: 100, paddingEnd: 10, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ width: 44, height: 44, justifyContent: "center", alignItems: "center" }}
						onPress={() => {
							navigation.navigate('MyCart')
						}}
					>
						<Ionicons
							name='ios-cart-outline'
							color={'#000000'}
							size={35}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ width: 44, height: 44, justifyContent: "center", alignItems: "center" }}
						onPress={() => { }}
					>
						<EmirateFlag width={ 44 } />
						{ /*<Image source={icons.homeheaderflag} />*/ }
					</TouchableOpacity>
				</View>
			)
		})
	}, [])

	useEffect(() => {
		fetchFavProducts()
		fetchFavShops()
		fetchCategories()
	}, []);


	useEffect(() => {
		if (category.id > 0) {
			const tmpProducts = products.filter((product) => parseInt(product.products && product.products.department.id) === parseInt(category.id))
			const tmpShops = shops.filter((shop) => parseInt(shop.shops && shop.shops.department.id) === parseInt(category.id))
			setProductsFiltered(tmpProducts)
			setShopsFiltered(tmpShops)
		} else {
			setProductsFiltered(products)
			setShopsFiltered(shops)
		}
	}, [category]);

	const fetchFavProducts = async () => {
		const response = await APIKit.get("user/favourites/products");
		console.log(response);
		if (response.data.status === 200) {
			setProducts(response.data.data);
			const tmpProducts = response.data.data.filter((product) => product.products)
			setProductsFiltered(tmpProducts)
		}
	};

	const fetchCategories = async () => {
		const response = await APIKit.get('categories')
		if (response.data.status === 200) {
			setCategories(response.data.data)
		}
	}
	const fetchFavShops = async () => {
		const response = await APIKit.get("user/favourites/shops");
		if (response.data.status === 200) {
			setShops(response.data.data);
			const tmpProducts = response.data.data.filter((shop) => shop.shops)
			setProductsFiltered(tmpProducts)
		}
	};

	const refresh = async () => {
		setRefreshList(true)
		fetchFavProducts()
		fetchFavShops()
		fetchCategories()
		setCategory({ id: 0 })
		setRefreshList(false)

	}

	useEffect(() => {
		if (currentBranch && currentBranch.id) {
			setBranchId(currentBranch.id)
			refresh()
		}
	}, [currentBranch])

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
			return
		}
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<HomeHeader
				onFinish={branch => {
					handelBranches(branch?.id, () => {
						refresh()
					})
				}}
			/>

			<ScrollView style={styles.container}
				refreshControl={
					<RefreshControl refreshing={RefreshList} onRefresh={() => { refresh() }}
						tintColor={myColors.green3}
						colors={[myColors.green3]}
					/>
				}
			>

				<View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', marginBottom: 30 }}>
					<FlatList
						// style={{ height: 120 }}
						data={categories}
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
				{(shopsFiltered.length > 0 &&
					<React.Fragment>
						<View style={[styles.titleContainer, styles.marginTop]}>
							<Text style={styles.allProductsTitle}>
								{strings("favShops")}
							</Text>
						</View>
						<FlatList
							numColumns={1}
							data={shopsFiltered}
							renderItem={({ item }) => (
								<Shop
									image={item.shops.image}
									title={item.shops.name}
									info={item.shops.info}
									rating={item.shops.rating}
									onPress={() => {
										navigate("SingleShop", {
											shop: item.shops
										});
									}}
								/>
							)}
							keyExtractor={(item) => item.id}
							showsVerticalScrollIndicator={false}
						/>
					</React.Fragment>
				)}

				{(productsFiltered.length > 0 &&
					<React.Fragment>
						<View style={[styles.titleContainer, styles.marginTop]}>
							<Text style={styles.allProductsTitle}>
								{strings("favProducts")}
							</Text>
						</View>
						<FlatList
							numColumns={2}
							data={productsFiltered}
							renderItem={({ item }) => (
								item.products && <AllProducts
									departmentImage={item.products.image}
									title1={item.products.name}
									title2={""}
									price={item.products.price}
									description={item.products.description}
									badges={ item.products.badges}
									onPress={() => {
										navigation.navigate('SingleZabeha', {
											productId: item.products.id
										})
									}}
								/>
							)}
							keyExtractor={(item) => item.id}
							showsVerticalScrollIndicator={false}
						/>
					</React.Fragment>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export { Favorites };
