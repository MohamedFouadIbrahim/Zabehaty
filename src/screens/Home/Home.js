import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	BackHandler,
	TouchableOpacity,
	Image,
	Dimensions,
	Alert,
	ImageBackground,
	Linking,
	I18nManager
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-snap-carousel";
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import PageControl from 'react-native-page-control';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from 'react-native-device-info';

import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";

// CONSTAMTS
import { CHANGE_BRANCH, CHANGE_EMIRATE, CHANGE_FULLADDRESS, CHANGE_REGION, UPDATE_CART_NOTIFY_MESSAGE, OPEN_NOTIFICATION_PAGE, NOTIFICATION_DATA } from "../../Redux/actionTypes";

// SVGs
import EmirateFlag from '../../assets/SVGs/EmirateFlag'

// Helpers
import APIKit, { setBranchId } from "../../utils/APIKit";
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


import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getBranch } from "../../services/Places";
import Snackbar from 'react-native-snackbar';
import { SuccessModal } from "../../components/Modals/SuccessModal"
import { myColors } from "../../styles";
import { getCart } from '../../services/Cart';
import { ZabayhOffer } from "../../components/ZabayhOffer";
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys";
import { RatingModal, Shop } from "../../components";
import { getOrders } from '../../services/Orders';
import { rateOrder } from '../../services/Orders';
import { showToast } from '../../utils/Toast';
import { ReOrderRateCard } from "../../components/ReOrderRateCard"


