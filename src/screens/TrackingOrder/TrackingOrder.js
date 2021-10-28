import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, TouchableOpacity, View, Linking } from 'react-native';
import InAppReview from 'react-native-in-app-review';
import DeviceInfo from 'react-native-device-info';

import { RatingModal, Row, TajwalBlack, TajwalBold, TajwalMedium } from '../../components';
import OrderSummary from '../../components/OrderSummary';
import { strings } from '../../i18n';
import { h, w } from '../../mutils';
import { showToast } from '../../utils/Toast';
import { rateOrder } from '../../services/Orders';
import DeliveredByShop from './DeliveredByShop';
import OrderTimeLine from './OrderTimeLine';
import { styles } from './styles';
import APIKit from "../../utils/APIKit";
import { SuccessModal } from "../../components/Modals/SuccessModal"
import Snackbar from 'react-native-snackbar';

const TrackingOrder = ({ route, navigation }) => {
    const {
        params: {
            orderStatus,
            status = [],
            products,
            orderDate,
            Total,
            paymentMethod,
            id,
            deliveryDate,
            delivery_by_us,
            rating,
            address,
            department
        }

    } = route

    const [isRateVisible, setSsRateVisible] = useState(false)
    const [deviceBrand, setDeviceBrand] = useState("")
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    useEffect(() => {
        const brand = DeviceInfo.getBrand();
        setDeviceBrand(brand);
    }, [setDeviceBrand]);

    const handelAttributes = (attributes = []) => {
        return (
            <FlatList
                data={attributes}
                keyExtractor={(item, index) => String(index)}
                style={{ width: w(200), paddingHorizontal: w(10) }}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                    <FlatList
                        data={item.values}
                        keyExtractor={(item, index) => String(index)}
                        scrollEnabled={false}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                            <TajwalMedium key={String(index)}  >
                                {`${item}  `}
                            </TajwalMedium>
                        )}
                    />
                )}
            />
        )
    }

    const renderItem = ({ item }) => {

        return (
            <Row style={styles.itemRowContainer} >

                <Row style={{ flex: 1 }} >
                    <Image
                        source={{ uri: item.product.image }}
                        resizeMode="stretch"
                        style={styles.productImage}
                    />

                    <View>
                        <View>

                            <TajwalMedium style={styles.itemText}>
                                {item.product.name}
                            </TajwalMedium>

                            {handelAttributes(item.attributes)}
                        </View>

                        <TajwalMedium style={[styles.itemText, { color: '#8B8B97', marginTop: h(5) }]}>
                            {item.quantity}
                        </TajwalMedium>
                    </View>

                </Row>

                <TajwalMedium style={styles.itemText}>
                    {item.product.price} {strings("AED")}
                </TajwalMedium>

            </Row>
        )
    }

    const rateAppOnStore = () => {

        if (deviceBrand === "Apple") {
            const link = "itms-apps://itunes.apple.com/us/app/id1227769641?mt=8"
            Linking.canOpenURL(link).then(supported => {
                supported && Linking.openURL(link);
            }, (err) => console.log(err));
        } else { // Android
            const link = "https://play.google.com/store/apps/details?id=com.atp.zabehati"
            //const link = "market://details?id=com.atp.zabehati"
            Linking.canOpenURL(link).then(supported => {
                supported && Linking.openURL(link);
            }, (err) => console.log(err));
        }

        /*if (InAppReview.isAvailable()) {
            InAppReview.RequestInAppReview().then((hasFlowFinishedSuccessfully) => {
                // when return true in android it means user finished or close review flow
                console.log('InAppReview in android', hasFlowFinishedSuccessfully);

                // when return true in ios it means review flow lanuched to user.
                console.log(
                    'InAppReview in ios has lanuched successfully',
                    hasFlowFinishedSuccessfully,
                );

                // 1- you have option to do something ex: (navigate Home page) (in android).
                // 2- you have option to do something,
                // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

                // 3- another option:
                if (hasFlowFinishedSuccessfully) {
                // do something for ios
                // do something for android
                }

                // for android:
                // The flow has finished. The API does not indicate whether the user
                // reviewed or not, or even whether the review dialog was shown. Thus, no
                // matter the result, we continue our app flow.

                // for ios
                // the flow lanuched successfully, The API does not indicate whether the user
                // reviewed or not, or he/she closed flow yet as android, Thus, no
                // matter the result, we continue our app flow.
            })
            .catch((error) => {
                //we continue our app flow.
                // we have some error could happen while lanuching InAppReview,
                // Check table for errors and code number that can return in catch.
                console.log(error);
            });
        }else {
            console.log("HERE")
            if (deviceBrand === "Apple") {
                const link = "itms-apps://itunes.apple.com/us/app/id1227769641?mt=8"
                Linking.canOpenURL(link).then(supported => {
                    supported && Linking.openURL(link);
                }, (err) => console.log(err));
            }else{ // Android
                const link = "https://play.google.com/store/apps/details?id=com.atp.zabehati"
                //const link = "market://details?id=com.atp.zabehati"
                Linking.canOpenURL(link).then(supported => {
                    supported && Linking.openURL(link);
                }, (err) => console.log(err));
            }
        }*/

    }
    const reOrder = async() => {
        const response = await APIKit.post("user/repeat-order/add", {
            order_id: id,
        });
        console.log(response)
        if (response.data.status === 200) {
            if (response.data.data) {
                // Balance Transfered Successfully
                // setShowSuccessModal(true)
                navigation.navigate('MyCart', { screen: 'Cart', params: { department: department } })
            }
        } else {
            Snackbar.show({
                text: response.data.msg,
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: strings('close'),
                    textColor: 'white',
                    onPress: () => { /* Do something. */ },
                },
            });
        }
    }
    return (
        <SafeAreaView style={styles.container} >

            <ScrollView>

                <OrderSummary {...route.params} />

                <View style={styles.headerItemContainer} >
                    <TajwalBlack style={styles.orderItemText} >
                        {strings("Order Tracking")}
                    </TajwalBlack>
                </View>

                {delivery_by_us ? <OrderTimeLine navigation={navigation} deliveryDate={deliveryDate} orderId={route?.params?.id} status={status} rating={rating} address={address} /> : <DeliveredByShop shop={route.params.shop} />}

                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    data={products}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={renderItem}
                    ListHeaderComponent={() => {
                        return (
                            <View style={styles.headerItemContainer} >
                                <TajwalBlack style={styles.orderItemText} >
                                    {strings("Itemsinthisorder")}
                                </TajwalBlack>
                            </View>
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    ListFooterComponent={() => {
                        return (
                            <View>
                                <View style={{ paddingHorizontal: w(20), paddingVertical: h(10) }} >

                                    <Row style={{ justifyContent: 'space-between' }} >

                                        <TajwalBold style={styles.infoText} >
                                            {strings("TotalAmount")}
                                        </TajwalBold>

                                        <TajwalBold style={styles.infoText} >
                                            {Total} {strings("AED")}
                                        </TajwalBold>

                                    </Row>

                                    <Row style={{ justifyContent: 'space-between' }} >

                                        <TajwalBold style={styles.infoText} >
                                            {strings("Paid From")}
                                        </TajwalBold>
                                        <TajwalBold style={styles.infoText} >
                                            {paymentMethod}
                                        </TajwalBold>

                                    </Row>

                                </View>

                                <TouchableOpacity
                                    style={[styles.headerItemContainer, { marginTop: 0 }]}
                                    onPress={() => {
                                        navigation.navigate("Invoice", { uri: `https://v3.zabe7ti.website/public/receipt/${id}`, orderId: id })
                                    }}
                                >
                                    <TajwalBlack style={[styles.orderItemText, { color: '#4A5CFF' }]} >
                                        {strings("Download PDF Invoice")}
                                    </TajwalBlack>
                                </TouchableOpacity>

                            </View>

                        )

                    }}
                // ItemSeparatorComponent={()=> <Line />}
                />

                {/*(rating == 0 || rating == null) && <TouchableOpacity style={styles.greenButton} onPress={() => { setSsRateVisible(true) }}  >
                    <TajwalBold style={styles.greenButtonText} >
                        {strings("Ifyoulikedtheexperiencepleaserateus")}
                    </TajwalBold>
                </TouchableOpacity>*/}

                <TouchableOpacity style={styles.greenButton} onPress={rateAppOnStore}  >
                    <TajwalBold style={styles.greenButtonText} >
                        {strings("Ifyoulikedtheexperiencepleaserateus")}
                    </TajwalBold>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.greenButton,{marginTop:h(20)}]} onPress={reOrder}  >
                    <TajwalBold style={styles.greenButtonText} >
                        {strings("ReOrder")}
                    </TajwalBold>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.whiteButton}
                    onPress={() => {
                        navigation.popToTop()
                        navigation.jumpTo('MyHome')
                    }}
                >
                    <TajwalBold style={styles.whiteButtonText} >
                        {strings("ContinueShopping")}
                    </TajwalBold>
                </TouchableOpacity>

            </ScrollView>

            <RatingModal
                isVisible={isRateVisible}
                hideModal={() => { setSsRateVisible(false) }}
                onCancel={() => { setSsRateVisible(false) }}
                onSubmit={(slectedProblems, rate, suggestions) => {
                    rateOrder({ order_id: id, rating: rate, rating_reason_id: slectedProblems?.id, rating_suggestion: suggestions }, () => {
                        showToast("Your Rate Delivered to Us")
                    })
                }}
                orderId={id}
                delveryDate={deliveryDate}
                isLastOrder
                defaultRating={0}
            />
            <SuccessModal
                isVisible={showSuccessModal}
                title={strings("You have been re-order successfully")}
                leftTitle={strings("Done")}
                onClose={() => { setShowSuccessModal(false) }}
                leftAction={() => {
                    setShowSuccessModal(false)
                }}
            />
        </SafeAreaView>
    )
}

export { TrackingOrder };

