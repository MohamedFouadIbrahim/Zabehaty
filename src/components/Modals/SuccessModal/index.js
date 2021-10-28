import React, { useEffect, useState } from "react";
import { Image, Text, View, TextInput, TouchableOpacity } from "react-native";
import { icons } from "../../../assets";
import { strings } from "../../../i18n";
import { styles } from "./styles";
import Modal from 'react-native-modal';
import { h, w } from "../../../mutils";
import { myColors } from "../../../styles";

type Props = {
  title: String,
  description: String,
  rightTitle: String,
  leftTitle: String,
  rightAction: Function,
  leftAction: Function,
  isVisible: True | False,
  onClose: Function
}

export const SuccessModal = (props: Props) => {
  const { isVisible, title, description, leftTitle, rightTitle, rightAction = () => { }, leftAction = () => { }, onClose = () => { } } = props

  // const [compressCard, setCompressCard] = useState(canCompress ? true : false)



  return (
    <Modal isVisible={isVisible} style={{ alignSelf: 'center', borderRadius: 5, padding: 5 }}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <View style={styles.modalContainer}>
        <Image source={icons.logo} style={{ alignSelf: 'center', marginVertical: h(20) ,width:w(80),height:h(80),resizeMode:'contain'}} />

        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <View style={styles.buttonsContainer}>
          {leftTitle && <TouchableOpacity style={[styles.button, {}]} onPress={leftAction}>
            <Text style={[styles.buttonText, { color: myColors.green3 }]}>{leftTitle}</Text>
          </TouchableOpacity>}
          {rightTitle && <TouchableOpacity style={[styles.button, { backgroundColor: myColors.green3 }]} onPress={rightAction}>
            <Text style={[styles.buttonText, { color: 'white' }]}>{rightTitle}</Text>
          </TouchableOpacity>}
        </View>

      </View>



    </Modal>
  )
};
