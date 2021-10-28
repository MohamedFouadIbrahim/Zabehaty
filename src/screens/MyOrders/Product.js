import React from 'react';
import { Image } from 'react-native';
import { Row, TajwalBold } from '../../components';
import { styles } from './styles';


const Product = ({ product }) => {

    const {
        image,
        name
    } = product

    return (
        <Row style={styles.productRowContainer} >

            <Image
                source={{ uri: image }}
                style={styles.productRowImage}
            />

            <TajwalBold style={styles.productRowText} >
                {name}
            </TajwalBold>

        </Row>
    )

}

export default Product