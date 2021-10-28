import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import { Row, TajwalMedium } from '../../components';
import { strings } from '../../i18n';
import { h } from '../../mutils';
import { styles } from './styles';


export const    CheckoutItem = (props) => {

    const {
        deliveryDescription,
        dateTime,
        onAddTocart,
        onRemoveFromCart,
        onDeleteProduct,
        cartItems = [],
        ...restProps
    } = props

    /**
     *
     * @returns
     * delivery: 0
    department: {id: 2, name: "الاضاحي"}
    details: [
        category: {id: 13, name: "خروف"}
    id: 2
    product: {
        badges: []
    description: null
    id: 251
    image: "https://v3.zabe7ti.website/public/uploads/c1c92fdcd53c6e92104aceb462bb6796.jpg"
    menu_id: null
    name: "NUAIMI Sheep"
    price: "900.00"
    }
    quantity: "0.25"
    ]
    discount: 5
    discount_total: 11.25
    id: 7
    shop: null
    subtotal: 225
    tax: 11.25
    total: 225
     */

    const DeliveryHeader = () => (
        <View>
			{
				(dateTime !== "" &&
					<React.Fragment>
						<Row style={styles.deliveryHeaderContainer}>
							<Text style={styles.deliveryDescriptionText} >
								{deliveryDescription}
							</Text>

							<Text style={styles.dateTimeText} >
								{dateTime}
							</Text>
						</Row>
						<View style={styles.deliveryHeaderSeprator} />
					</React.Fragment>
				)
			}
        </View>
    )

    // const AddToCart = (item) => (

    //     <Row style={styles.addToCartContainer} >

    //         <TouchableOpacity onPress={() => onRemoveFromCart(item)} >
    //             <Image source={icons.minus} resizeMode='contain' style={{ tintColor: '#565656' }} />
    //         </TouchableOpacity>

    //         <Text style={styles.quatityText} >
    //             {item.quatity}
    //         </Text>

    //         <TouchableOpacity onPress={() => onAddTocart(item)} >
    //             <Image source={icons.plus} resizeMode='contain' style={{ tintColor: '#565656' }} />
    //         </TouchableOpacity>

    //     </Row>
    // )

    const renderProduct = (({ item, idex }) => {
        const {
			quantity,
			attributes,
            product: {
                name,
                price,
                image
            }
        } = item

        return (
            <Row style={styles.productContainer}>
				 <Image
					source={{ uri: image }}
					style={styles.productImage}
				/>

				<View style={styles.productTextContainer} >
					<Text style={styles.productNameText} >
						{name}
					</Text>
					{
						(attributes) ?
							<Text style={styles.productDescriptionText} numberOfLines={ 3 } >
								{attributes}
							</Text>
							:
							null
					}
					<Text style={styles.productPriceText} >
						{price} {strings('AED')}
					</Text>
					<View style={styles.productQtyContainer}>
						<Text style={styles.qtyText}>{ strings("Qty") }: {quantity}</Text>
					</View>
				</View>
            </Row>
        )
    })

    return (
        <FlatList
            ListHeaderComponent={() => {
				return (
					<React.Fragment>
						<DeliveryHeader />
						<Row style={styles.departmentHeaderContainer}>
							<MaterialIcons name='storefront' size={25} />
							<TajwalMedium style={styles.yourCart} >
								{ cartItems.department.name } - { cartItems?.shop ? cartItems?.shop.name : strings("Zabehaty")} {/*cartItem?.department?.name*/}
							</TajwalMedium>
						</Row>
					</React.Fragment>
				)
			}}
            data={cartItems?.details}
            renderItem={renderProduct}
            {...restProps}
        />
    )
}
