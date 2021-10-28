import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { h, w } from '../../mutils';
import { myColors } from '../../styles';

export default CheckCircle = (props) => {

    const {
        checked,
        size = 10,
        color = myColors.green3,
        style,
        ...restProps
    } = props

    const distnation = size / 2;

    return (
        <TouchableOpacity
            style={[{
                borderRadius: size + distnation,
                padding: distnation,
                borderColor: myColors.gary0,
                borderWidth: 2
            }, style]}
            disabled
            {...restProps}
        >
            <View
                style={{
                    backgroundColor: checked == true ? color : 'transparent',
                    width: w(size),
                    height: h(size),
                    borderRadius: size - distnation
                }}
            />
        </TouchableOpacity>
    )
}