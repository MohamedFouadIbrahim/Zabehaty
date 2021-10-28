import React, { useEffect, useState } from "react";
import { I18nManager, Image, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { icons } from "../../assets";
import { CartButton, TajwalBold, TajwalRegular } from '../../components';
import { strings } from "../../i18n";
import APIKit from "../../utils/APIKit";
import { styles } from './styles';

const rateImage = require('../../assets/rate.png')

const ShopRating = ({ route, navigation }) => {

    const {
        params: {
            shop: {
                id
            }
        }
    } = route

    const [rating, setRating] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [review, setReview] = useState("")

    const onSubmit = async () => {

        setIsLoading(true)
        const response = await APIKit.post(`shop/add-rate/${id}`, {
            shop_id: id,
            rating,
            comment: review
        })

        if (response.status == 200) {
            navigation.goBack()
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {

        APIKit.get(`shop/get-rating/${id}`).then(response => {
            if (response.status == 200) {
                setIsLoading(false)
                console.log('res', response.data.data)
            } else {
                setIsLoading(false)
            }
        })

    }, [])

    return (
        <SafeAreaView style={styles.container} >

            <ScrollView
                contentContainerStyle={styles.subContainer}
            >

                <View style={{ marginVertical: 20 }} >
                    <TajwalBold style={[styles.textColor, { fontSize: 25 }]} >
                        {strings("Rating & review shop")}
                    </TajwalBold>


                    <TajwalRegular style={styles.textColor} >
                        {strings("RatingShopText")}
                    </TajwalRegular>

                </View>

                <View style={styles.logoContainer} >
                    <Image source={icons.logo} resizeMode='center' />
                    <TajwalRegular style={{ marginTop: 10, }} >
                        {'Zabehaty'}
                    </TajwalRegular>
                </View>


                <AirbnbRating
                    ratingCount={5}
                    starImage={rateImage}
                    onFinishRating={(r) => { setRating(r) }}
                    showRating={false}
                    starContainerStyle={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}
                    unSelectedColor='#c7c7c7'
                    selectedColor={'#16572C'}
                    defaultRating={0}
                    ratingContainerStyle={{ marginVertical: 20 }}
                />

                <TextInput
                    placeholder={strings("Special review")}
                    style={styles.textInput}
                    multiline
                    numberOfLines={5}
                    value={review}
                    onChangeText={(text) => setReview(text)}
                />

                <CartButton
                    text={strings("Submit")}
                    style={{ borderRadius: 5 }}
                    onPress={() => { onSubmit() }}
                    isLoading={isLoading}
                />


            </ScrollView>

        </SafeAreaView>
    )
}

export { ShopRating };
