import React, { useEffect, useState } from "react";
import {
	Text,
	View,
	ScrollView,
	Image,
	ImageBackground,
	Switch,
	Dimensions,
	Alert,
	I18nManager,
	Linking,
	Platform
} from "react-native";
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PageControl from 'react-native-page-control';
import Hyperlink from 'react-native-hyperlink'


import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";
import { TajwalRegular } from '../../components';
import { useSelector } from "react-redux";
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
import Carousel from "react-native-snap-carousel";
import Spinner from 'react-native-loading-spinner-overlay';
import { SuccessModal } from "../../components/Modals/SuccessModal"
import { myColors } from "../../styles";

const SingleShop = ({ route, navigation }) => {
	const horizontalMargin = 5;
	const slideWidth = 280;
	const sliderWidth = Dimensions.get("window").width;
	const itemWidth = slideWidth + horizontalMargin * 2;


	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	const [shopId, setShopId] = useState(undefined)
	const [shopData, setShopData] = useState(undefined)
	const [showMoreInfo, setShowMoreInfo] = useState(false)
	const [isFavourite, setIsFavourite] = useState(false);

	// Selections
	const [selectedMenu, setSelectedMenu] = useState({ id: 0 })
	const [products, setProducts] = useState([])
	const userState = useSelector(state => state.session.user)
	const [spinner, setSpinner] = useState(false);
	const [addToFavModal, setAddToFavModal] = useState(false)
	const [deleteToFavModal, setDeleteToFavModal] = useState(false)
	const [loginModal, setLoginModal] = useState(false)

	const [activeBanner, setActiveBanner] = useState(0)

	useEffect(() => {
		console.log(route.params)
		if (shopData) {
			navigation.setOptions({
				headerTitle: () => (
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<TajwalRegular style={{ fontSize: 20 }}>{shopData.name}</TajwalRegular>
					</View>
				),
				headerLeft: () => (
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}
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
					<View></View>
				)
			})
		}
	}, [shopData])

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

	useEffect(() => {
		if (shopData && shopData.menus.length > 0) {
			if (selectedMenu.id === 0) {
				setSelectedMenu(shopData.menus[0])
			}
		}
	}, [shopData])

	useEffect(() => {
		if (shopData) {
			if (selectedMenu && selectedMenu.id > 0) {
				const tmpProducts = shopData.products.filter((product) => parseInt(product.menu_id) === parseInt(selectedMenu.id))
				setProducts(tmpProducts)
			} else {
				setProducts(shopData.products)
			}
			setIsFavourite(shopData && shopData.in_favourite ? shopData.in_favourite : false)

		}
	}, [selectedMenu, shopData])


	const addToFavourite = async () => {
		if (userState && userState.id) {
			setSpinner(true)
			const formData = new FormData();
			formData.append("shop_id", shopData.id)

			console.log(formData)
			try {
				const response = await APIKit.post("user/favourites/add/shop", formData);

				console.log(response)
				if (response.data.status === 200) {
					if (response.data.data) {
						setAddToFavModal(true)
					}
				}
				setSpinner(false)
			} catch (error) {
				console.log(error)
				if (error.response) {
					// Request made and server responded
					console.log(error.response);
					console.log(error.response.status);
					console.log(error.response.headers);

					Alert.alert(
						strings("Error"),
						error.response.data.msg,
						[
							{
								text: strings("Cancel"),
								onPress: () => console.log('Cancel Pressed'),
								style: 'cancel'
							},
						],
						{ cancelable: false }
					);

				} else if (error.request) {
					// The request was made but no response was received
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message);
				}
				setSpinner(false)
			}
		} else {
			setLoginModal(true)

		}
	}

	const deleteFromFavourite = async () => {
		if (userState && userState.id) {
			setSpinner(true)
			const formData = new FormData();
			formData.append("shop_id", shopData.id)

			console.log(formData)
			try {
				const response = await APIKit.post("user/favourites/delete/shop", formData);

				console.log(response)
				if (response.data.status === 200) {
					if (response.data.data) {
						setDeleteToFavModal(true)
					}
				}
				setSpinner(false)
			} catch (error) {
				console.log(error)
				if (error.response) {
					// Request made and server responded
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);

					Alert.alert(
						strings("Error"),
						error.response.data.msg,
						[
							{
								text: strings("Cancel"),
								onPress: () => console.log('Cancel Pressed'),
								style: 'cancel'
							},
						],
						{ cancelable: false }
					);

				} else if (error.request) {
					// The request was made but no response was received
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message);
				}
				setSpinner(false)
			}
		} else {
			setLoginModal(false)
		}
	}

	return (
		<ScrollView style={styles.container}>
			{
				(shopData &&
					<React.Fragment>
						<View>
							<Image
								source={{ uri: shopData.image }} //icons.zabehaheaderimg}
								style={styles.zabehaheaderimg}
								resizeMode={"cover"}
							/>
						</View>

						<View style={styles.allContent}>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
								{
									(shopData.badge &&
										<View style={styles.moresellTexts}>
											<Text style={styles.bestsell}>{shopData&&shopData.badge&&shopData.badge.name}</Text>
										</View>
									)
								}
								<TouchableOpacity style={[styles.favouriteContainer, { backgroundColor: isFavourite ? 'red' : 'white' }]}
									onPress={() => (isFavourite ? deleteFromFavourite() : addToFavourite(), setIsFavourite(!isFavourite))}>
									<Icon name={'heart'} size={20} color={isFavourite ? "white" : 'red'} style={styles.favouriteIcon} />
								</TouchableOpacity>
							</View>
							<View style={{ marginTop: 35 }}>
								<Text style={[styles.nagdyText, Platform.OS == 'ios' ? { lineHeight: 30 } : {}]}>{shopData.name}</Text>
								<Text style={styles.descText}>{shopData.description}</Text>
							</View>
							{shopData.info.length > 0 && <Text style={styles.size}>{strings("Shop Information")}</Text>}
							{
								shopData.info.map((infoObj, index) => {
									return (
										<React.Fragment key={index}>
											{index < 2 &&
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
														<Hyperlink linkStyle={{ color: '#2980b9' }} linkDefault={ true }>
															<Text style={styles.infoValue} numberOfLines={ 1 }>{infoObj.value}</Text>
														</Hyperlink>
													</View>
												</View>}
											<View style={styles.hr}></View>
										</React.Fragment>
									)
								})
							}
							
						{/* {shopData.info.length > 0 &&
							<>	
							<TouchableOpacity 
								style={styles.infoContainer} 
								activeOpacity={0.5} 
								onPress={()=>{
									navigation.navigate('ShopRating',{shop:route.params.shop})
								}}
							>
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
								</TouchableOpacity>
								<View style={styles.hr}></View>
							</>
						} */}
							
							{shopData.info.length > 2 && <TouchableOpacity onPress={() => (navigation.navigate('MoreDetails', { shopData }))}>
								<Text style={[styles.infoKey, { alignSelf: 'center', marginTop: h(20) }]}>{strings(showMoreInfo ? "less" : "More")}</Text>
							</TouchableOpacity>}
							{
								(shopData.banners &&
									<View style={styles.pointsContainer}>
										<Carousel
											data={shopData.banners}
											sliderWidth={sliderWidth}
											itemWidth={itemWidth}
											enableSnap={true}
											autoplay={true}
											enableMomentum={false}
											lockScrollWhileSnapping={true}
											loop={true}
											renderItem={(item, index) => {
												console.log("item in slider::>>", item.item.image);
												return (
													<TouchableOpacity activeOpacity={0.9} style={styles.sliderImgContainer}>
														<Image source={{ uri: item.item.image }} style={styles.sliderImg} />
													</TouchableOpacity>
												)
											}}
											onSnapToItem={(index) => setActiveBanner(index) }
										/>
										<PageControl
											style={{ alignSelf: 'center' }}
											numberOfPages={shopData.banners.length}
											currentPage={ activeBanner }
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

							<Text style={styles.menuTitle}>{strings("Menu")}</Text>
							<View style={styles.menuContainer}>
								<FlatList
									contentContainerStyle={{ justifyContent: 'flex-start', paddingStart: 20 }}
									data={ shopData.menus }
									horizontal
									renderItem={({ item }) => (
										<React.Fragment key={item.id}>
											<TouchableOpacity style={[styles.menuItem, (selectedMenu && selectedMenu.id === item.id) ? styles.selectedMenu : {}]} activeOpacity={0.8} onPress={() => setSelectedMenu(item)}>
												<Text style={(selectedMenu && selectedMenu.id === item.id) ? styles.selectedMenuText : styles.notSelectedMenu}>{item.name}</Text>
											</TouchableOpacity>
										</React.Fragment>
									)}
									keyExtractor={(item) => item.id}
									showsHorizontalScrollIndicator={false}
								/>
							</View>
							<View style={{ alignItems: 'flex-start' }}>
								<FlatList
									data={products}
									scrollEnabled={ false }
									renderItem={({ item }) => (
										<View key={item.id} style={styles.fullWidthContainer}>
											<TouchableOpacity style={styles.shopProduct} activeOpacity={0.8} onPress={() => {
												navigation.navigate('SingleZabeha', {
													productId: item.id, shopID: shopData.id,
													productName: item.name,
													shop: shopData
												})
											}}>
												<View style={styles.shopProductContainer}>
													<View style={styles.shopProductImageContainer}>
														<Image source={{ uri: item.image }} style={styles.shopProductImg} />
													</View>
													<View style={styles.shopProductDetailsContainer}>
														<Text style={styles.productName}>{item.name}</Text>
														{item.description && <Text style={styles.productDescription} numberOfLines={ 2 }>{item.description}</Text>}
														{item.price && <Text style={styles.productPrice}>{item.price} {strings("AED")}</Text>}
													</View>
												</View>
											</TouchableOpacity>
										</View>
									)}
									keyExtractor={(item) => item.id}
									showsVerticalScrollIndicator={false}
								/>
							</View>
						</View>
					</React.Fragment>
				)
			}
			<Spinner
				visible={spinner}
			/>
			<SuccessModal
				isVisible={loginModal}
				title={strings("Please login first")}
				leftTitle={strings("close")}
				rightTitle={strings("Login")}
				onClose={() => { setLoginModal(false) }}
				rightAction={() => {
					navigation.navigate('MyAuth', {
						screen: 'Login',
						params: {
							onFinishLogin: () => {
								navigation.goBack()
							},
							onFinishRegist: () => {
								navigation.goBack()
							},
							onFinishSkip: () => {
								navigation.goBack()
							}
						}

					}),
						setLoginModal(false)
				}}
				leftAction={() => { setLoginModal(false) }}
			/>
			<SuccessModal
				isVisible={addToFavModal}
				title={strings("Added to your Favourite successfully")}
				rightTitle={strings("Done")}
				onClose={() => { setAddToFavModal(false) }}
				rightAction={() => { setAddToFavModal(false) }}
			/>
			<SuccessModal
				isVisible={deleteToFavModal}
				title={strings("Deleted from your Favourite successfully")}
				rightTitle={strings("Done")}
				onClose={() => { setDeleteToFavModal(false) }}
				rightAction={() => { setDeleteToFavModal(false) }}
			/>
		</ScrollView>
	);
};

export { SingleShop };
