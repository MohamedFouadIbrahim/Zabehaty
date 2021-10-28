import React, { useCallback, useEffect, useState } from "react";
import {
	Text,
	View,
	ScrollView,
	Image,
	ImageBackground,
	Switch,
	Linking,
	I18nManager,
	Alert,
	TouchableOpacity,
	SafeAreaView,
	ActivityIndicator
} from "react-native";
import { useSelector } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';
import DeviceInfo from 'react-native-device-info';

import { TajwalRegular, CustomLeftHeader } from '../../components';
import { styles } from "./styles";
import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";
// CONSTAMTS
import Icon from 'react-native-vector-icons/FontAwesome';

import { Shop } from "../../components";

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
import { getCart } from '../../services/Cart';
import { string } from "yup";

import { TextList } from "../../components/TextList"
import { OptionList } from "../../components/OptionList"
import { ToogleList } from "../../components/ToogleList"
import { Selection } from "../../components/Selection"
import { OptionsWithQuantity } from "../../components/OptionsWithQuantity"

import Ionicons from 'react-native-vector-icons/Ionicons';
import { myColors } from "../../styles";
import { w } from "../../mutils";
import { SuccessModal } from "../../components/Modals/SuccessModal"
import PageControl from 'react-native-page-control';

const SingleZabeha = ({ route, navigation }) => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	const [totalCartNumber, setTotalCartNumber] = useState(0)
	const [totalCartPrice, setTotalCartPrice] = useState(0)

	const userState = useSelector(state => state.session.user)

	const [spinner, setSpinner] = useState(false);
	const [mainCategory, setMainCategory] = useState(undefined)
	const [subCategory, setSubCategory] = useState(undefined)
	const [shop, setShop] = useState(undefined)
	const [selectedShop, setSelectedShop] = useState(undefined)

	const [productId, setProductId] = useState(undefined)
	const [productData, setProductData] = useState(undefined)
	const [price, setPrice] = useState(0)

	// Selections
	const [selectedSubProduct, setSelectedSubProduct] = useState(undefined)
	const [selectedQty, setSelectedQty] = useState(undefined)

	const [selectedAttributes, setSelectedAttributes] = useState({})


	const [isSizeCollapsed, setIsSizeCollapsed] = useState(false)
	const [isQtyCollapsed, setIsQtyCollapsed] = useState(false)
	const [isAttributesCollapsed, setIsAttributesCollapsed] = useState({})
	const [currentAttributesCollapsedIndex, setCurrentAttributesCollapsedIndex] = useState(0)
	const [isFavourite, setIsFavourite] = useState(true);

	const [quantityLoader, setQuantityLoader] = useState(false)
	const [addToCartModal, setAddToCartModal] = useState(false)
	const [addToFavModal, setAddToFavModal] = useState(false)
	const [deleteToFavModal, setDeleteToFavModal] = useState(false)
	const [loginModal, setLoginModal] = useState(false)
	const [activeSlide, setActiveSlide] = useState(0)

	useEffect(() => {
		if (route.params.productId) {
			setProductId(route.params.productId)
		}
		if (route.params.mainCategory) {
			setMainCategory(route.params.mainCategory)
		}
		if (route.params.subCategory) {
			setSubCategory(route.params.subCategory)
		}
		if (route.params.shop) {
			setShop(route.params.shop)
			setSelectedShop(route.params.shop)
		}
	}, [route])

	useEffect(() => {
		console.log(route.params)
		if (productData) {
			navigation.setOptions({
				headerTitle: () => (
					<View style={{ alignItems: "center", justifyContent: "center" }}>
						<TajwalRegular style={{ fontSize: 20, lineHeight: 28 }}>{productData?.name}</TajwalRegular>
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
				),
				headerLeft: () => <CustomLeftHeader isClose={false} />
			})
		}
	}, [route, productData])

	useEffect(() => {
		if (productId) {
			fetchProduct()
		}
	}, [productId])

	useEffect(() => {
		if (productData) {
			if (selectedQty < productData.quantity_settings.min) {
				setSelectedQty(productData.quantity_settings.min)
			}

			const attrCollapsedKeys = Object.keys(isAttributesCollapsed)
			if (attrCollapsedKeys.length === 0) {
				let attributeViewSetup = {}
				productData.attributes.forEach(attr => {
					attributeViewSetup[attr.id] = false
				})
				setIsAttributesCollapsed(attributeViewSetup)
			}
		}
	}, [selectedQty, productData])

	useEffect(() => {
		let prodPrice = (productData && productData.price) ? parseFloat(productData.price) : 0
		prodPrice += (selectedSubProduct ? parseFloat(selectedSubProduct.price) : 0)
		const attributeKeys = Object.keys(selectedAttributes)
		attributeKeys.forEach(key => {
			if (Array.isArray(selectedAttributes[key])) {
				selectedAttributes[key].forEach(item => {
					if (item.price) {
						prodPrice += parseFloat(item.price)
					}
				})
			} else {
				if (selectedAttributes[key].price) {
					prodPrice += parseFloat(selectedAttributes[key].price)
				}
			}
		})
		prodPrice *= selectedQty
		setPrice(prodPrice)
	}, [productData, selectedSubProduct, selectedAttributes, selectedQty])

	useEffect(() => {
		if (selectedSubProduct) {
			setIsQtyCollapsed(false)
		}
	}, [selectedSubProduct])

	useEffect(() => {
		if (productData && productData.sub_product.length === 0) {
			setIsQtyCollapsed(false)
		}
	}, [productData])

	const fetchProduct = async () => {
		const response = await APIKit.get(`product/${productId}`);
		console.log(response)
		if (response.data.status === 200) {
			if (response.data.data.quantity_settings) {
				setSelectedQty(response.data.data.quantity_settings.min)
			}
			if (!mainCategory) {
				setMainCategory(response.data.data.department)
			}
			if (!subCategory) {
				setSubCategory(response.data.data.category)
			}

			response.data.data.attributes.forEach(atr => { // make default packging
				if (atr.id == 6) {
					attributeChange(6, atr.values[0])
				}
			})

			setProductData(response.data.data);
			setIsFavourite(response.data.data && response.data.data.in_favourite ? response.data.data.in_favourite : false)
		}else{
			navigation.goBack()
		}
	}

	const qtyChange = (isIncrease) => {
		setQuantityLoader(true)
		if (isIncrease) {
			setSelectedQty((prevQty) => {
				return parseFloat(prevQty) + parseFloat(productData.quantity_settings.step)
			})
		} else {
			setSelectedQty((prevQty) => {
				return parseFloat(prevQty) - parseFloat(productData.quantity_settings.step)
			})
		}

		if (currentAttributesCollapsedIndex === 0) {
			const attrKeys = Object.keys(isAttributesCollapsed)
			setIsAttributesCollapsed(prevState => {
				return {
					...prevState,
					[attrKeys[0]]: false
				}
			})
			setCurrentAttributesCollapsedIndex(1)
		}
		setQuantityLoader(false)
	}

	const attributeChange = (attrId, value) => {
		setSelectedAttributes(prevState => {
			return {
				...prevState,
				[attrId]: value
			}
		})
	}

	useEffect(() => {
		const selectedAttrKeys = Object.keys(selectedAttributes)
		if (productData && selectedAttrKeys.length > 0) {
			productData.attributes.forEach((attr, index) => {
				if (index > 0) {
					if (selectedAttributes[productData.attributes[index - 1].id]) {
						setIsAttributesCollapsed(prevState => {
							return {
								...prevState,
								[attr.id]: false
							}
						})
					}
				}
			})
		}
	}, [selectedAttributes, productData])

	useEffect(() => {
		console.log(isAttributesCollapsed)
	}, [isAttributesCollapsed])

	const addToCart = async () => {
		if (userState && userState.id) {
			//Validate attributes
			let validate = true
			let validateMessage = strings("You need to select:")
			if (productData.sub_product && productData.sub_product.length > 0) {
				if (selectedSubProduct === undefined) {
					validate = false
					validateMessage += "\n"
					validateMessage += "- " + strings("Size")
				}
			}
			console.log(selectedAttributes)
			productData.attributes.forEach((attr) => {
				console.log(attr.id)
				if (attr.is_required) {
					if (selectedAttributes[attr.id] !== undefined) {
						if (Array.isArray(selectedAttributes[attr.id])) {
							if (selectedAttributes[attr.id].length === 0) {
								validate = false
								validateMessage += "\n"
								validateMessage += "- " + attr.name
							}
						} else {
							if (!selectedAttributes[attr.id]) {
								validate = false
								validateMessage += "\n"
								validateMessage += "- " + attr.name
							}
						}
					} else {
						validate = false
						validateMessage += "\n"
						validateMessage += "- " + attr.name
					}
				}
			})
			if(productData.available_shops && productData.available_shops.shops.length > 0) {
				if (!selectedShop) {
					validate = false
					validateMessage += "\n"
					validateMessage += "- " + productData.available_shops.section_name
				}
			}

			if (validate) {
				console.log("HERE ")
				setSpinner(true)
				console.log(selectedAttributes)
				let attributesKeys = Object.keys(selectedAttributes)

				console.log(attributesKeys)
				let attrs = []
				attributesKeys.forEach(key => {
					if (Array.isArray(selectedAttributes[key])) {
						attrs.push({
							attribute_id: key,
							value_id: selectedAttributes[key].map(item => item.id)
						})
					} else {
						attrs.push({
							attribute_id: key,
							value_id: selectedAttributes[key].id
						})
					}
				})
				console.log(mainCategory)
				console.log(subCategory)
				console.log(productId)
				console.log(selectedSubProduct)
				console.log(selectedShop)
				console.log(selectedQty)
				console.log(attrs)
				const cartObj = {
					department_id: mainCategory.id,
					category_id: subCategory.id,
					product_id: productId,
					sub_product_id: selectedSubProduct?.id,
					quantity: selectedQty,
					attributes: attrs,
					shop_id: (selectedShop && selectedShop.id) ? selectedShop.id : null
				}

				console.log(cartObj)
				try {
					const response = await APIKit.post("cart/add", cartObj);

					console.log(response)
					if (response.data.status === 200) {
						if (response.data.data) {
							fetchCart()
							setAddToCartModal(true)
							// Alert.alert(
							// 	null,
							// 	strings("Added to your cart successfully"),
							// 	[
							// 		{
							// 			text: strings("Continue Shopping"),
							// 			onPress: () => console.log('Cancel Pressed'),
							// 			style: 'cancel'
							// 		},
							// 		{
							// 			text: strings("Go to cart"),
							// 			onPress: () => navigation.navigate("MyCart"),
							// 			style: 'default'
							// 		}
							// 	],
							// 	{ cancelable: false }
							// );
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
				Alert.alert(
					null,
					validateMessage,
					[
						{
							text: strings("Cancel"),
							onPress: () => console.log('Cancel Pressed'),//navigation.navigate('Login'),
							style: 'cancel'
						},
					],
					{ cancelable: false }
				);
			}
		} else {
			setLoginModal(true)
		}
	}

	const addToFavourite = async () => {
		if (userState && userState.id) {
			setSpinner(true)
			const formData = new FormData();
			formData.append("product_id", productData.id)

			console.log(formData)
			try {
				const response = await APIKit.post("user/favourites/add/product", formData);

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
			setLoginModal(true)

		}
	}

	const deleteFromFavourite = async () => {
		if (userState && userState.id) {
			setSpinner(true)
			const formData = new FormData();
			formData.append("product_id", productData.id)

			console.log(formData)
			try {
				const response = await APIKit.post("user/favourites/delete/product", formData);

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
			setLoginModal(true)

		}
	}


	useEffect(() => {
		fetchCart()
	}, [])

	const fetchCart = () => {
		console.log("HERE")
		getCart(res => {
			console.log(res)
			let totalCart = 0
			let numberOfItems = 0
			res.data.forEach(item => {
				totalCart += parseFloat(item.total)
				numberOfItems += item.details.length
			})

			setTotalCartNumber(numberOfItems)
			setTotalCartPrice(totalCart)
			console.log(totalCart)
		})
	}

	const setupAttributesView = (attrId, status) => {
		setIsAttributesCollapsed(prevState => {
			return {
				...prevState,
				[attrId]: status
			}
		})
	}

	const onViewableItemsChangedLocal = useCallback(({ viewableItems, changed }) => {
		setActiveSlide(changed[0].index)
	}, [])

	const onFlatListScrollEnd = (e, numberOfItems) => {
		const contentOffset = e.nativeEvent.contentOffset;
		const viewSize = e.nativeEvent.layoutMeasurement;

		// Divide the horizontal offset by the width of the view to see which page is visible
		let pageNumber = Math.floor(contentOffset.x / viewSize.width);
		const brand = DeviceInfo.getBrand();
		if (brand !== "Apple") {
			if (I18nManager.isRTL) {
				pageNumber = (numberOfItems - 1) - pageNumber
			}
		}

		setActiveSlide(pageNumber)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>

				{
					(productData &&
						<React.Fragment>
							<View>
								<Image
									source={{ uri: productData.image }} //icons.zabehaheaderimg}
									style={styles.zabehaheaderimg}
									resizeMode={"cover"}
								/>
							</View>
							<View style={styles.allContent}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
									{
										(productData.badge &&
											<View style={styles.moresellTexts}>
												<TajwalRegular style={styles.bestsell}>{productData.badge.name}</TajwalRegular>
											</View>
										)
									}
									<TouchableOpacity style={[styles.favouriteContainer, { backgroundColor: isFavourite ? 'red' : 'white' }]}
										onPress={() => (isFavourite ? deleteFromFavourite() : addToFavourite(), setIsFavourite(!isFavourite))}>
										<Icon name={'heart'} size={20} color={isFavourite ? "white" : 'red'} style={styles.favouriteIcon} />
									</TouchableOpacity>
								</View>
								<View style={{ marginBottom: 15, marginTop: 20 }}>
									<Text style={styles.nagdyText}>{productData.name}</Text>
									<Text style={styles.descText}>{productData.description}</Text>
								</View>
								{
									(productData.sub_product && productData.sub_product.length > 0 &&
										<React.Fragment>
											<TouchableOpacity activeOpacity={0.8} onPress={() => setIsSizeCollapsed(!isSizeCollapsed)}>
												<Text style={styles.size} >{strings("Size")}</Text>
											</TouchableOpacity>
											{
												(!isSizeCollapsed &&
													<View style={{ alignItems: 'center' }}>
														<FlatList
															data={productData.sub_product}
															renderItem={({ item }) => (
																<View style={styles.allWeightContainer}>
																	<WeightAge
																		weight={item.weight}
																		age={item.age}
																		price={item.price}
																		oldPrice={item.old_price}
																		onPress={() => {
																			setSelectedSubProduct(item)
																			// isAttributesCollapsed[attr.id]

																			productData.attributes.forEach(item => {
																				setIsAttributesCollapsed(prev => {
																					return {
																						...prev,
																						[item.id]: false
																					}
																				})
																			})

																		}}
																		isSelected={(selectedSubProduct && selectedSubProduct.id === item.id) ? true : false}
																	/>
																</View>
															)}
															keyExtractor={(item) => item.id + ""}
															horizontal
															showsHorizontalScrollIndicator={false}
														/>
													</View>
												)
											}
										</React.Fragment>
									)
								}
								<TouchableOpacity activeOpacity={0.8} onPress={() => setIsQtyCollapsed(!isQtyCollapsed)}>
									<Text style={styles.quantity}>{strings("Quantity")}</Text>
								</TouchableOpacity>
								{
									(!isQtyCollapsed &&
										<View style={styles.addReduceContainer}>
											<TouchableOpacity activeOpacity={0.7} onPress={() => qtyChange(true)}>
												<Image source={icons.addimg} />
											</TouchableOpacity>
											{
												(quantityLoader) ?
													<ActivityIndicator size={'small'} color={myColors.green3} style={{ paddingHorizontal: w(10) }} />
													:
													<TajwalRegular style={styles.quantityNum}>{selectedQty}</TajwalRegular>
											}
											<TouchableOpacity activeOpacity={0.7} onPress={() => qtyChange(false)}>
												<Image source={icons.reduceimg} />
											</TouchableOpacity>
										</View>
									)
								}
								{
									productData.attributes.map((attr, index) => {
										return (
											<React.Fragment key={index}>
												{
													(attr.section_name === "paragraph" &&
														<React.Fragment>
															<TouchableOpacity activeOpacity={0.8}>
																<Text style={styles.quantity}>{attr.name}</Text>
															</TouchableOpacity>
															<Text style={[styles.descText, { marginBottom: 20 }]}>{(attr.values && attr.values.length > 0) ? attr.values[0].value : ""}</Text>
														</React.Fragment>
													)
												}
												{
													(attr.section_name === "without" &&
														<React.Fragment>
															<TouchableOpacity activeOpacity={0.8} onPress={() => setupAttributesView(attr.id, !isAttributesCollapsed[attr.id])}>
																<Text style={styles.quantity}>{attr.name}</Text>
															</TouchableOpacity>
															{
																(!isAttributesCollapsed[attr.id] &&
																	<Without
																		list={attr.values}
																		onChange={(selectedItems) => {
																			attributeChange(attr.id, selectedItems)
																		}}
																	/>
																)
															}
														</React.Fragment>
													)
												}
												{
													(attr.section_name === "cutting" &&
														<React.Fragment>
															<TouchableOpacity activeOpacity={0.8} onPress={() => setupAttributesView(attr.id, !isAttributesCollapsed[attr.id])}>
																<Text style={styles.quantity}>{attr.name}</Text>
															</TouchableOpacity>
															{
																(!isAttributesCollapsed[attr.id] &&
																	<View style={{ marginVertical: 20, alignItems: 'center' }}>
																		<FlatList
																			data={attr.values}
																			renderItem={({ item }) => (
																				<CuttingWay
																					departmentImage={item.image}
																					title={item.value}
																					isSelected={(selectedAttributes[attr.id] && selectedAttributes[attr.id].id === item.id) ? true : false}
																					onVideoPress={() => {
																						if (item.vidro) {
																							Linking.openURL(item.vidro).catch((e) => console.log(e))
																						}
																					}}
																					onSelect={() => {
																						attributeChange(attr.id, item)
																					}}
																				/>
																			)}
																			keyExtractor={(item) => item.id + ""}
																			horizontal
																			showsHorizontalScrollIndicator={false}
																		/>
																	</View>
																)
															}
														</React.Fragment>
													)
												}
												{
													(attr.section_name === "packaging" &&
														<React.Fragment>
															<TouchableOpacity activeOpacity={0.8} onPress={() => setupAttributesView(attr.id, !isAttributesCollapsed[attr.id])}>
																<Text style={styles.quantity}>{attr.name}</Text>
															</TouchableOpacity>
															{
																(!isAttributesCollapsed[attr.id] &&
																	<View style={{ marginVertical: 20, alignItems: 'center' }}>
																		<FlatList
																			data={attr.values}
																			renderItem={({ item }) => (
																				<PackagingProduct
																					departmentImage={item.image}
																					title={item.value}
																					description={item.description}
																					price={item.price}
																					isSelected={(selectedAttributes[attr.id] && selectedAttributes[attr.id].id === item.id) ? true : false}
																					onSelect={() => {
																						attributeChange(attr.id, item)
																					}}
																				/>
																			)}
																			pagingEnabled={ true }
																			keyExtractor={(item) => item.id + "-" + attr.name}
																			horizontal
																			showsHorizontalScrollIndicator={false}
																			onMomentumScrollEnd={ (e) => onFlatListScrollEnd(e, attr.values.length) }
																			//onViewableItemsChanged={onViewableItemsChangedLocal}
																			/*viewabilityConfig={{
																				itemVisiblePercentThreshold: 90
																			}}*/

																		/>

																		<PageControl
																			style={{ marginTop: 20 }}
																			numberOfPages={attr.values.length}
																			currentPage={activeSlide}
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
												}
												{
													(attr.section_name === "options-quantity" &&
														<OptionsWithQuantity
															canCompress={ false }
															title={"Option list iwith Quantity - Price - Short description"}
															data={[{ image: icons.onBoard1, value: "Option1", value2: 'AED 3', id: 1, details: "Gross wt. 500g   Net wt. 500g" },
															{
																image: icons.onBoard1, value: "Option2", value2: 'AED 3', id: 1, details: "Gross wt. 500g   Net wt. 500g", add: true
																, deliveryHours: 3
															}
															]}
															onChange={(selectedItems) => {
																console.log(selectedItems)
																attributeChange(attr.id, selectedItems)
															}}
														/>
													)
												}
												{
													(attr.section_name === "list-multi" &&
														<TextList
															canCompress={ false }
															title={attr.name}
															data={attr.values}
															onChange={(selectedItems) => {
																console.log(selectedItems)
																attributeChange(attr.id, selectedItems)
															}}
														/>
													)
												}
												{
													(attr.section_name === "list-single" &&
														<TextList
															canCompress={ false }
															title={attr.name}
															data={attr.values}
															single
															onChange={(selectedItems) => {
																console.log(selectedItems)
																attributeChange(attr.id, selectedItems)
															}}
														/>
													)
												}
												{
													(attr.section_name === "list-multi-price" &&
														<OptionList
															canCompress={ false }
															title={attr.name}
															data={attr.values}
															onChange={(selectedItems) => {
																console.log(selectedItems)
																attributeChange(attr.id, selectedItems)
															}}
														/>
													)
												}
												{
													(attr.section_name === "list-single-price" &&
														<OptionList
															canCompress={ false }
															title={attr.name}
															data={attr.values}
															single
															onChange={(selectedItems) => {
																console.log(selectedItems)
																attributeChange(attr.id, selectedItems)
															}}
														/>
													)
												}
												{
													(attr.section_name === "on-off" &&
														<ToogleList
															canCompress={ false }
															title={attr.name}
															data={attr.values}
															onChange={(selectedItems) => {
																console.log(selectedItems)
																attributeChange(attr.id, selectedItems)
															}}
														/>
													)
												}
												{attr.section_name === "SizeSelection" && <Selection canCompress title={"Size selection"}
													data={[
														{ title: "Small", id: 1 },
														{ title: "Medium", id: 2 },
														{ title: "Large", id: 3 },
													]}
												/>}
											</React.Fragment>
										)
									})
								}

								{
									(!shop && productData.available_shops &&
										<React.Fragment>
											<TouchableOpacity activeOpacity={0.8}>
												<Text style={styles.quantity}>{productData.available_shops.section_name}</Text>
											</TouchableOpacity>
											<View style={{ marginVertical: 20, alignItems: 'center' }}>
												<FlatList
													data={productData.available_shops.shops}
													renderItem={({ item }) => (
														<Shop
															image={item.image}
															title={item.name}
															desc={item.description}
															info={item.info}
															rating={item.rating}
															isSelected={ item.id === selectedShop?.id }
															onPress={() => {
																setSelectedShop(item)
															}}
														/>
													)}
													keyExtractor={(item) => item.id + ""}
													horizont={ false }
													showsHorizontalScrollIndicator={false}
												/>
											</View>
										</React.Fragment>
									)
								}

								{ /*<Text style={styles.quantity}>{strings("Cutting Way")}</Text>
								<FlatList
									data={CuttingWayData}
									renderItem={({ item }) => (
										<CuttingWay
											departmentImage={item.img}
											title={item.title}
											type={item.type}
										/>
									)}
									keyExtractor={(item, index) => index + ""}
									horizontal
									showsHorizontalScrollIndicator={false}
								/>*/ }
								{ /*<Text style={styles.quantity}>{strings("Packaging Way")}</Text>
								<PackagingProduct
									departmentImage={icons.packagingimg}
									title1={strings("With Snow")}
									title2={strings("Packaging Meat")}
								/>*/ }
								{ /*<Text style={styles.donation}>{strings("Donation Question")}</Text>
								<View style={styles.switchContainer}>
									<Switch
										trackColor={{ false: "#CCC", true: "#16572C" }}
										thumbColor={isEnabled ? "#FFF" : "#FFF"}
										ios_backgroundColor="#3e3e3e"
										onValueChange={toggleSwitch}
										value={isEnabled}
										style={{
											transform: [{ scaleY: 1.3 }],
											marginVertical: 15,
										}}
									/>
									<View style={styles.donateContainer}>
										<Text style={styles.donateText}>{strings("Donate Zabeha")}</Text>
									</View>
								</View>
								<View style={styles.hr}></View>
								<Text style={styles.quantity}>{strings("Cooking Question")}</Text>
								<View style={styles.switchContainer}>
									<Switch
										trackColor={{ false: "#CCC", true: "#16572C" }}
										thumbColor={isEnabled ? "#FFF" : "#FFF"}
										ios_backgroundColor="#3e3e3e"
										onValueChange={toggleSwitch}
										value={isEnabled}
										style={{
											transform: [{ scaleY: 1.3 }],
											marginVertical: 15,
										}}
									/>
									<View style={{ justifyContent: "space-around" }}>
										<Text style={styles.cookingText}>{strings("Cooking Zabeha")}</Text>
									</View>
								</View>
								<View style={styles.hr}></View>*/ }
								<View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 35 }}>
									<View style={{ flex: 1, marginBottom: 20 }}>
										<TouchableOpacity activeOpacity={0.4} style={styles.addToCartBtn} onPress={addToCart}>
											<View style={styles.entering}>
												{
													(I18nManager.isRTL) ?
														<Image source={icons.pointer} style={styles.pointer} />
														:
														<Image source={icons.pointerRTL} style={styles.pointer} />
												}
												<Text style={styles.enteringText}>{strings("Add To Cart")}</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity activeOpacity={0.4} style={styles.cancelOrderBtn} onPress={() => navigation.navigate("Home")}>
											<View style={styles.entering}>
												{
													(I18nManager.isRTL) ?
														<Image source={icons.pointer} style={styles.pointer} />
														:
														<Image source={icons.pointerRTL} style={styles.pointer} />
												}
												<Text style={styles.enteringText}>{strings("Cancel Order")}</Text>
											</View>
										</TouchableOpacity>
									</View>
									<View style={{ flex: 1, alignItems: 'flex-end' }}>
										<View style={styles.price}>
											<Text style={styles.priceText}>{price} {strings("AED")}</Text>
										</View>
									</View>
								</View>
							</View>
						</React.Fragment>
					)
				}
			</ScrollView>
			{
				(totalCartPrice > 0 &&
					<View style={styles.floatingPopupCart}>
						<TouchableOpacity
							activeOpacity={0.8}
							onPress={() => {
								navigation.navigate('MyCart', { screen: 'Cart', params: { department: productData.department } })
							}}
							style={styles.popupCartContent}
						>
							<View style={styles.itemContainer}>
								<Text style={styles.cartItemsCount}>{totalCartNumber}</Text>
								<Text style={styles.itemsText}>{strings('Item(s)')}</Text>
							</View>
							<View style={styles.totalCartContainer}>
								<Text style={styles.totalText}>{strings("Total")}</Text>
								<Text style={styles.cartTotal}>{totalCartPrice.toFixed(2)} {strings('AED')}</Text>
							</View>
						</TouchableOpacity>
					</View>
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
				isVisible={addToCartModal}
				title={strings("Added to your cart successfully")}
				leftTitle={strings("Continue Shopping")}
				rightTitle={strings("Go to cart")}
				onClose={() => { setAddToCartModal(false) }}
				rightAction={() => {
					console.log(productData.department)
					setAddToCartModal(false)
					navigation.popToTop()
					navigation.navigate('MyCart', { screen: 'Cart', params: { department: productData.department } })
				}}
				leftAction={() => {
					navigation.popToTop()
					navigation.navigate('Home', { screen: 'Home' })

					setAddToCartModal(false)
				}}
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
		</SafeAreaView>
	);
};

export { SingleZabeha };
