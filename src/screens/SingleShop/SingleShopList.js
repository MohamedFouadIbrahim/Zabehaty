import React, { useEffect, useState, useRef } from "react";
import {
	Text,
	View,
	ScrollView,
	Image,
	ImageBackground,
	Dimensions,
	Switch,
	Linking
} from "react-native";

import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from "../../components/Header"
import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";
// CONSTAMTS

// Helpers
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { FlatList } from "react-native-gesture-handler";
import { WeightAge } from "../../components/WeightAge";
import { CuttingWay } from "../../components/CuttingWay";
import { Without } from "../../components/Without";
import CuttingWayData from "../../Data/CuttingWayData";
import { PackagingProduct } from "../../components";

// Helpers
import APIKit from "../../utils/APIKit";
import { TouchableOpacity } from "react-native";
import { h } from "../../mutils";
// let scroller = null;
const SingleShop = ({ route, navigation }) => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	const [shopId, setShopId] = useState(undefined)
	const [shopData, setShopData] = useState(undefined)
	const [showMoreInfo, setShowMoreInfo] = useState(false)
	const [scrollYPos, setScrollYPos] = useState(0)

	// Selections
	const [selectedMenu, setSelectedMenu] = useState({ id: 0 })
	const [products, setProducts] = useState([])
	const [menuData, setMenuData] = useState([]);
	const ScrollRef = useRef(null);

	useEffect(() => {
		if (route.params.shop) {
			setShopId(route.params.shop.id)
		}
	}, [route])

	useEffect(() => {
		if (shopId) {
			fetchShop()
		}
	}, [shopId])

	/*useEffect(() => {
		if (productData) {
			if (selectedQty < productData.quantity_settings.min ) {
				setSelectedQty(productData.quantity_settings.min)
			}
		}
	}, [selectedQty, productData])*/

	const fetchShop = async () => {
		const response = await APIKit.get(`shop/${shopId}`);
		console.log(response)
		if (response.data.status === 200) {
			setShopData(response.data.data);
			console.log("shop data ::>>", response.data.data);
		}
	}

	const scrollTo = (i) => {
		console.log("scroll to ::>>", i);
		// setScrollYPos(Dimensions.get('window').height * i+1.75);
		console.log(ScrollRef);
		i==0?ScrollRef.current.scrollTo({ ScrollRef, x: 0, y: Dimensions.get('window').height *0.765, animated: true, })
		:ScrollRef.current.scrollTo({ ScrollRef, x: 0, y: Dimensions.get('window').height *(i + 0.834), animated: true, });
	};

	const menuList = () => {
		return (
			<View style={styles.menuContainer}>
				<FlatList
					data={[
						{ id: 0, name: strings("All Products") },
						...shopData.menus
					]}
					horizontal
					renderItem={({ item, index }) => (
						<React.Fragment key={item.id}>
							<TouchableOpacity style={styles.menuItem} activeOpacity={0.8} onPress={() => (setSelectedMenu(item), scrollTo(index))}>
								<Text style={(selectedMenu && selectedMenu.id === item.id) ? styles.selectedMenu : styles.notSelectedMenu}>{item.name}</Text>
							</TouchableOpacity>
						</React.Fragment>
					)}
					keyExtractor={(item) => item.id}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
		)
	}

	const renderMenuData = () => {
		menuData.map((item, index) => {
			console.log("i::>>", index);
			return (
				<View style={[styles.screen, { backgroundColor: index == 1 ? 'red' : index == 2 ? 'blue' : 'green' }]}>
					<FlatList
						data={menuData[index].data}
						renderItem={({ item }) => (
							<View key={item.id} style={styles.fullWidthContainer}>
								<TouchableOpacity style={styles.shopProduct} activeOpacity={0.8} onPress={() => {
									navigation.navigate('SingleZabeha', {
										productId: item.id, shopID: shopData.id
									})
								}}>
									<View style={styles.shopProductContainer}>
										<View style={styles.shopProductImageContainer}>
											<Image source={{ uri: item.image }} style={styles.shopProductImg} />
										</View>
										<View style={styles.shopProductDetailsContainer}>
											<Text style={styles.productName}>{item.name}</Text>
											<Text style={styles.productDescription}>{item.description}</Text>
											<Text style={styles.productPrice}>{item.price} {strings("AED")}</Text>
										</View>
									</View>
								</TouchableOpacity>
							</View>
						)}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			)
		})


	}

	useEffect(() => {
		console.log("HERE")
		if (shopData) {
			getMenuData()
			// if (selectedMenu && selectedMenu.id > 0) {
			// 	const tmpProducts = shopData.products.filter((product) => parseInt(product.menu_id) === parseInt(selectedMenu.id))
			// 	console.log(tmpProducts)
			// 	setProducts(tmpProducts)
			// } else {
			// 	console.log(shopData.products)
			// 	setProducts(shopData.products)
			// }
		}
	}, [shopData])

	const getMenuData = () => {
		let MenuData = [];
		let tmpProducts = [];
		for (let i = 0; i < shopData.menus.length + 1; i++) {
			if (i > 0) {
				tmpProducts = shopData.products.filter((product) => parseInt(product.menu_id) === parseInt(i))
				console.log(tmpProducts)
				MenuData.push({ data: tmpProducts, id: i })
			} else {
				console.log(shopData.products)
				MenuData.push({ data: shopData.products, id: i })
			}
		}
		setMenuData(MenuData)
	}
	return (
		<ScrollView style={styles.container, { flex: 1 }} ref={ScrollRef} >
			{
				(shopData &&
					<React.Fragment>
						<Header title={shopData.name} goBack={() => navigation.goBack()} />
						<View>
							<Image
								source={{ uri: shopData.image }} //icons.zabehaheaderimg}
								style={styles.zabehaheaderimg}
								resizeMode={"cover"}
							/>
							{
								(shopData.badge &&
									<View style={styles.moresellTexts}>
										<Text style={styles.bestsell}>{shopData.badge.name}</Text>
									</View>
								)
							}
							<Image source={icons.favouriteimg} style={styles.favouriteimg} />
						</View>

						<View style={styles.allContent}>
							<View style={{ marginTop: 35 }}>
								<Text style={styles.nagdyText}>{shopData.name}</Text>
								<Text style={styles.descText}>{shopData.description}</Text>
							</View>
							<Text style={styles.size}>{strings("Shop Information")}</Text>
							{
								shopData.info.map((infoObj, index) => {
									return (
										<React.Fragment key={index}>
											{(index <= showMoreInfo ? 100 : 0) ?
												<View style={styles.infoContainer}>
													<View style={styles.keyContainer}>
														{
															(infoObj.icon &&
																<View style={{ marginEnd: 10 }}>
																	<Icon name={infoObj.icon} size={16} color="#434343" />
																</View>
															)
														}
														<Text style={styles.infoKey}>{infoObj.key}</Text>
													</View>
													<View style={styles.valueContainer}>
														<Text style={styles.infoValue}>{infoObj.value}</Text>
													</View>
												</View> : null}
											<View style={styles.hr}></View>
										</React.Fragment>
									)
								})
							}
							<View style={styles.infoContainer}>
								<View style={styles.keyContainer}>
									<Text style={styles.infoKey}>{strings("Rating")}</Text>
								</View>
								<View style={styles.valueContainer}>
									<AirbnbRating
										count={5}
										defaultRating={(shopData.rating) ? shopData.rating : 0}
										size={15}
										selectedColor='#215904'
										showRating={false}
										isDisabled={true}
									/>
								</View>
							</View>
							<View style={styles.hr}></View>
							<TouchableOpacity onPress={() => setShowMoreInfo(!showMoreInfo)}>
								<Text style={[styles.infoKey, { alignSelf: 'center', marginTop: h(20) }]}>{strings(showMoreInfo ? "less" : "More")}</Text>
							</TouchableOpacity>
							<Text style={styles.menuTitle}>{strings("Menu")}</Text>
							{menuList()}
							{/* <View style={styles.menuContainer}>
								<FlatList
									data={[
										{ id: 0, name: strings("All Products") },
										...shopData.menus
									]}
									horizontal
									renderItem={({ item, index }) => (
										<React.Fragment key={item.id}>
											<TouchableOpacity style={styles.menuItem} activeOpacity={0.8} onPress={() =>
												(setSelectedMenu(item), index !== 0 && scrollTo(index))}>
												<Text style={(selectedMenu && selectedMenu.id === item.id) ? styles.selectedMenu : styles.notSelectedMenu}>{item.name}</Text>
											</TouchableOpacity>
										</React.Fragment>
									)}
									keyExtractor={(item) => item.id}
									showsHorizontalScrollIndicator={false}
								/>
							</View> */}
							{/* <View style={{ alignItems: 'flex-start' }}>
								<FlatList
									data={products}
									renderItem={({ item }) => (
										<View key={item.id} style={styles.fullWidthContainer}>
											<TouchableOpacity style={styles.shopProduct} activeOpacity={0.8} onPress={() => {
												navigation.navigate('SingleZabeha', {
													productId: item.id, shopID: shopData.id
												})
											}}>
												<View style={styles.shopProductContainer}>
													<View style={styles.shopProductImageContainer}>
														<Image source={{ uri: item.image }} style={styles.shopProductImg} />
													</View>
													<View style={styles.shopProductDetailsContainer}>
														<Text style={styles.productName}>{item.name}</Text>
														<Text style={styles.productDescription}>{item.description}</Text>
														<Text style={styles.productPrice}>{item.price} {strings("AED")}</Text>
													</View>
												</View>
											</TouchableOpacity>
										</View>
									)}
									keyExtractor={(item) => item.id}
									showsVerticalScrollIndicator={false}
								/>
							</View> */}

							{menuData.map((item, index) => {
								console.log("iiic::>>", index);
								return (
									<View style={[styles.screen, { }]}>
										{index!==0&&menuList()}
										<FlatList
											data={menuData[index].data}
											renderItem={({ item }) => (
												<View key={item.id} style={styles.fullWidthContainer}>
													<TouchableOpacity style={styles.shopProduct} activeOpacity={0.8} onPress={() => {
														navigation.navigate('SingleZabeha', {
															productId: item.id, shopID: shopData.id
														})
													}}>
														<View style={styles.shopProductContainer}>
															<View style={styles.shopProductImageContainer}>
																<Image source={{ uri: item.image }} style={styles.shopProductImg} />
															</View>
															<View style={styles.shopProductDetailsContainer}>
																<Text style={styles.productName}>{item.name}</Text>
																<Text style={styles.productDescription}>{item.description}</Text>
																<Text style={styles.productPrice}>{item.price} {strings("AED")}</Text>
															</View>
														</View>
													</TouchableOpacity>
												</View>
											)}
											keyExtractor={(item) => item.id}
											showsVerticalScrollIndicator={false}
										/>
									</View>)
							})}

						</View>
					</React.Fragment>
				)
			}
		</ScrollView>
	);
};

export { SingleShop };
