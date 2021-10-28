import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View, ActivityIndicator, I18nManager, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNRestart from 'react-native-restart';
import Modal from 'react-native-modal';

// Constants
import ASYNC_STORAGE_KEYS from "../../utils/AsyncStorageKeys"

// Helpers
import I18n, { strings } from '../../i18n';

import { icons } from '../../assets';
import { Row, TajwalBold, TajwalRegular, LoginButton } from '../../components';
import { getProfile } from '../../services/Profile';
import { myColors } from '../../styles';
import { styles } from './styles';

const MyAccount = ({ navigation }) => {

    const [myProfile, setMyProfile] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isChangeLang, setIsChangeLang] = useState(false)

    const isFocused = useIsFocused()

    useEffect(() => {
        // setIsLoading(true)
        getProfile((res) => {
            setMyProfile(res.data)
            setIsLoading(false)
        }, () => {
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        getProfile((res) => {
            setMyProfile(res.data)
        })
    }, [isFocused])

    const onLoginPress = () => {
        navigation.navigate('MyAuth', {
            screen: 'Login',
            params: {
                onFinishLogin: () => {
                    navigation.goBack()
                },
                onFinishRegist: () => {
                    navigation.goBack()
                },
                onFinishSkip: () => {
                    navigation.goBack()
                }
            }
        })
    }

    const changeLangAction = () => {
        return (
            <Modal
                isVisible={isChangeLang}
                style={{ flex: 1, justifyContent: 'center' }}
                onBackdropPress={() => { setIsChangeLang(false) }}
                onBackButtonPress={() => { setIsChangeLang(false) }}
            >
                <View style={styles.scollViewContainerView} >
                    <ScrollView
                        contentContainerStyle={styles.scollViewContaiser}
                    >
                        <TouchableOpacity
                            onPress={() => { onSelectLanguage("ar") }}
                            style={{ alignItems: 'flex-start' }}
                        >

                            <TajwalRegular style={{ marginVertical: 15 }} >
                                عربي
                            </TajwalRegular>

                            <View style={styles.oneTimeSeprator} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { onSelectLanguage("en") }}
                            style={{ alignItems: 'flex-start' }}
                        >

                            <TajwalRegular style={{ marginVertical: 15 }} >
                                English
                            </TajwalRegular>

                            <View style={styles.oneTimeSeprator} />
                        </TouchableOpacity>

                    </ScrollView>
                </View>

            </Modal>
        )

    }

    const onSelectLanguage = async (lang) => {
        let applyChanges = true
        if (lang === "ar" && I18nManager.isRTL) {
            applyChanges = false
        } else if (lang === "en" && !I18nManager.isRTL) {
            applyChanges = false
        }

        if (applyChanges) {
            try {
                await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.SelectedLanguage, lang);
                await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.PassSkip, '1');

            } catch (error) {
                console.log(error)
            }

            if (lang === "ar") {
                I18nManager.forceRTL(true)
                I18nManager.allowRTL(true)
            } else {
                I18nManager.forceRTL(false)
                I18nManager.allowRTL(false)
            }

            I18n.locale = lang
            RNRestart.Restart();
        } else {
            setIsChangeLang(false)
        }
    }


    if (isLoading) {
        return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} color={myColors.green3} size='large' />
    }

    return (
        <SafeAreaView style={[styles.container, { justifyContent: !myProfile?.first_name ? 'flex-end' : 'flex-start' }]}>


            {!myProfile?.first_name ? <LoginButton containerStyle={{ marginBottom: 10 }} onPress={() => { onLoginPress() }} /> :

                <View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate('UpdateAccount', { myProfile })
                        }}
                    >

                        <View style={styles.firstRow} >
                            <TajwalBold>
                                {strings("MyInfo")}
                            </TajwalBold>

                            <Row style={styles.infroContainer} >

                                <TajwalRegular>
                                    {myProfile?.mobile}
                                </TajwalRegular>

                                <View style={styles.dot} />
                                <TajwalRegular>
                                    {myProfile?.email}
                                </TajwalRegular>
                            </Row>

                            <Row style={styles.infroContainer} >

                                <TajwalRegular>
                                    {`${myProfile?.first_name ? myProfile?.first_name : ''} ${myProfile?.last_name ? myProfile?.last_name : ''}`}
                                </TajwalRegular>
                            </Row>

                        </View>

                    </TouchableOpacity>


                    <View style={styles.secoundRow} >

                        <Row style={{ justifyContent: 'space-between' }} >
                            <TajwalBold>
                                {strings("myPoints")}
                            </TajwalBold>

                            <TajwalRegular>
                                {myProfile?.points ?? 0}
                            </TajwalRegular>
                        </Row>


                    </View>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.secoundRow}
                        onPress={() => navigation.navigate('MyBalance')}
                    >

                        <Row style={{ justifyContent: 'space-between' }} >
                            <TajwalBold>
                                {strings("myWallet")}
                            </TajwalBold>

                            <Row style={{ alignItems: 'center' }} >
                                <TajwalRegular style={{ marginHorizontal: 10, marginTop: 5 }} >
                                    {myProfile?.balance ?? 0}
                                </TajwalRegular>
                                <Image source={icons.left} style={styles.grayImage} />
                            </Row>


                        </Row>


                    </TouchableOpacity>

                    <View style={styles.secoundRow} >

                        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('Addresses', {}) }} >

                            <Row style={styles.specialRow} >
                                <TajwalBold>
                                    {strings("Addresess")}
                                </TajwalBold>

                                <Image source={icons.left} style={styles.grayImage} />
                                {/* <Row>
                                    <Text style={{ marginHorizontal: 10 }} >
                                        {strings("VIew")}
                                    </Text>
                                    <Image source={icons.left} style={styles.grayImage} />
                                </Row> */}
                            </Row>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.secoundRow} >

                        <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('ReferFriends', {}) }} >

                            <Row style={styles.specialRow} >
                                <TajwalBold>
                                    {strings('Refer Friends')}
                                </TajwalBold>

                                <Image source={icons.left} style={styles.grayImage} />
                                {/* <Row>
            <Text style={{ marginHorizontal: 10 }} >
                {strings("VIew")}
            </Text>
            <Image source={icons.left} style={styles.grayImage} />
        </Row> */}
                            </Row>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.secoundRow} >

                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            navigation.navigate('ChangePassword', { myProfile })
                        }} >

                            <Row style={styles.specialRow} >
                                <TajwalBold>
                                    {strings("ChangePassword")}
                                </TajwalBold>

                                <Image source={icons.left} style={styles.grayImage} />

                                {/* <Row>
                            <Text style={{ marginHorizontal: 10 }} >
                                {strings("VIew")}
                            </Text>
                        </Row> */}
                            </Row>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.secoundRow} >
                        <TouchableOpacity activeOpacity={0.8} onPress={() => setIsChangeLang(true)} >
                            <Row style={styles.specialRow} >
                                <TajwalBold>
                                    {strings("Change Language")}
                                </TajwalBold>
                                <Row>
                                    <Text style={{ marginHorizontal: 10 }} >
                                        {
                                            (I18nManager.isRTL) ? "عربي" : "English"
                                        }
                                    </Text>
                                </Row>
                            </Row>
                        </TouchableOpacity>
                    </View>
                    {changeLangAction()}
                    {/* <View style={styles.secoundRow} >

                <TajwalBold>
                    {strings("lastRecomndation")}
                </TajwalBold>

                <Text style={styles.lstText} >
                    No referrals available
                </Text>

            </View> */}
                </View>
            }
        </SafeAreaView>
    )
}

export { MyAccount };
