import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Row } from '../../components';
import { strings } from '../../i18n';
import { getAvailablePromocodes } from '../../services/Checkout';
import { myColors } from '../../styles';
import { showToast } from '../../utils';
import { styles } from './styles';
const ApplyCoupon = (props) => {

    const [coupons, setCoupons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [writedCoupon, setWritedCoupon] = useState("")

    useEffect(() => {
        getAvailablePromocodes({ cart_id: props?.route?.params?.cartId }, ({ data }) => {
            setCoupons(data);
            setIsLoading(false)
        }, err => {
            setIsLoading(false)
        })

    }, [])

    const renderHeader = () => (
        <Text style={styles.headerText} >
            {strings("AVAILABECOUPONS")}
        </Text>
    )

    const onAplly = (coupon) => {

        if(!coupon?.code && !writedCoupon ) {
            showToast("Please Select Or Add a Coupon")
            return
        }

        if (coupon?.code) {
            props?.route?.params?.onApplyCoupon && props?.route?.params?.onApplyCoupon(coupon?.code)
        }  
        if (writedCoupon) {
            props?.route?.params?.onApplyCoupon && props?.route?.params?.onApplyCoupon(writedCoupon)
        }

        props.navigation.goBack()

    }

    const renderCoupon = ({ item, index }) => {
        return (
            <View style={styles.couponContainer} >
                <Row style={styles.couponRowContainer} >

                    <View style={styles.couponTextContainer} >
                        <Text style={styles.couponText} >
                            {item.code}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={() => onAplly(item)} >
                        <Text style={styles.applyText} >
                            {strings("APPLY")}
                        </Text>
                    </TouchableOpacity>
                </Row>

                <Text style={styles.descretionText} >
                    {`${strings("saveValue")} ${item?.percentage ? `${item?.percentage} %` : `${item.value} ${strings("AED")}`} `}
                </Text>
            </View>
        )
    }

    if (isLoading) {
        return (<Spinner
            visible={true}
            size='large'
            color={myColors.green3}
        />)
    }
    return (
        <SafeAreaView style={styles.container} >

            <View style={styles.subContainer} >

                <Row style={styles.applyCouponContainer}>

                    <TextInput
                        placeholder={strings("ENTERCOUPONCODE")}
                        placeholderTextColor={myColors.blue6}
                        style={styles.textInput}
                        onChangeText={(text) => {setWritedCoupon(text)}}
                        value={writedCoupon}
                    />

                    <TouchableOpacity onPress={() => onAplly(writedCoupon)} >
                        <Text style={styles.apply2Text} >
                            {strings("APPLY")}
                        </Text>
                    </TouchableOpacity>
                </Row>

            </View>

            <FlatList
                ListHeaderComponent={renderHeader}
                data={coupons}
                renderItem={renderCoupon}
                keyExtractor={(item, index) => String(item.id)}
                contentContainerStyle={styles.contentContainerStyle}
            />
        </SafeAreaView>
    )

}

export { ApplyCoupon };

