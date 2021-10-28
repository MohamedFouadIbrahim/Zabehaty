import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native';
import { Row, TajwalBold, TajwalRegular } from '../index';
import { styles } from "./styles";
import { strings } from '../../i18n';
import { TajwalMedium } from '../FontedText';

const OrderSummary = (props) => {

    const {
        id,
        orderDate,
        Total,
        created_at,
        payment_method,
        deliveryDate,
        subtotal,
        tax,
        delivery,
        address,
        shop,
        time,
        department
    } = props

    const localOrderDate = new Date(created_at.replace(' ', 'T'))

    const [isExpanded, setIsExpanded] = useState(false)

    const renderBillingDetails = () => {
        return (
            <View>

                <TajwalBold style={styles.billingDetailsText} >
                    {strings("BillingDetails")}
                </TajwalBold>

                <View style={styles.billingDetailsContainer} >

                    <Row style={styles.specialRow} >
                        <TajwalMedium style={styles.subTotalText} >
                            {strings("SubTotal")}
                        </TajwalMedium>

                        <TajwalMedium style={styles.subTotalValue} >
                            {subtotal}
                        </TajwalMedium>
                    </Row>

                    <Row style={styles.specialRow} >
                        <TajwalMedium style={styles.taxText} >
                            {strings("Tax")}
                        </TajwalMedium>

                        <TajwalMedium style={styles.taxValue} >
                            {tax}
                        </TajwalMedium>
                    </Row>

                    <Row style={styles.specialRow} >
                        <TajwalMedium style={styles.taxText} >
                            {strings("DeliveryCharge")}
                        </TajwalMedium>

                        <TajwalMedium style={styles.taxValue} >
                            { (delivery === 0) ? delivery : strings("Free") }
                        </TajwalMedium>
                    </Row>

                </View>
            </View>
        )
    }

    const renderOrderDetails = () => {
        return (
            <View  >

                <TajwalBold style={styles.billingDetailsText} >
                    {strings("OrderDetails")}
                </TajwalBold>

                <View style={styles.billingDetailsContainer} >

                    <Row style={styles.specialRow} >
                        <TajwalMedium style={styles.subTotalText} >
                            {strings("OrderNumber")}
                        </TajwalMedium>

                        <TajwalMedium style={styles.subTotalValue} >
                            {id}
                        </TajwalMedium>
                    </Row>

                    <Row style={styles.specialRow} >
                        <TajwalMedium style={styles.taxText} >
                            {strings("Placed Date")}
                        </TajwalMedium>

                        <TajwalMedium style={styles.taxValue} >
                            {localOrderDate.toLocaleDateString()}
                        </TajwalMedium>
                    </Row>

                    <Row style={styles.specialRow} >
                        <TajwalMedium style={styles.taxText} >
                            {strings("Order Time")}
                        </TajwalMedium>

                        <TajwalMedium style={styles.taxValue} >
                            {localOrderDate.toLocaleTimeString()}
                        </TajwalMedium>
                    </Row>

                    <Row style={styles.specialRow} >
                        <TajwalMedium style={styles.taxText} >
                            {strings("Delivery Time")}
                        </TajwalMedium>

                        <TajwalMedium style={styles.taxValue} >
                            {`${time?.from} - ${time?.to}`}
                        </TajwalMedium>
                    </Row>

                    <Row style={styles.specialRow} >
                        <TajwalMedium style={styles.taxText} >
                            {strings("Shop")}
                        </TajwalMedium>

                        <TajwalMedium style={styles.taxValue} >
                            {shop?.name ? shop?.name : strings("Zabehaty")}
                        </TajwalMedium>
                    </Row>

                    <Row style={styles.specialRow} >
                        <TajwalMedium style={styles.taxText} >
                            {strings("department")}
                        </TajwalMedium>

                        <TajwalMedium style={styles.taxValue} >
                            {department?.name}
                        </TajwalMedium>
                    </Row>

                    <Row style={styles.specialRow} >
                        <TajwalMedium style={styles.taxText} >
                            {strings("Payment Mode")}
                        </TajwalMedium>

                        <TajwalMedium style={styles.taxValue} >
                            {payment_method == 1 ? strings("CashonDelivery") : strings("OnlinePayment")}
                        </TajwalMedium>
                    </Row>

                    <View style={{ alignItems: 'flex-start' }}>
                        <TajwalMedium style={styles.taxText} >
                            {strings("Delivery Address")}
                        </TajwalMedium>

                        <TajwalMedium style={[styles.addressValue, { lineHeight: 22 }]} >
                            {`${address?.address} \n${address?.region?.branch?.name} - ${address?.region?.name} , ${address?.apartment_num} ${address?.street_name}`}
                        </TajwalMedium>
                    </View>
                </View>
            </View>
        )
    }
    const renderTotalPaid = () => (
        <Row style={styles.totalPaidContainer} >
            <TajwalBold style={styles.totalPaidText} >
                {strings("TotalPaid")}
            </TajwalBold>

            <TajwalMedium style={styles.totalPaidValue} >
                {Total} {strings("AED")}
            </TajwalMedium>
        </Row>
    )

    const renderFooter = () => (
        <TajwalBold
            style={styles.buttomText}
        >
            {strings("Yourorderwillbedeliveredon")} {deliveryDate} {strings("Youwillreceiveanorderconfirmationemailssms")}
        </TajwalBold>
    )

    return (
        <View style={styles.orderDetailsContainer}>

            <Row style={styles.orderTextContainer} >
                <TajwalRegular style={styles.orderText}  >
                    {strings("Order")}
                </TajwalRegular>

                <TajwalBold style={styles.orderTextValue} >
                    {`#${id}`}
                </TajwalBold>
            </Row>

            <Row style={styles.orderTextContainer} >
                <TajwalRegular style={styles.orderText} >
                    {strings("PlacedAt")}
                </TajwalRegular>

                <TajwalBold style={styles.orderTextValue} >
                    {orderDate}
                </TajwalBold>
            </Row>

            <Row>
                <TouchableOpacity onPress={() => { setIsExpanded((prev) => !prev) }} >
                    <TajwalBold style={styles.orderSummaryText} >
                        {!isExpanded ? strings("ViewOrderSumary") : strings("HideOrderSumary")}
                    </TajwalBold>
                </TouchableOpacity>
            </Row>

            {isExpanded && renderBillingDetails()}
            {isExpanded && renderTotalPaid()}
            {isExpanded && renderOrderDetails()}
            {isExpanded && renderFooter()}
        </View>
    )
}

export default OrderSummary
