import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { I18nManager } from 'react-native';
import { useSelector } from 'react-redux';
import I18n from '../i18n';
import APIKit, { setAppLanguage, setClientToken } from '../utils/APIKit';
import ASYNC_STORAGE_KEYS from "../utils/AsyncStorageKeys";
import MainApplication from "./Drawer";
import { AuthStack, LanguageStack } from "./Stacks";

const Root = () => {

  const userData = useSelector(state => state.session.user)
  const skipAuth = useSelector(state => state.skipAuth.skipAuth)
  const [isSelectLang, setIsSelectLang] = useState(true)
    
  useEffect(() => {
    checkLanguage()
  }, [])


  const checkLanguage = async () => {
    try {
      const selectedLanguage = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.SelectedLanguage)
      if (selectedLanguage) {
        setAppLanguage(selectedLanguage)
        I18n.locale = selectedLanguage
        if (selectedLanguage === "ar") {
          I18nManager.forceRTL(true)
          I18nManager.allowRTL(true)
        } else {
          I18nManager.forceRTL(false)
          I18nManager.allowRTL(false)
        }
        fetchSettings()
        fetchAuthQuestions()
        checkLoggedInUser()
      } else {
        setIsSelectLang(false)
        // navigation.navigate("ChooseLanguage")
      }
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  const fetchSettings = async () => {
    const response = await APIKit.get('settings')

    console.log(response)
    if (response.data.status === 200) {
      const data = response.data.data

      try {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AuthBanners, JSON.stringify(data.banners))
      } catch (e) {
        // saving error
        console.log(e)
      }
    }
  }

  const fetchAuthQuestions = async () => {
    const response = await APIKit.get('user/security_questions')

    console.log(response)
    if (response.data.status === 200) {
      const data = response.data.data

      try {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AuthQuestions, JSON.stringify(data))
      } catch (e) {
        // saving error
        console.log(e)
      }
    }
  }

  const checkLoggedInUser = async () => {
    if (userData?.token) {
      setClientToken(userData?.token)
    }
  }

  if (skipAuth || userData?.id) {
    return <MainApplication />
  } else if (isSelectLang) {
    return <AuthStack />
  } else {
    return <LanguageStack />
  }

}

export default Root