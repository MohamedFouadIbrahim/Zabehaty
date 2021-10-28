import React, { useEffect, useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { calcFont, h } from "../../mutils";
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { myColors } from "../../styles/myColors";
import CheckBox from "../CheckBox"
type Props = {
    title: String,
    canCompress: True | False,
    single: True | False,
    data: Array,
    onChange: Function,
}

export const OptionList = (props: Props) => {
    const { canCompress, title, data = [], onChange = () => { }, single = false } = props

    const [compressCard, setCompressCard] = useState(canCompress?true:false)
    const [selectedItems, setselectedItems] = useState([])
	const [selectedItemsObj, setSelectedItemsObj] = useState([])

	useEffect(() => {
		onChange(selectedItemsObj)
	}, [selectedItemsObj])

    const addItem = (item) => {
        if (single) {
            setselectedItems([item.id])
			setSelectedItemsObj([item])
        } else {
            setselectedItems(prevState => [...prevState, item.id])
			setSelectedItemsObj(prevState => [ ...prevState, item ])
        }
    }
    const deleteItem = (item) => {
        if (single) {
            setselectedItems([])
			setSelectedItemsObj([])
        } else {
            /*let newSelectedItems = [];
            selectedItems.map(selectedItem => {
                if (selectedItem !== item.id)
                    newSelectedItems.push(item)
            })
            setselectedItems(newSelectedItems)*/
			setselectedItems(prevState => prevState.filter( selectedItem => selectedItem !== item.id ))
			setSelectedItemsObj(prevState => prevState.filter( selectedItem => selectedItem.id !== item.id ))
        }
    }

    return (
        <>
            {title&&<TouchableOpacity activeOpacity={0.8} onPress={() => canCompress && setCompressCard(!compressCard)}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>}
            <View style={{ paddingVertical: !compressCard ? h(15) : 0 }}>
                {!compressCard && data.map((item, index) => {
                    return (
                        <TouchableOpacity style={styles.cardRow} onPress={() => selectedItems.includes(item.id) ? deleteItem(item) : addItem(item)}>
                            <View style={{ flexDirection: 'row' }}>
                            <CheckBox style={{marginTop:2}} checked={selectedItems.includes(item.id)} size={22} ChangeState={() => selectedItems.includes(item.id) ? deleteItem(item) : addItem(item)} />
                                <Text  style={selectedItems.includes(item.id) ? styles.cardTextActive : styles.cardText}>{item.value}</Text>
                            </View>
                            <Text style={styles.price}>+{strings("AED")}{item.price}</Text>
                        </TouchableOpacity>
                    )

                })}
            </View>
        </>
    )
};
