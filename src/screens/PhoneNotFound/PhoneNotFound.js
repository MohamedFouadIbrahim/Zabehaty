import React from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import {  InputField } from "../../components";
import { styles } from "./styles";
import { icons } from "../../assets";
import { PhoneNumberInput } from "../../components";
import { useNavigation } from "@react-navigation/core";
const PhoneNotFound = () => {
  const { navigate } = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.passwordsTexts}>
        <Text style={styles.forgetText}>لايوجد رقم هاتف لهذا لحساب</Text>
        <Text style={styles.repeateText}>أدخل رقم الهاتف</Text>
      </View>
      <PhoneNumberInput />
      <View style={styles.response}>
        <Text style={styles.responseChoiceText}>
          أو قم بالإجابة على السؤال السرى{" "}
        </Text>
        <Text style={styles.responseChoiceText}>الذى قمت بإنشائه مع حسابك</Text>
      </View>
      <View style={styles.preferableColor}>
        <Text style={styles.prefereColorText}>ماهو لونك المفضل؟</Text>
      </View>
      <View style={styles.all}>
        <View style={styles.responseContainer}>
          <InputField
            placeholder="الإجابة"
            placeholderTextColor="grey"
            style={styles.responseInputStyle}
          />
          <TouchableOpacity
          activeOpacity={0.4}
            onPress={() => {
              navigate("VerificationCode");
            }}
          >
            <Image source={icons.transform} style={styles.transformImgStyle} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export { PhoneNotFound };
