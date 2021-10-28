import React, { useState } from "react";
import { styles } from "./styles";
import { Text, View, TouchableOpacity, ScrollView,Image,ImageBackground } from "react-native";
import FastImage from "react-native-fast-image";
import { icons } from "../../assets";
import { myColors } from "../../styles";
import { useNavigation } from "@react-navigation/core";

// Helpers
import { strings } from "../../i18n";

const Step1 = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground source={icons.onBoard1} style={styles.cowbgImg}>
        <View style={styles.LogoContainer}>
        <Image source={icons.greenlogo} style={styles.logoImg} />
        </View>
        <View style={styles.textsStyle}>
          <Text style={styles.welcomeText}>
            {strings("Welcome to Zabehaty")}
          </Text>
          <Text style={[styles.newVersionText, styles.samStyle]}>
            {strings(
              "The new version is the first application to buy the finest livestock and fresh meat"
            )}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export { Step1 };
