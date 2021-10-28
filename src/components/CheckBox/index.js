import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { h, w } from '../../mutils';
import { myColors } from '../../styles';
import Entypo from 'react-native-vector-icons/Entypo';

export default CheckCircle = (props) => {

    const {
        checked,
        size = 10,
        color = myColors.green3,
        style,
        ChangeState=()=>{},
        ...restProps
    } = props

    const distnation = size / 2;

    return (
        <TouchableOpacity
            style={[{
                borderColor: checked ? myColors.green3 : myColors.gary0,
                borderWidth: 1.5,
                width: w(size-3),
                height: h(size),
                alignItems: 'center',
                borderRadius:5
            },style]}
            {...restProps}
            onPress={ChangeState}
        >
            {checked&&<Entypo
                name={"check"}
                color={myColors.green3}
                size={size-7}
            />}
        </TouchableOpacity>
    )
}