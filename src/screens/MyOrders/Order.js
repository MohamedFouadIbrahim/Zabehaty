import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets';
import { Row, TajawalLight, TajwalBold, TajwalRegular } from '../../components';
import { strings } from '../../i18n';
import { h } from '../../mutils';
import { myColors } from '../../styles';
import Product from './Product';
import { styles } from './styles';

const Order = (props) => {

    const {
        details: products = [],
        created_at: orderDate,
        status = [],
        total: Total,
        paymentMethod,
        id,
        date,
        payment_status = undefined
    } = props

    // payment_status == 0 thats mean not payed yey

    const orderIsPayed = payment_status != 0

    const checkedStauts = status?.filter(item => item.checked == 1)

    const orderStatus = checkedStauts[checkedStauts.length - 1]

    const [currentProductsNumber, setCurrentProductsNumber] = useState(products.length >= 2 ? 2 : 1)

    const [currentProducts, setcurrentProducts] = useState([])

    const loadMore = () => {
        setCurrentProductsNumber(currentNumber => currentNumber + (products.length - currentNumber))
    }

    useEffect(() => {

        let tempProducts = []

        for (let i = 0; i < currentProductsNumber; i++) {
            tempProducts[i] = products[i];
        }

        setcurrentProducts(tempProducts)

    }, [currentProductsNumber])


    const renderProductsHeader = () => (
        <TajwalRegular style={styles.productHeaderText} >
            {strings("ITEMS")}
        </TajwalRegular>
    )

    const renderProductsFooter = () => {

        if (currentProducts.length < products.length) {
            return (
                <TouchableOpacity onPress={() => loadMore()} style={styles.productFooterRow} >
                    <Image source={icons.plusBlue} style={styles.productFooterImage} />
                    <TajwalRegular style={styles.productFooterText} >
                        {`${products.length - currentProductsNumber} ${strings("More")}`}
                    </TajwalRegular>
                </TouchableOpacity>
            )
        }
        return <View />
    }


    const renderProduct = (({ item }) => (
        <Product
            product={{
                image: item?.product.image,
                name: item?.product.name
            }}
        />
    ))

    if (!currentProducts.length) {
        return null
    }

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.oredrItemContainer}
            disabled={!orderIsPayed}
            onPress={() => {
                props.navigation.navigate('TrackingOrder', {
                    ...props,
                    orderStatus,
                    status,
                    products,
                    orderDate,
                    Total,
                    paymentMethod,
                    id,
                    deliveryDate: date
                })
            }}
        >

            <View style={styles.oredrItemStatusAndDateContainer}>

                <Row style={styles.oredrItemStatusAndDateRow} >

                    <View>
                        <TajwalBold style={styles.oredrItemOrderedOnText} >
                            {strings("ORDEREDON")}
                        </TajwalBold>

                        <TajwalBold style={styles.oredrItemDateText} >
                            {orderDate}
                        </TajwalBold>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[styles.oredrItemStatusContainer, { backgroundColor: orderIsPayed ? myColors.green3 : 'red' }]}
                        disabled={!orderIsPayed}
                        onPress={() => {
                            props.navigation.navigate('TrackingOrder', {
                                ...props,
                                orderStatus,
                                status,
                                products,
                                orderDate,
                                Total,
                                paymentMethod,
                                id,
                                deliveryDate: date
                            })
                        }}
                    >

                        {orderIsPayed && <Image
                            source={icons.check}
                            resizeMode='contain'
                            style={styles.checkImage}
                        />}
                        <TajwalBold style={styles.statusText} >
                            {orderIsPayed ? orderStatus?.status : strings("Order Not payed")}
                            {/* {orderIsPayed ? orderStatus?.status : "لم يتم الدفع"} */}
                        </TajwalBold>

                    </TouchableOpacity>

                </Row>
            </View>

            <FlatList
                data={currentProducts}
                keyExtractor={(item, index) => String(index)}
                renderItem={renderProduct}
                ListHeaderComponent={renderProductsHeader}
                ListFooterComponent={renderProductsFooter}
                contentContainerStyle={styles.productListContainer}
                ListFooterComponentStyle={styles.productFooterContainer}
            />

            <Row style={styles.priceInfoContainer} >
                <View>
                    <TajwalRegular style={styles.titleInfoText} >
                        {strings("TOTAL")}
                    </TajwalRegular>

                    <TajwalRegular style={styles.titleValueText} >
                        {Total} {strings("AED")}
                    </TajwalRegular>
                </View>

                <View>
                    <TajwalRegular style={styles.titleInfoText} >
                        {strings("OrderNo")}
                    </TajwalRegular>

                    <TajwalRegular style={styles.titleValueText} >
                        {`#${id}`}
                    </TajwalRegular>
                </View>

                <View>
                    <TajwalRegular style={styles.titleInfoText} >
                        {strings("Payment")}
                    </TajwalRegular>

                    <TajwalRegular style={styles.titleValueText} >
                        {paymentMethod}
                    </TajwalRegular>
                </View>
            </Row>

            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }} >


                {!orderIsPayed ? <TouchableOpacity
                    activeOpacity={0.9}
                    style={[styles.oredrItemStatusContainer, { marginTop: 10, paddingVertical: 10, backgroundColor: myColors.green3 }]}
                    onPress={() => {
                        props.navigation.push('OnlinePaymentWebView', { orderId: id, onBack: () => props.navigation.goBack() })
                    }}
                >

                    <TajwalBold style={styles.statusText} >
                        {strings("PayNow")}
                    </TajwalBold>

                </TouchableOpacity> : <View />}

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.reportAProblemContainer}
                    onPress={() => props.navigation.navigate('ReportProblem', {
                        id
                    })}
                >

                    <Image
                        source={icons.warn}
                        resizeMode='contain'
                        style={{ marginTop: h(5) }}
                    />

                    <TajawalLight style={styles.reportAProblemText} >
                        {strings("ReportAProblem")}
                    </TajawalLight>
                </TouchableOpacity>

            </Row>

        </TouchableOpacity>
    )
}
export default Order
