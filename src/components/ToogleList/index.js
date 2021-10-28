import React, { useEffect, useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { calcFont, h } from "../../mutils";
import { styles } from "./styles";
import ToggleSwitch from 'toggle-switch-react-native'
import { myColors } from "../../styles";
type Props = {
    title: String,
    canCompress: True | False,
    data: Array,
    onChange: Function,
}

export const ToogleList = (props: Props) => {
    const { canCompress, title, data = [], onChange = () => { } } = props

    const [compressCard, setCompressCard] = useState(canCompress?true:false)
    const [selectedItems, setselectedItems] = useState([])

	useEffect(() => {
		onChange(selectedItems)
	}, [selectedItems])

    const addItem = (id) => {
        setselectedItems([...selectedItems, id])
    }
    const deleteItem = (id) => {
        setselectedItems(prevState => prevState.filter( selectedItem => selectedItem !== id ))
        onChange(selectedItems)
    }

    return (
        <>
            {title&&<TouchableOpacity activeOpacity={0.8} onPress={() => canCompress && setCompressCard(!compressCard)}>
                <Text style={styles.quantity}>{title}</Text>
            </TouchableOpacity>}
            <View style={{ paddingVertical: !compressCard ? h(15) : 0 }}>
            {!compressCard && data.map((item, index) => {
                return (
                    <View key={ index } style={styles.cardRow} >
                        <Text style={selectedItems.includes(item.id) ? styles.cardTextActive : styles.cardText}>{item.value}</Text>
                        <ToggleSwitch
                            isOn={selectedItems.includes(item.id)}
                            onColor={myColors.green3}
                            offColor={myColors.blackGray2}
                            // label={item.title}
                            labelStyle={{ color: "black", fontWeight: "900" }}
                            size="medium"
                            onToggle={isOn => selectedItems.includes(item.id) ? deleteItem(item.id) : addItem(item.id)}
                        />
                    </View>
                )

            })}
</View>


        </>
    )
};
