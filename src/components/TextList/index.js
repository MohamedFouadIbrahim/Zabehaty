import React, { useEffect, useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { calcFont, h } from "../../mutils";
import { styles } from "./styles";

type Props = {
    title: String,
    canCompress: True | False,
    single: True | False,
    data: Array,
    onChange: Function,
}

export const TextList = (props: Props) => {
    const { canCompress, title, data = [], onChange = () => { }, single = false } = props

    const [compressCard, setCompressCard] = useState(canCompress ? true : false)
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
                    newSelectedItems.push(selectedItem)
            })
            setselectedItems(newSelectedItems)*/
			setselectedItems(prevState => prevState.filter( selectedItem => selectedItem !== item.id ))
			setSelectedItemsObj(prevState => prevState.filter( selectedItem => selectedItem.id !== item.id ))
        }
    }

    return (
        <>
            {title && <TouchableOpacity activeOpacity={0.8} onPress={() => canCompress && setCompressCard(!compressCard)}>
                <Text style={styles.quantity}>{title}</Text>
            </TouchableOpacity>}
            <View style={{ paddingVertical: !compressCard ? h(15) : 0 }}>
                {!compressCard && data.map((item, index) => {
                    return (
                        <TouchableOpacity style={styles.cardRow} onPress={() => selectedItems.includes(item.id) ? deleteItem(item) : addItem(item)}>
                            <Text style={selectedItems.includes(item.id) ? styles.cardTextActive : styles.cardText}>{item.value}</Text>
                            {selectedItems.includes(item.id) && <Image source={icons.rightCheck} style={styles.image} />}
                        </TouchableOpacity>
                    )

                })}
            </View>
        </>
    )
};
