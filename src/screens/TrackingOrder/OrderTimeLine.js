import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, I18nManager } from 'react-native';
import TimeLine from 'react-native-timeline-flatlist';
import { strings } from '../../i18n';
import { h, w } from '../../mutils';
import { myColors } from '../../styles';
import { Row, TajwalBold, TajwalRegular, TajwalBlack, RatingModal } from '../../components';
import call from 'react-native-phone-call';
import { styles } from './styles';
import { icons } from '../../assets';
import { rateOrder } from '../../services/Orders';
import { showToast } from '../../utils/Toast';

const OrderTimeLine = ({ status, orderId, deliveryDate, rating, navigation, address }) => {

    const [driverPhoneNumber, setDriverPhoneNumber] = useState("")
    /**
    * [{"action": null, "checked": 1, "id": 6, "status": "تم الطلب بنجاح"},
    * {"action": null, "checked": 0, "id": 1, "status": "قيد التنفيذ"},
    * {"action": null, "checked": 0, "id": 7, "mobile": "", "status": "تم تخصيص سائق"},
    * {"action": "call_driver", "checked": 0, "id": 2, "status": "في الطريق"},
    * {"action": "rate", "checked": 0, "id": 3, "status": "وصل"}]
    */

    /** With Image
     *  // switch (item.id) {
            //     case 1:
            //         statusImage = icons.orederProcessing
            //         break;
            //     case 2:
            //         statusImage = icons.orederProcessing
            //         break;
            //     case 3:
            //         statusImage = icons.orderDelivered
            //         break;
            //     case 6:
            //         statusImage = icons.orderConfirmed
            //         break;
            //     case 7:
            //         statusImage = icons.orderConfirmed
            //         break;
            //     default:
            //         break;
            // }
     */

    const [localStatus, setLocalStatus] = useState(status)

    const [isLoading, setIsLoading] = useState(true)

    const [isRatingVisibale, setIsRatingVisibale] = useState(false)

    useEffect(() => {
        console.log("Local Status")
        console.log(localStatus)
        status.forEach((state) => {
            if (state.mobile) {
                setDriverPhoneNumber(state.mobile)
            }
        })
        const statusWithImage = localStatus.map(item => ({
            ...item,
            image: icons.orderConfirmed,
            icon: <View style={[styles.dot, { backgroundColor: item.checked ? '#40AA54' : myColors.white }]} />,
            //action: item.id == 7 ? "ShowInMap" : item.action,
            // checked: 1
        }))

        setLocalStatus(statusWithImage)
        // console.log('statusWithImage', statusWithImage)
        setIsLoading(false)
    }, [])

    const handelButtonsText = (action) => {

        // return strings("ShowInMap")

        switch (action) {
            case "call_driver":
                return strings("ContactToDriver")
            case "rate":
                return strings("RateOrder")
            case "show_in_map":
                return strings("ShowInMap")
            default:
                return ""
        }
    }


    const renderImage = ({ image, checked }) => (
        <View style={{ width: w(40) }} >
            {checked ? <Image source={image} resizeMode='contain' /> : <View />}
        </View>
    )

    // const disable
    const renderDetails = ({ status, action, checked, mobile = "" }) => {
        return (
            <Row style={{ marginBottom: 20, justifyContent: 'space-between' }} >
                <TajwalBold style={{ color: 'black', textAlign: I18nManager.isRTL ? 'right' : 'left', maxWidth: w(120) }} >
                    {status}
                </TajwalBold>

                { (action) ?
				<TouchableOpacity
                    style={[styles.buttonContainer, { borderColor: checked ? myColors.green3 : 'transparent' }]}
                    disabled={!checked}
                    // disabled={(action == "rate" && !rating)}
                    onPress={() => {

                        if (action == 'call_driver') {
                            call({
                                number: driverPhoneNumber, // String value with the number to call mobile
                                prompt: false
                            })
                            return
                        }
                        if (action == "rate") {
                            console.log(rating)
                            if (rating == 0 || rating == null) {
                                setIsRatingVisibale(true)
                            } else {
                                showToast("Thank You! You're already rated this order")
                            }
                            return
                        }

                        if (action == "show_in_map") {
                            navigation.navigate('TrackingOrderMap', { orderId, address })
                            return
                        }

                        ////navigation.navigate('TrackingOrderMap')


                    }}
                >
                    <TajwalRegular style={[styles.buttonText, { color: checked ? myColors.green3 : "#DCDCDC" }]} >
                        {handelButtonsText(action)}
                    </TajwalRegular>

                </TouchableOpacity>
				:
				null
			}
            </Row>

        )
    }

    if (isLoading) {
        return null
    }

    return (
        <>
            <RatingModal
                isVisible={isRatingVisibale}
                hideModal={() => { setIsRatingVisibale(false) }}
                onCancel={() => { setIsRatingVisibale(false) }}
                onSubmit={(problem, rating, suggestions) => {

                    rateOrder({ order_id: orderId, rating, rating_suggestion: suggestions, rating_reason_id: problem?.id }, () => {
                        showToast("Your Rate Delivered to Us")
                    })

                }}
                orderId={orderId}
                delveryDate={deliveryDate}
                defaultRating={0}
            />

            <TimeLine
                data={localStatus}
                renderTime={renderImage}
                detailContainerStyle={{ paddingBottom: 10 }}
                renderDetail={renderDetails}
                renderFullLine
                innerCircle={'icon'}
                lineColor={'#40AA54'}
                circleColor={'#40AA54'}
                lineWidth={w(3)}
                style={{ marginHorizontal: w(30), }}
            />
        </>
    )
}

export default OrderTimeLine
