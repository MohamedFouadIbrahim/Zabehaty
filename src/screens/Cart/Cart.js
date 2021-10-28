import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Platform, SafeAreaView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { icons } from '../../assets';
import { AddressHeader, CartButton, CustomLeftHeader, Row, TajwalBlack, TajwalMedium, TajwalRegular, ZabayhDepartment } from '../../components';
import { HomeHeader } from "../../components/HomeHeader";

import { PurchaseCoupon } from '../../components/PurchaseCoupon';
import { strings } from '../../i18n';
import { h } from '../../mutils';
import { CHANGE_BRANCH, CHANGE_EMIRATE, CHANGE_FULLADDRESS, CHANGE_REGION } from '../../Redux/actionTypes';
import { editCart, emptyCart, getCart, removeFromCart } from '../../services/Cart';
import { getCategories } from '../../services/Categories';
import { myColors } from '../../styles';
import { setBranchId } from '../../utils/APIKit';
import ProductDetails from './ProductDetails';
import { styles } from './styles';

const Cart = ({ navigation, route }) => {

    //params
    //department
    //console.log('route', route)
    const dispatch = useDispatch();

    const [department, setDepartment] = useState(route.params?.department)
    // console.log('current', department)
    const [departments, setDepartments] = useState()
    const [cartItems, setCartItems] = useState([])

    const currentBranch = useSelector(state => state.address.currentBranch)

    const [spinner, setSpinner] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const isFocused = useIsFocused()

	useEffect(() => {
		console.log("HEEEEEENAAAAAAAAAA")
		console.log('route', route.params)
		setDepartment(route.params?.department)
	}, [route.params?.department])

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
				<TouchableOpacity
					activeOpacity={0.8}
					style={{
						width: 50,
						height: 50,
						justifyContent: "center",
						alignItems: "center"
					}}
					onPress={() => {
						navigation.goBack()
					}}
				>
					<Ionicons
						name={'close-outline'}
						color={'#000000'}
						size={25}
					/>
				</TouchableOpacity>
			)
        })
    }, [])

    const _getData = () => {
        setCartItems([])
        setDepartments([])
        setIsLoading(true)

        getCategories(({ data }) => {
            getCart((res) => {
				console.log(data)
				//const filteredDepartments = data.filter( departmentObj => departmentObj.id !== 160)
                setDepartments(data)

				console.log(department)
                if (!department) {
					setDepartment(data[0])
                }

                setCartItems(res.data)
                setIsLoading(false)
            })
        })
    }

    useEffect(() => {
        _getData()
        /*if (!isFocused) {
            navigation.setParams({ department: null })
        }*/
    }, [isFocused])

    useEffect(() => {
        if (currentBranch && currentBranch.id) {
            setBranchId(currentBranch?.id)
            _getData()
        }
    }, [currentBranch])

    const _onAddToCart = (cart, product) => {

        const {
            currentDetails,
            step,
            cuurentQuantity
        } = apiParams(cart, product)

        editCart({ quantity: cuurentQuantity, cartDetailsId: currentDetails?.id }, res => {
            setCartItems(res.data)
        })
    }


    const apiParams = (cart, product) => {

        const currentDetails = cart.details.find(item => item.product.id == product.id)
        const step = currentDetails.product.quantity_settings.step
        const min = currentDetails.product.quantity_settings.min
        const cuurentQuantity = product.quantity

        return {
            currentDetails,
            step,
            cuurentQuantity,
            min
        }
    }

    const _onDelete = (cart, product) => {

        const {
            currentDetails
        } = apiParams(cart, product)


        removeFromCart({ cartDetailsId: currentDetails?.id }, res => {
            setCartItems(res.data)
        })

    }

    const _onEmptyCart = (cart_id) => {
        console.log("Empty Cart");
        setSpinner(true)
        const formData = new FormData();
        formData.append("cart_id", cart_id)
        console.log(formData)
        emptyCart({ cart_id }, res => {
            _getData()
            setSpinner(false)

        })



    }

    const _onRemoveFromCart = (cart, product) => {

        const {
            currentDetails,
            step,
            cuurentQuantity,
            min
        } = apiParams(cart, product)


        editCart({ quantity: cuurentQuantity, cartDetailsId: currentDetails.id }, res => {
            setCartItems(res.data)
        })

    }

    const renderDetailsFooter = (cartItem) => {
        if (!cartItems.length) {
            return null
        }
        return (
            <>
                <Row style={styles.cartItemContainer} >
                    <TouchableOpacity style={styles.emptyCartRow} onPress={() => _onEmptyCart(cartItem.id)} >

                        <Image
                            source={icons.trash}
                            resizeMode='contain'
                        />

                        <TajwalRegular style={styles.EmptyCart} >
                            {strings("EmptyCart")}
                        </TajwalRegular>

                    </TouchableOpacity>

                    <Row style={[styles.emptyCartRow, { marginTop: Platform.OS == 'ios' ? h(5) : 0 }]} >

                        <TajwalRegular style={styles.SubTotal} >
                            {strings("SubTotal")}
                        </TajwalRegular>

                        <TajwalBlack style={styles.CurrencyPrise}>
                            {`${cartItem?.subtotal} ${strings('AED')}`}
                        </TajwalBlack>
                    </Row>
                </Row>

                <CartButton
                    text={strings('ProceedtoCheckout')}
                    onPress={() => {
                        const checkoutDirectly = parseInt(cartItem?.checkout_directly)
                        if (checkoutDirectly) {
                            navigation?.navigate('Checkout', {
                                cartItemId: cartItem?.id,
								department: department,
                            })
                        } else {
                            navigation?.navigate('DeliveryOptions', {
                                cartItemId: cartItem?.id,
                                department: department,
                            })
                        }
                    }}
                />

            </>
        )
    }

    const renderPurchaseCoupon = () => {
        if (cartItems.length) {
            return (
                <PurchaseCoupon
                    start={'0 AED'}
                    title={'احصل على قسيمة شراء ب 150 درهم'}
                    end={'100 AED'}
                    progress={0.5}
                />
            )
        }
        return null
    }

    const renderDetailsItem = ({ item: cartItem, index }) => {

        return (
            <FlatList
                key={String(index)}
                style={{flex:1}}
                data={cartItem?.details}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item, index }) => renderProductDetails({ item, index, cart: cartItem })}
                ListFooterComponent={() => renderDetailsFooter(cartItem)}
                ListHeaderComponent={() => (
                    <Row style={styles.departmentHeaderContainer}>
                        <MaterialIcons name='storefront' size={25} />
                        <TajwalMedium style={styles.yourCart} >
                            {cartItem?.shop ? cartItem?.shop.name : strings("Zabehaty")} {/*cartItem?.department?.name*/}
                        </TajwalMedium>
                    </Row>
                )}
            />

        )
    }

    const renderProductDetails = ({ item: cartDetails, index, cart }) => {

        console.log(cartDetails)
        return (
            <ProductDetails
                {...cartDetails.product}
                {...cartDetails}
                productId={cartDetails.product?.id}
                onAddToCart={product => _onAddToCart(cart, product)}
                onRemoveFromCart={product => _onRemoveFromCart(cart, product)}
                onDelete={product => _onDelete(cart, product)}
            />
        )
    }

    const renderDepartmentsSlider = () => (
        <FlatList
            data={departments}
            renderItem={({ item }) => (
                <ZabayhDepartment
                    obj={item}
                    isSelected={item.id === department?.id ? true : false}
                    onPress={setDepartment}
					cartItems={ cartItems?.filter(cartItem => cartItem.department?.id == item.id) }
                />
            )}
            keyExtractor={(item, index) => index + ""}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    )

    const handelBranches = (branch = null, onSucessAddBranchId) => {
        if (branch?.id) {
            setBranchId(branch.id)
            dispatch({ type: CHANGE_BRANCH, data: branch })
            onSucessAddBranchId && onSucessAddBranchId()
            return
        }
    }

    return (
        <SafeAreaView style={styles.cartContainer} >

            <HomeHeader
                onFinish={branch => {
                    console.log("Selected Branch")
                    console.log(branch)
                    handelBranches(branch)
                }}
            />

            { /* {renderPurchaseCoupon()} */}
            <TajwalRegular style={[styles.exploreCartText, Platform.OS == 'ios' ? { lineHeight: 20 } : {}]} >
                {strings("ExploreCart")}
            </TajwalRegular>
            {
                (isLoading) ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color={myColors.green} />
                    </View>
                    :
                    <React.Fragment>
                        <View style={{ paddingHorizontal: h(5), alignItems: 'flex-start' }} >
                            {renderDepartmentsSlider()}
                        </View>
                        <FlatList
                            keyExtractor={(item, index) => String(index)}
                            renderItem={renderDetailsItem}
                            style={{flex:1}}
                            data={cartItems?.filter(item => item.department?.id == department?.id)}
                        />
                    </React.Fragment>
            }
            <Spinner
                visible={spinner}
            />
        </SafeAreaView>
    )

}

export { Cart };
