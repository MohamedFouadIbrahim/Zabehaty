import React, { useEffect, useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { calcFont, h } from "../../mutils";
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/Entypo';
import { myColors } from "../../styles/myColors";
import CheckBox from "../CheckBox"
import { color } from "react-native-elements/dist/helpers";
type Props = {
    title: String,
    canCompress: True | False,
    single: True | False,
    data: Array,
    onChange: Function,
    image: String,
}

export const OptionsWithQuantity = (props: Props) => {
    const { canCompress, title, data = [], onChange = () => { }, single = false, image, details } = props

    const [compressCard, setCompressCard] = useState(canCompress ? true : false)
    const [selectedItems, setselectedItems] = useState([])
    const [selectedItemsObj, setSelectedItemsObj] = useState([])
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        onChange(selectedItemsObj)
    }, [selectedItemsObj])



    return (
        <>
            {title && <TouchableOpacity activeOpacity={0.8} onPress={() => canCompress && setCompressCard(!compressCard)}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>}
            <View >
                {!compressCard && data.map((item, index) => {
                    return (
                        <>
                            <View style={{ borderBottomWidth:0.5, borderColor: myColors.gray10, paddingVertical: 15 }}>
                                <Text style={[styles.titleText, { marginHorizontal: 20, marginTop: 3 }]}>{item.value}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 10, alignItems: 'center' }}>
                                    <Image source={item.image} style={styles.image} />
                                    <View>
                                        <Text style={styles.titleText}>{item.value2}</Text>
                                        <Text style={styles.details}>{item.details}</Text>
                                        {item.add ?
                                            <>
                                                <TouchableOpacity style={styles.greenContainer}>
                                                    <Text style={[styles.titleText, { color: myColors.green3 }]}>{strings('ADD')}</Text>

                                                </TouchableOpacity>
                                                <Text style={[styles.details, { color: "#D69676" }]}>{item.deliveryHours} {strings('hours delivery available')}</Text>
                                            </>
                                            : <View style={styles.addReduceContainer}>
                                                <Text style={[styles.details, { marginHorizontal: 5 }]}>Net wt.</Text>
                                                <TouchableOpacity style={styles.addContainer} onPress={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}>
                                                    <Icon
                                                        name={'minus'}
                                                        color={myColors.black}
                                                        size={15}
                                                        style={{ marginTop: 1 }}
                                                    />
                                                </TouchableOpacity>

                                                <Text style={styles.quantityNum}>{quantity}kg</Text>
                                                <TouchableOpacity style={styles.addContainer} onPress={() => setQuantity(quantity + 1)}>
                                                    <Icon
                                                        name={'plus'}
                                                        color={myColors.black}
                                                        size={15}
                                                        style={{ marginTop: 1 }}
                                                    />
                                                </TouchableOpacity>
                                            </View>}

                                    </View>
                                </View>
                            </View>
                        </>
                    )

                })}
            </View>
        </>
    )
};
