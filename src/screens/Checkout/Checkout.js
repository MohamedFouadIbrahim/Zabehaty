import React, { useEffect, useState } from 'react';
import moment from "moment"
import { Alert } from 'react-native';
import { ActivityIndicator, FlatList, I18nManager, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { icons } from '../../assets';
import { CartButton, CheckoutItem, Line, OffersAndVouchers, Row, TajwalBold, TajwalRegular } from '../../components';
import { strings } from '../../i18n';
import { h } from '../../mutils';
import { availablePoints, checkout, checkoutSettings, createOrder } from '../../services/Checkout';
import { myColors } from '../../styles/myColors';
import { getCurrentTime, isTimeEligableToMakeOrder } from '../../utils/DateTime';
import CurrentAddress from '../DeliveryOptions/CurrentAddress';
import { styles } from './styles';
import RTL_STYLES from '../../styles/rtlStyles';


const Checkout = ({ navigation, route }) => {

    const {
        params: {
            cartItemId,
            selectedTime,
            selectedDateOrDay,
            payments = [],
            date_style,
            currentAddress,
            department,
            selectedEidDay
        }
    } = route

    useEffect(() => {
        navigation.setOptions({
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
                        color={'#000000'}
                        size={25}
                    />
                </TouchableOpacity>
            )
        })
    }, [])

    const [availablePayments, setAvailablePayments] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [voucherCode, setVoucherCode] = useState("")
    const [isLoading, setisLoading] = useState(true)
    const [voucherCodeApplied, setIsVoucherCodeApplied] = useState(false)
    const [pointsApplied, setIsPointsApplied] = useState(false)
    const [currentPoint, setCurrentPoint] = useState(0) //
    const [isLoadingCheckout, setIsLoadingCheckout] = useState('')
    const [notes, setNotes] = useState("")
    const [points, setPoints] = useState({ points: null, discount: 0 })

    useEffect(() => {
        getCheckout('', '');
        availablePoints({ cart_id: cartItemId }, ({ data }) => { setPoints(data) })
    }, [])

    const getCheckout = (promocode = "", redeem_points = "") => {

        setisLoading(true)
        checkout({ cartId: cartItemId, promocode, redeem_points }, res => {
            setCartItems(res.data);
            setisLoading(false);
        })

        if (promocode) {
            setIsVoucherCodeApplied(true)
        }

        setIsPointsApplied( (redeem_points === 1) ? true : false )
        //setisLoading(false)
    }

    const getSettings = () => {
        checkoutSettings({ cartId: cartItemId }, res => {
            setAvailablePayments(res.data.payments)
        })
    }

    useEffect(() => {
        if (route.params.payments) {
            setAvailablePayments(route.params.payments)
        } else {
            getSettings()
        }
    }, [route.params.payments])

    const [payMentOption, setPayMentOption] = useState([])
    const [selectedPayMentOption, setSelectedPayMentOption] = useState(undefined)

    useEffect(() => {
        const payMentOptionTmp = availablePayments.map((item, index) => ({
            id: item,
            name: item == 1 ? strings("CashonDelivery") : strings("OnlinePayment"),
            image: item == 1 ? icons.Cashondelivery : icons.Creditcart
        }))

        setPayMentOption(payMentOptionTmp)

        setSelectedPayMentOption(payMentOptionTmp.length > 1 ? payMentOptionTmp[1] : payMentOptionTmp[0])
    }, [availablePayments])

    const onSelectPayment = payment => {
        setSelectedPayMentOption(payment)
    }

    const onDeleteVoucherCodes = () => {
        setIsVoucherCodeApplied(false)
        setVoucherCode("")
        getCheckout("",currentPoint)
    }

    const {
        discount,
        discount_total,
        id,
        shop,
        subtotal,
        tax,
        total,
        delivery,
        details
    } = cartItems


    const renderrPoints = () => {

        if (parseInt(points?.points) >= 5000) {
            return (
                <Row style={styles.pointsContainer}>
                    <View>
                        <TajwalBold style={styles.yourPointText} >
                            {strings("Your Points")}
                        </TajwalBold>

                        <TajwalBold style={[styles.yourPointText, { fontSize: 12 }]} >
                            {points?.points}
                        </TajwalBold>
                    </View>

                    <View>
                        <TajwalBold style={styles.yourPointText} >
                            {`${strings("AED")} ${points?.discount}`}
                        </TajwalBold>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => {
                                //setIsPointsApplied(!pointsApplied)

                                if (pointsApplied) {
									getCheckout(voucherCode, 0)
                                    setCurrentPoint(0)
                                } else {
                                    getCheckout(voucherCode, 1)
                                    setCurrentPoint(1)
                                }
                            }}
                        >
                            <TajwalRegular style={{ color: '#658FF0', textAlign: 'center', fontSize: 14 }} >
                                {pointsApplied ? strings("UNDO") : strings("Redeem now")}
                            </TajwalRegular>
                        </TouchableOpacity>

                    </View>


                </Row>
            )
        }
    }

    const renderPageContent = () => {
        if (true) { // detail
            let dateTimeString = ""
            if (selectedDateOrDay) {
                dateTimeString = `${selectedDateOrDay?.title} : ${strings('fromTime')} ${selectedTime?.from} ${strings("to")} ${selectedTime?.to}`
            }
            return (
                <>
                    <CheckoutItem
                        deliveryDescription={''} //{'Standard'}
                        dateTime={`${dateTimeString}`}
                        cartItems={cartItems}
                        contentContainerStyle={styles.checkoutItemContainer}
                    />

                    {
                        (currentAddress) ?
                            <View style={styles.addressContainer}>
                                <CurrentAddress
                                    AddressName={currentAddress?.name}
                                    currentAddress={currentAddress}
                                    city={currentAddress?.branch.name}
                                    area={currentAddress?.region.name}
                                    mobile={currentAddress?.mobile}
                                    hideChangeBtn={true}
                                    houseNumber={currentAddress?.apartment_num}
                                    building_number={currentAddress?.building_number}
                                    Address={currentAddress?.address}
                                />
                            </View>
                            :
                            null
                    }
                    <OffersAndVouchers
                        navigation={navigation}
                        voucherCode={voucherCode}
                        TotalBeforeDiscount={`${subtotal}`}
                        Delivery={`${delivery}`}
                        Discount={`${discount_total}`}
                        Tax={tax}
                        Total={`${total}`}
                        VoucherCodeApplied={voucherCodeApplied}
                        onDeleteVoucherCode={() => { onDeleteVoucherCodes() }}
                        onApplyVoucherCode={(vou) => { getCheckout(vou,currentPoint) }}
                        onPressToBrowseVouchers={() => {
                            navigation.navigate('ApplyCoupon', { cartId: cartItemId, onApplyCoupon: (vou) => { setVoucherCode(vou) } })
                        }}
                    />

                    {renderrPoints()}

                    <View>

                        <Text style={styles.selectaPayMentMethodText} >
                            {strings("SelectaPayMentMethod")}
                        </Text>

                        <FlatList
                            data={payMentOption}
                            keyExtractor={(item, index) => String(index)}
                            numColumns={2}
                            contentContainerStyle={styles.list}
                            renderItem={({ item, index }) => (

                                <TouchableOpacity
                                    style={[styles.paymentOptionContainer, {
                                        borderColor: selectedPayMentOption?.id == item?.id ? '#40AA54' : '#ECECEC',
                                        backgroundColor: selectedPayMentOption?.id == item?.id ? '#EBF6ED' : 'transparent',
                                    }]}
                                    onPress={() => { onSelectPayment(item) }}
                                >
                                    <View style={{ flex: 1, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={item.image} resizeMode='contain' />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.checkCircleText} >
                                            {item.name}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                            )}
                        />
                    </View>

                    <Text style={styles.notesTitle}>
                        {strings("additionalNotes")}
                    </Text>
                    <View style={styles.notesContainer}>
                        <TextInput
                            style={[styles.inputStyle, (I18nManager.isRTL) ? RTL_STYLES.inputStyle : {}]}
                            autoFocus={false}
                            value={notes}
                            returnKeyType={"next"}
                            onChangeText={value => setNotes(value)}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                    <CartButton
                        text={strings('Confirm Order')}
                        onPress={() => {
							if (date_style === "date" || date_style === "range") {
								if (selectedDateOrDay && selectedDateOrDay.day) {
									const currentDate = moment(new Date()).format("YYYY-MM-DD")
									if (selectedDateOrDay.day === currentDate) {
										if (selectedTime?.from && !isTimeEligableToMakeOrder(selectedTime?.from)) {
											Alert.alert(
												strings("Can not Addd Order In This Time"),
												"",
												[
													{
														text: strings("Go to cart"),
														onPress: () => { navigation.popToTop(); },
														style: "default"
													},
												],
												{ cancelable: false }
											);
											return
										}
									}
								}
							}

							if (selectedPayMentOption && selectedPayMentOption.id) {
								let data = {}
								if (date_style === "date" || date_style === "range") {
									data = {
										cart_id: cartItemId,
										address_id: currentAddress?.id,
										time_from: selectedTime?.from,
										time_to: selectedTime?.to,
										payment_method: String(selectedPayMentOption.id),
										date: selectedDateOrDay?.day,
										notes: notes
									}
								} else {
									data = {
										cart_id: cartItemId,
										address_id: currentAddress?.id,
										time_from: selectedTime?.from,
										time_to: selectedTime?.to,
										payment_method: String(selectedPayMentOption.id),
										day: department.id == 2 && selectedEidDay ? selectedEidDay : selectedDateOrDay?.day,
										notes: notes
									}
								}

								if (pointsApplied) {
									data.use_points = 1
								}

								console.log(data)

								setIsLoadingCheckout(true)

								createOrder({ ...data }, res => {
									setIsLoadingCheckout(false)
									if (selectedPayMentOption.id == 1) {
										navigation.popToTop()
										navigation.navigate('SucessfulOrder')
									} else {
										navigation.navigate('OnlinePaymentWebView', {
											orderId: res.data.id
										})
									}

								}, err => {
									console.log(err)
									console.log(err.response)
									Alert.alert(
										strings("Error"),
										err.response.msg,
										[
											{
												text: strings("Close"),
												onPress: () => { },
												style: "default"
											},
										],
										{ cancelable: false }
									);

									setIsLoadingCheckout(false)
								})
							}

						}}
						style={{ marginTop: h(20) }}
                    />


                </>
            )
        }
    }

    if (isLoading) {
        return <ActivityIndicator size='small' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} color={myColors.green3} />
    }

    return (

        <SafeAreaView style={styles.container}>

            {
                (!isLoading) ?
                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps={"handled"}>

                        {renderPageContent()}

                    </KeyboardAwareScrollView> :

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size='small' color={myColors.green3} />
                    </View>

            }

            <Spinner
                visible={isLoadingCheckout}
            />
        </SafeAreaView>


    )

}

export { Checkout };