const Home = ({ route, navigation }) => {
	const horizontalMargin = 20;
	const slideWidth = 280;
	const sliderWidth = Dimensions.get("window").width;
	const itemWidth = slideWidth + horizontalMargin * 2;

	const userData = useSelector(state => state.session.user)
	const showCartMsgState = useSelector(state => state.session.showCartMessageNotify)
	const currentBranch = useSelector(state => state.address.currentBranch)

	const notificationState = useSelector(state => state.session.openNotificationsPage)
	const pushNotificationData = useSelector(state => state.session.pushNotificationData)

	const { navigate } = useNavigation();
	const dispatch = useDispatch();

	const isFocused = useIsFocused();

	const [offersNumberOfColumn, setOffersNumberOfColumn] = useState(0)
	const [sliderImgs, setSliderImgs] = useState([])
	const [bannerImgs, setBannerImgs] = useState([])
	const [categories, setCategories] = useState([])
	const [topProducts, setTopProducts] = useState([])
	const [offers, setOffers] = useState([])

	const [homeSectionsTop, setHomeSectionsTop] = useState([])
	const [homeSections, setHomeSections] = useState([])
	const [modal, setModal] = useState(true)
	const [loginModal, setLoginModal] = useState(false)
	const [productsInCart, setProductsInCart] = useState(0)
	const [notifactionCount, setNotifactionCount] = useState(0)

	const [activeSlide, setActiveSlide] = useState(0)

	const [backPressed, setBackPressed] = useState(1)

	const [showCartMsg, setShowCartMsg] = useState("")
	const [showCategoryModal, setShowCategoryModal] = useState(false)

	const [rateOrderId, setRateOrderId] = useState(undefined)
	const [isRateVisible, setSsRateVisible] = useState(false)
	const [orders, setOrders] = useState([])

	const [flatListCurrentPage, setFlatListCurrentPage] = useState({})

	const backPressedCount = () => backPressed;

	const increaseBackPressed = () => {
		setBackPressed(perv => perv + 1)
	}


	// useEffect(() => {
	// 	showInnerNotifaction() //.then(()=>{ onSuccess && onSuccess() })
	// }, [])
	useEffect(() => {
		if (isFocused) {
			_getOrders()
		}
	}, [isFocused])

	const _getOrders = () => {
		getOrders(({ data }) => {
			console.log("orders in home::>>", data)
			setOrders(data)
		}, err => {
			console.log("error::>", err);
		})

	}
	useEffect(() => {
		if (showCartMsgState) {
			checkCartItems()
			dispatch({ type: UPDATE_CART_NOTIFY_MESSAGE, status: false })
		}
	}, [showCartMsgState])

	useEffect(() => {
		checkNotificationStatus()
		checkRateOrder()
	}, [])

	const checkRateOrder = async () => {
		const rateOrderData = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.RateOrderId)
		if (rateOrderData) {
			console.log(rateOrderData)
			// Show Rate order popup
			setRateOrderId(parseInt(rateOrderData))
			setSsRateVisible(true)

			try {
				await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.RateOrderId);
			} catch (e) {
				// saving error
				console.log(e);
			}
		}
	}

	useEffect(() => {
		if (notificationState) {
			handlePushNotification(pushNotificationData)

			//checkNotificationStatus()
			dispatch({ type: OPEN_NOTIFICATION_PAGE, status: false })
			dispatch({ type: NOTIFICATION_DATA, data: undefined })
		}
	}, [notificationState, pushNotificationData])

	const checkNotificationStatus = async () => {
		const notificationData = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.OpenedPushNotification)
		if (notificationData && notificationData === "Open") {
			const pushNotificationDataString = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.PushNotificationData)
			if (pushNotificationDataString) {
				const pushNotificationData = JSON.parse(pushNotificationDataString)
				handlePushNotification(pushNotificationData)
			}

			try {
				await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.OpenedPushNotification);
				await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.PushNotificationData);
			} catch (e) {
				// saving error
				console.log(e);
			}
		}
	}

	const handlePushNotification = (pushNotificationData) => {
		if (pushNotificationData) {
			if (pushNotificationData.link) {
				navigation.navigate('PushNotifactionWebView', {
					link: pushNotificationData.link
				})
			} else if (pushNotificationData.page) {
				if (pushNotificationData.page === "cart") {
					navigation.navigate('Cart')
				} else if (pushNotificationData.page === "categories") {
					const params = JSON.parse(pushNotificationData.params)
					if (params && params.id) {
						navigate("Zabayh", { category: { id: parseInt(params.id) }, mainCategories: categories })
					}
				} else if (pushNotificationData.page === "product") {
					const params = JSON.parse(pushNotificationData.params)
					if (params && params.id) {
						navigation.navigate('SingleZabeha', {
							productId: parseInt(params.id)
						})
					}
				} else if (pushNotificationData.page === "orders" || pushNotificationData.page === "order") {
					navigation.navigate('MyOrders')
				}
			} else {
				navigation.navigate('MyNotifactions')
			}
		}
	}

	const checkCartItems = () => {
		getCart((res) => {
			let totalProdctsInCart = 0
			let listOfDepartments = []
			console.log("response of cart in home::>>", res.data);
			res.data && res.data.map((item) => {
				let detailsLength = item?.department ? item.details.length : 0
				totalProdctsInCart = totalProdctsInCart + detailsLength;

				if (item.department) {
					if (!listOfDepartments.includes(item.department.name)) {
						listOfDepartments.push(item.department.name)
					}
				}
			})
			console.log(totalProdctsInCart);
			if (totalProdctsInCart > 0) {
				let message = strings("You still have products in the shopping cart in this departments: ");
				message += listOfDepartments.join(' - ')

				setShowCartMsg(message)
			}
		})
	}

	useFocusEffect(
		React.useCallback(() => {
			const onBackPress = () => {
				if (backPressedCount() < 2) {
					increaseBackPressed();
					Snackbar.show({
						text: strings('Press back again to exit the app'),
						duration: Snackbar.LENGTH_SHORT,
						action: {
							text: strings('close'),
							textColor: 'white',
							onPress: () => { /* Do something. */ },
						},
					});
					return true;
				} else {
					BackHandler.exitApp()
					return false;
				}
			};

			BackHandler.addEventListener('hardwareBackPress', onBackPress);

			return () =>
				BackHandler.removeEventListener('hardwareBackPress', onBackPress);

		}, [backPressedCount, increaseBackPressed])
	);

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

		setBackPressed(1)
	}, [isFocused, sliderImgs]);
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
						style={{ width: 25, height: 44, justifyContent: "center", alignItems: "center" }}
						onPress={() => {
							if (userData && userData.first_name) {
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
							<Text style={{ alignSelf: 'center', color: 'white', fontSize: 11 }}>{notifactionCount}</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.8}
						style={{ width: 55, height: 44, justifyContent: "center", alignItems: "center" }}
						onPress={() => {
							if (userData && userData.first_name) {
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
							width: 15, height: 15, alignContent: 'center', top: 8, right: 10
						}}>
							<Text style={{ alignSelf: 'center', color: 'white', fontSize: 11 }}>{productsInCart}</Text>
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

	const fetchData = () => {
		fetchSlider()
		fetchBanners()
		fetchCategories()
		//fetchTopProducts()
		//fetchOffers()
		fetchHomeSections()
	}

	useEffect(() => {
		if (!currentBranch?.id) {
			navigation.push('PlacesSelectore', {
				forced: true,
				onSelectPlace: (emirate, region, branch) => {
					console.log("HERE")
					dispatch({ type: CHANGE_EMIRATE, data: emirate })
					dispatch({ type: CHANGE_REGION, data: region })
					dispatch({ type: CHANGE_BRANCH, data: branch })
					handelBranches(branch, () => {
						console.log("HERE 2")
						fetchData()
					})
				}
			})
		} else {
			handelBranches(currentBranch)
		}
	}, [])

	useEffect(() => {
		if (currentBranch && currentBranch.id) {
			setBranchId(currentBranch.id)
			fetchData()
		}
	}, [currentBranch])

	useEffect(() => {
		if (offers.length > 0) {
			setOffersNumberOfColumn(Math.ceil((offers.length / 2)))
		}
	}, [offers])

	const fetchSlider = async () => {
		const response = await APIKit.get('slider/home')
		console.log("Slider Home")
		console.log(response)
		if (response.data.status === 200) {
			setSliderImgs(response.data.data)
		}
	}

	const fetchBanners = async () => {
		const response = await APIKit.get('banners/home')
		console.log("Banner Home")
		console.log(response)
		if (response.data.status === 200) {
			setBannerImgs(response.data.data)
		}
	}

	const fetchCategories = async () => {
		const response = await APIKit.get('categories')
		console.log("categories")
		console.log(response)
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

	const fetchHomeSections = async () => {
		const response = await APIKit.get('home/sections')
		console.log("Home Section ", response.data)
		if (response.data.status === 200) {
			let bottomList = []
			let topList = []
			response.data.data.forEach(section => {
				if (section.location === "bottom") {
					bottomList.push(section)
				} else {
					topList.push(section)
				}
			})
			setHomeSections(bottomList)
			setHomeSectionsTop(topList)
		}
	}

	const onFlatListScrollEnd = (e, section) => {
		console.log(e)
		const contentOffset = e.nativeEvent.contentOffset;
		const viewSize = e.nativeEvent.layoutMeasurement;

		// Divide the horizontal offset by the width of the view to see which page is visible
		let pageNumber = Math.floor(contentOffset.x / viewSize.width);
		if (section.type === "shop") {
			const brand = DeviceInfo.getBrand();
			if (brand !== "Apple") {
				const numberOfItems = section.shops.length
				if (I18nManager.isRTL) {
					pageNumber = (numberOfItems - 1) - pageNumber
				}
			}
		}

		setFlatListCurrentPage(prevState => {
			return {
				...prevState,
				[section.id]: pageNumber
			}
		})
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<HomeHeader
				onFinish={branch => {
					handelBranches(branch, () => {
						fetchData()
					})
				}}
			/>
			{/* <SuccessModal
				isVisible={modal}
				title={"Title"}
				description={"Description"}
				leftTitle={'left'}
				rightTitle={'right'}
				onClose={() => { setModal(false) }}
				rightAction={() => { }}
				leftAction={() => { }}
			/> */}
			<FlatList
				ListHeaderComponent={
					<React.Fragment>
						{
							(sliderImgs.length > 0 &&
								<View style={styles.pointsContainer}>
									<Carousel
										data={sliderImgs}
										sliderWidth={sliderWidth}
										itemWidth={itemWidth}
										enableSnap={true}
										autoplay={true}
										enableMomentum
										activeSlideOffset={0}
										lockScrollWhileSnapping={true}
										loop={true}
										renderItem={({ item }) => (
											<ZabayhOffer
												offerImage={item.image}
												title1={item.title}
												title2={item.sub_title}
												badge={item.badge}
												badgeBackgroundColor={item.badge_color}
											/>
										)}
										onSnapToItem={(index) => setActiveSlide(index)}
									/>
									<PageControl
										style={{}}
										numberOfPages={sliderImgs.length}
										currentPage={activeSlide}
										hidesForSinglePage
										pageIndicatorTintColor='#E6E6E6'
										currentPageIndicatorTintColor={myColors.green}
										indicatorStyle={{ borderRadius: 2 }}
										//currentIndicatorStyle={{borderRadius: 5}}
										//currentIndicatorStyle={{width: 15}}
										indicatorSize={{ width: 10, height: 4 }}
									//onPageIndicatorPress={this.onItemTap}
									/>
								</View>
							)
						}

						{/* <View style={styles.advantagesContainer}>
							<Text style={styles.advantagesText}>
								{strings("Become Distingushed Customer")}
							</Text>
							<Image source={icons.advantagesimg} style={styles.advantagesImg} />
						</View> */}
						{
							/*(topProducts.length > 0 &&
								<React.Fragment>
									<View style={styles.titleContainer}>
										<Text style={styles.importantText}>
											{strings("Important Products")}
										</Text>
									</View>
									<View style={{ alignItems: 'flex-start' }}>
										<FlatList
											style={{ height: 270 }}
											data={topProducts}
											bounces={false}
											renderItem={({ item }) => (
												<ImportantProducts
													price={item.price}
													desc={item.name}
													productImage={item.image}
													onPress={() => {
														navigation.navigate('SingleZabeha', {
															productId: item.id,
															productName: item.name
														})
													}}
												/>
											)}
											keyExtractor={(item, index) => index + ""}
											horizontal
											showsHorizontalScrollIndicator={false}
										/>
									</View>
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
											showsVerticalScrollIndicator={false}
											showsHorizontalScrollIndicator={false}
											data={offers}
											bounces={false}
											renderItem={({ item }) => (
												<TodayOffers
													price={item.price}
													desc={item.name}
													productImage={item.image}
													onPress={() => {
														navigation.navigate('SingleZabeha', {
															productId: item.id,
															productName: item.name
														})
													}}
												/>
											)}
											keyExtractor={(item, index) => index + ""}
										/>
									</View>
								</React.Fragment>
							)*/
						}
						{
							(homeSectionsTop.map((section, index) => {
								return (
									<React.Fragment key={index}>
										<View style={styles.titleContainer}>
											<Text style={styles.importantText}>
												{section.name}
											</Text>
										</View>
										<View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
											<FlatList
												data={section?.type == "shop" ? section?.shops : section.products}
												bounces={true} //section?.type == "shop" ? true : false}
												renderItem={({ item }) => {

													if (section?.type == "shop") {
														return (
															<Shop
																image={item.image}
																title={item.name}
																desc={item.description}
																info={item.info}
																rating={item.rating}
																onPress={() => {
																	navigation.navigate("SingleShop", {
																		shop: item
																	});
																}}
															/>
														)
													}

													return (
														<ImportantProducts
															oldPrice={item.old_price}
															price={item.price}
															title={item.name}
															desc={(item.department) ? item.department.name : ""}
															shop={(item.shop) ? item.shop.name : ""}
															productImage={item.image}
															badges={item.badges}
															onPress={() => {
																navigation.navigate('SingleZabeha', {
																	productId: item.id,
																	productName: item.name,
																	shop: (item.shop) ? item.shop : undefined
																})
															}}
														/>
													)
												}}
												keyExtractor={(item, index) => index + ""}
												horizontal={true}
												pagingEnabled={(section?.type === "shop") ? true : false}
												showsHorizontalScrollIndicator={false}
												onMomentumScrollEnd={(e) => onFlatListScrollEnd(e, section)}
											/>
										</View>
										{
											(section?.type === "shop" &&
												<View style={{ alignItems: 'center', marginBottom: 10 }}>
													<PageControl
														style={{}}
														numberOfPages={sliderImgs.length}
														currentPage={(flatListCurrentPage[section.id]) ? flatListCurrentPage[section.id] : 0}
														hidesForSinglePage
														pageIndicatorTintColor='#E6E6E6'
														currentPageIndicatorTintColor={myColors.green}
														indicatorStyle={{ borderRadius: 2 }}
														indicatorSize={{ width: 10, height: 4 }}
													/>
												</View>
											)
										}
									</React.Fragment>
								)
							}))
						}
						{
							(bannerImgs.length > 0 &&
								<TouchableOpacity style={styles.advertismentImgContainer}
									onPress={() => bannerImgs[0].link && Linking.openURL(bannerImgs[0].link)}
								>
									<Image source={{ uri: bannerImgs[0].image }} style={styles.advertismentImg} />
								</TouchableOpacity>
							)
						}
						<View style={styles.titleContainer}>
							<Text style={styles.importantText}>
								{strings('your previous requests')}
							</Text>
						</View>
						<View style={{ alignItems: 'flex-start', marginBottom: 10, flexDirection: 'row' }}>
							<FlatList
								data={orders}
								bounces={true} //section?.type == "shop" ? true : false}
								renderItem={({ item, index }) => {
									if (index == 11 && orders.length > 10) {
										return (
											<TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => { navigation.navigate('MyOrders') }}>
												<Text style={[styles.importantText, { color: myColors.green3, fontSize: 14 }]}>
													{strings('ShowMore')}
												</Text>
											</TouchableOpacity>
										)
									}
									else {
										return index < 10 && <ReOrderRateCard {...item} navigation={navigation}
											paymentMethod={item.payment_method == 1 ? strings("CashonDelivery") : strings("OnlinePayment")}
										/>
									}

								}}
								keyExtractor={(item, index) => index + ""}
								horizontal={true}
								pagingEnabled={false}
								showsHorizontalScrollIndicator={false}
							/>

						</View>

						<View style={styles.titleContainer}>
							<Text style={styles.departmentText}>
								{strings("Shop by departments")}
							</Text>
						</View>
					</React.Fragment>
				}
				numColumns={2}
				data={categories}
				columnWrapperStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}
				renderItem={({ item }) => (
					<DepartmentShopping
						departmentImage={item.image}
						title={item.name}
						onPress={() => {
							if (parseInt(item.is_available) === 1) {
								navigate("Zabayh", { category: item, mainCategories: categories })
							} else {
								setShowCategoryModal(true)
							}
						}}
					/>
				)}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={
					<React.Fragment>
						{
							(bannerImgs.length > 1 &&
								<TouchableOpacity style={styles.advertismentImgContainer}
									onPress={() => bannerImgs[1].link && Linking.openURL(bannerImgs[1].link)}
								>
									<Image source={{ uri: bannerImgs[1].image }} style={styles.advertismentImg} />
								</TouchableOpacity>
							)
						}
						{
							(homeSections.map((section, index) => {
								return (
									<React.Fragment key={index}>
										<View style={styles.titleContainer}>
											<Text style={styles.importantText}>
												{section.name}
											</Text>
										</View>
										<View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
											<FlatList
												data={section?.type == "shop" ? section?.shops : section.products}
												bounces={true}
												renderItem={({ item }) => {
													if (section?.type == "shop") {
														return (
															<Shop
																image={item.image}
																title={item.name}
																desc={item.description}
																info={item.info}
																rating={item.rating}
																onPress={() => {
																	navigation.navigate("SingleShop", {
																		shop: item
																	});
																}}
															/>
														)
													}
													return (
														<ImportantProducts
															oldPrice={item.old_price}
															price={item.price}
															title={item.name}
															desc={(item.department) ? item.department.name : ""}
															shop={(item.shop) ? item.shop.name : ""}
															productImage={item.image}
															badges={item.badges}
															onPress={() => {
																navigation.navigate('SingleZabeha', {
																	productId: item.id,
																	productName: item.name,
																	shop: (item.shop) ? item.shop : undefined
																})
															}}
														/>
													)
												}}
												keyExtractor={(item, index) => index + ""}
												horizontal={true}
												pagingEnabled={(section?.type === "shop") ? true : false}
												onMomentumScrollEnd={(e) => onFlatListScrollEnd(e, section)}
												showsHorizontalScrollIndicator={false}
											/>
										</View>
										{
											(section?.type === "shop" &&
												<View style={{ alignItems: 'center', marginBottom: 10 }}>
													<PageControl
														style={{}}
														numberOfPages={sliderImgs.length}
														currentPage={(flatListCurrentPage[section.id]) ? flatListCurrentPage[section.id] : 0}
														hidesForSinglePage
														pageIndicatorTintColor='#E6E6E6'
														currentPageIndicatorTintColor={myColors.green}
														indicatorStyle={{ borderRadius: 2 }}
														indicatorSize={{ width: 10, height: 4 }}
													/>
												</View>
											)
										}
									</React.Fragment>
								)
							}))
						}

						<View style={{ height: 10 }}></View>
					</React.Fragment>

				}
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

			{
				(showCartMsg !== "" &&
					<SuccessModal
						isVisible={true}
						title={showCartMsg}
						leftTitle={strings("Continue Shopping")}
						rightTitle={strings("Go to cart")}
						onClose={() => { setShowCartMsg("") }}
						rightAction={() => {
							setShowCartMsg("")
							navigation.navigate('MyCart', { screen: 'Cart' })
						}}
						leftAction={() => {
							setShowCartMsg("")
						}}
					/>
				)
			}

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
			{
				(rateOrderId &&
					<RatingModal
						isVisible={isRateVisible}
						hideModal={() => {
							setRateOrderId(undefined)
							setSsRateVisible(false)
						}}
						onCancel={() => {
							setRateOrderId(undefined)
							setSsRateVisible(false)
						}}
						onSubmit={(slectedProblems, rate, suggestions) => {
							rateOrder({ order_id: rateOrderId, rating: rate, rating_reason_id: slectedProblems?.id, rating_suggestion: suggestions }, () => {
								showToast("Your Rate Delivered to Us")
								setRateOrderId(undefined)
								setSsRateVisible(false)
							})
						}}
						orderId={rateOrderId}
						delveryDate={undefined}
						defaultRating={0}
					/>
				)
			}
		</SafeAreaView>
	);
};

export { Home };
