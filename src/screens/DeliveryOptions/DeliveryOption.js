import React from 'react';
import { Image, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { myfonts, } from '../../../assets';
import { Row } from '../..//components';
import { icons } from '../../assets';
import { h } from '../../mutils';
import { myColors } from '../../styles';
import { styles } from './styles';

import { strings } from '../../i18n';
import { convertTimeTo12 } from '../../utils/DateTime';

const DeliveryOption = ({ deliveryOption, selectedOption, onChageOption, navigation, onSelectTime, selectedTime, selectedDateOrDay, onChangeEidDay, selectedEidDay }) => {

    const {
        id,
        name,
        description,
        shippingMethods,
        note,
    } = deliveryOption


    const isSelected = id == selectedOption.id;
    const EidDays = [{ name: strings('firstDay'), id: 1 }, { name: strings('secoundDay'), id: 2 }, { name: strings('thirdDay'), id: 3 }, { name: strings('fourthDay'), id: 4 }]
    return (
        <View>
            { /*<TouchableOpacity
                activeOpacity={1}
                onPress={() => { onChageOption && onChageOption(deliveryOption) }}
                style={styles.deleviryOptionContainer}
            >
                <Image source={isSelected ? icons.selectedCircle : icons.unSelectedCircle} />
                <View>
                    <Row style={{ alignItems: 'center' }} >
                        <Text style={styles.optionNameText} >
                            {name}
                        </Text>
                        <Text style={styles.optionDecriptionText} >
                            {description}
                        </Text>
                    </Row>
                </View>
			</TouchableOpacity>*/ }

            {note && isSelected && <Text style={styles.noteText} >{note}</Text>}
            {isSelected && <>
                {id == 2 ?
                    <FlatList
                        horizontal
                        contentContainerStyle={{
                            alignSelf: "flex-start",
                        }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={true}
                        data={EidDays}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={[styles.eidContainer, selectedEidDay == item.id ? { backgroundColor: myColors.yellow1 } : {}]}
                                onPress={() => onChangeEidDay(item.id)}>
                                <Text style={styles.eidText}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index + ""}
                    />
                    :
                    <TouchableOpacity
                        onPress={() => isSelected && onSelectTime && onSelectTime()}
                        activeOpacity={1}
                    >
                        <Row
                            style={[styles.timesContainer, !note ? { marginTop: h(10) } : {}]}>
                            <Text style={{ fontSize: 16, color: myColors.blackGray, fontFamily: myfonts.TajwalMedium }} >
                                {selectedDateOrDay.title}
                            </Text>
                            <Image source={icons.ArrowDown} resizeMode='contain' />
                        </Row>
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    onPress={() => isSelected && onSelectTime && onSelectTime()}
                    activeOpacity={1}
                >
                    <Row
                        style={[styles.timesContainer, !note ? { marginTop: h(10) } : {}]}>
                        <Text style={{ fontSize: 16, color: myColors.blackGray, fontFamily: myfonts.TajwalMedium }} >
                            {selectedTime?.from ? `${strings('fromTime')} ${selectedTime.from} ${strings('to')} ${selectedTime.to}` : null}
							{ /*selectedTime?.from ? `${convertTimeTo12(String(selectedTime.from))} ${strings('to')} ${convertTimeTo12(String(selectedTime.to))}` : null */ }
                        </Text>
                        <Image source={icons.ArrowDown} resizeMode='contain' />
                    </Row>
                </TouchableOpacity>
            </>
            }

            {/* {isSelected && <TouchableOpacity
                style={styles.viewItemsButton}
            >

                <Text style={styles.viewItemsText} >
                    {`View ${selectedOption.items} item`}
                </Text>

            </TouchableOpacity>} */}
        </View>


    )
}
export default DeliveryOption
