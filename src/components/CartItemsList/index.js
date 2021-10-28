
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { strings } from '../../i18n';
import { myColors } from '../../styles/myColors';
import { AddressHeader } from '../AddressHeader';
import { SegoeUIItalic, SegoeUIRegular, SegoeUISemibold,TajwalRegular,TajwalBold } from '../FontedText';
import { Line } from '../Line';
import { Row } from '../Row';
import { styles } from './styles';

export const CartItemsList = (props) => {

    const {
        address: {
            country,
            governorate,
            city
        },
        data,
        onAddToCart,
        onRemoveFromCart,
        onDelete,
        ...restProps
    } = props

    const AddToCart = ({ quantityType, quantity, onMinusPressed, onPlusPressed }) => (

        <Row style={styles.addToCartRow} >
            <TouchableOpacity
                style={styles.QuantityButtons}
                onPress={() => { onMinusPressed() }}
            >
                <AntDesign color={myColors.gray4} name='minus' size={20} />
            </TouchableOpacity>

            <TajwalBold style={styles.TextQuantity} >
                {`${quantity}  ${quantityType}`}
            </TajwalBold>

            <TouchableOpacity
                style={styles.QuantityButtons}
                onPress={() => { onPlusPressed() }}
            >
                <AntDesign color={myColors.gray4} name='plus' size={20} />
            </TouchableOpacity>
        </Row>

    )

    const renderCartItem = ({ item, index }) => {

        const {
            id,
            img,
            title,
            price,
            currency,
            deliveryType,
            quantityType,
            quantity
        } = item

        return (

            <Row style={styles.container} >

                <View>
                    <Row>

                        <FastImage
                            source={{ uri: img }}
                            style={styles.productImage}
                        />

                        <View style={styles.textsContainer} >
                            <TajwalRegular style={styles.TextTitle} >
                                {title}
                            </TajwalRegular>

                            <TajwalRegular style={styles.TextPrice}>
                                {`${currency} ${price}`}
                            </TajwalRegular>

                            <TajwalRegular style={styles.TextdeliveryType} >
                                {deliveryType}
                            </TajwalRegular>


                        </View>
                    </Row>


                    <TouchableOpacity
                        style={styles.DeleteButton}
                        onPress={() => { onDelete(item) }}
                    >
                        <Text style={styles.DeleteText} >
                            {strings('Delete')}
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.addToCartRowContainer} >
                    <AddToCart
                        quantityType={quantityType}
                        quantity={quantity}
                        onMinusPressed={() => { onRemoveFromCart(item) }}
                        onPlusPressed={() => onAddToCart(item)}
                    />
                </View>

            </Row>
        )
    }

    const renderListHeader = () => (
        <AddressHeader
            city={city}
            country={country}
            governorate={governorate}
        />
    )

    return (
        <FlatList
            ListHeaderComponent={renderListHeader}
            data={data}
            renderItem={renderCartItem}
            ListHeaderComponentStyle={styles.ListHeaderComponentStyle}
            ItemSeparatorComponent={() => <Line style={styles.line} />}
            {...restProps}
        />
    )

}