import React, { useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { calcFont, h } from "../../mutils";
import { styles } from "./styles";

type Props = {
    title: String,
    canCompress: True | False,
    data: Array,
    onChange: Function,
}

export const Selection = (props: Props) => {
    const { canCompress, title, data = [], onChange = () => { } } = props

    const [compressCard, setCompressCard] = useState(canCompress?true:false)
    const [selectedItem, setselectedItem] = useState([])
  

    return (
        <>
           {title&&<TouchableOpacity activeOpacity={0.8} onPress={() => canCompress && setCompressCard(!compressCard)}>
                <Text style={styles.quantity}>{title}</Text>
            </TouchableOpacity>}
            <View style={[styles.cardView,{ paddingVertical: !compressCard ? h(15) : 0 }]}>
                {!compressCard && data.map((item, index) => {
                    return (
                        <TouchableOpacity style={selectedItem==item.id ?styles.cardRowActive:styles.cardRow} onPress={() => setselectedItem(item.id)}>
                            <Text style={selectedItem==item.id ? styles.cardTextActive : styles.cardText}>{item.title}</Text>
                        </TouchableOpacity>
                    )

                })}
            </View>


        </>
    )
};
