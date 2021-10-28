
import React, { useState } from 'react';
import { I18nManager, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Row } from '../../components';
import { TajwalBold, TajwalRegular } from '../../components/FontedText';
import { strings } from '../../i18n';
import { myColors } from '../../styles/myColors';
import { styles } from './styles';


const ProductDetails = (props) => {

	const {
		id,
		image,
		name,
		price,
		attributes,
		currency = strings("AED"),
		description,
		quantity,
		onAddToCart,
		onRemoveFromCart,
		onDelete,
		quantity_settings: {
			min,
			step
		},
		productId
	} = props


	const [localQuantity, setLocalQuantity] = useState(Number.parseFloat(quantity))


	const product = {
		id: productId,
		image,
		name,
		price,
		description
	}


	return (
		<Row style={styles.container} >
			<View>
				<Row>
					<FastImage
						source={{ uri: image }}
						style={styles.productImage}
					/>
					<View style={styles.textsContainer} >
						<TajwalRegular style={styles.TextTitle} >
							{name}
						</TajwalRegular>
						<TajwalRegular style={styles.TextDescription}>
							{attributes}
						</TajwalRegular>
					</View>
				</Row>

			</View>

			<View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={styles.DeleteButton}
					onPress={() => {
						onDelete({
							...product,
							quantity: localQuantity
						})
					}}
				>
					<TajwalRegular style={styles.DeleteText} >
						{strings('Delete')}
					</TajwalRegular>
				</TouchableOpacity>

				<View style={styles.addToCartRowContainer} >
					<TajwalBold style={styles.TextPrice}>
						{`${price} ${currency}`}
					</TajwalBold>
					<Row style={[styles.addToCartRow, (I18nManager.isRTL) ? { flexDirection: 'row-reverse' } : {}]}>

						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.QuantityButtons}
							onPress={() => {

								if (localQuantity > Number(min)) {
									const currentQuantity = localQuantity - Number.parseFloat(step)
									onRemoveFromCart({
										...product,
										quantity: currentQuantity
									})
									setLocalQuantity(currentQuantity)
								}

							}}
						>
							<AntDesign color={myColors.gray4} name='minus' size={20} />
						</TouchableOpacity>

						<TajwalBold style={styles.TextQuantity} >
							{`${localQuantity}`}
						</TajwalBold>

						<TouchableOpacity
							activeOpacity={0.8}
							style={styles.QuantityButtons}
							onPress={() => {

								const currentQuantity = localQuantity + Number.parseFloat(step)

								onAddToCart({
									...product,
									quantity: currentQuantity
								})
								setLocalQuantity(currentQuantity)

							}}
						>
							<AntDesign color={myColors.gray4} name='plus' size={20} />
						</TouchableOpacity>
					</Row>
				</View>
			</View>
		</Row>
	)

}

export default ProductDetails
