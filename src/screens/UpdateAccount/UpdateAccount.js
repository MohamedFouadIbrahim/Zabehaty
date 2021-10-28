import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { CartButton, TajwalBold, Row, TajwalRegular } from '../../components';
import { strings } from '../../i18n';
import { showToast } from '../../utils';
import { icons } from '../../assets';
import { updateProfile, getProfile } from '../../services/Profile';
import Spinner from 'react-native-loading-spinner-overlay';
import { myColors } from '../../styles';
import { myfonts } from '../../../assets';
const UpdateAccount = ({ route, navigation }) => {

    const [profile, setProfile] = useState({})
    const [isLoadingProfile, setIsLoadingProfile] = useState(false)
    const [isFetchingData, setIsFetchingData] = useState(false)

    useEffect(() => {
        setIsFetchingData(true)
        getProfile(({data}) => {
            setProfile(data)
            setIsFetchingData(false)
        }, err => {
            setIsFetchingData(false)
        })
    }, [])


    const onSubmit = () => {

        const {
            first_name,
            last_name,
            // middle_name,
            mobile,
            email
        } = profile

        if (!first_name) {
            showToast("PleaseEnterFirstName")
            return
        }

        if (!last_name) {
            showToast("Please Enter Last Name")
            return
        }

        if (!email && !mobile) {
            showToast("Please Enter Mobile Or Email")
            return
        }

        setIsLoadingProfile(true)

        updateProfile({
            first_name,
            last_name,
            // middle_name,
            mobile,
            email
        }, res => {
            setIsLoadingProfile(false)
            navigation.goBack()
        }, err => {
            setIsLoadingProfile(false)
        })
    }

    const renderHeader = () => {

        return (
            <Row style={styles.headerRow} >
                <Row>
                    <TouchableOpacity onPress={() => navigation.goBack()}  >
                        <Image source={icons.currencyheaderIcon} style={styles.wihteImage} />
                    </TouchableOpacity>
                    <TajwalRegular style={styles.profileText} >
                        {strings("Profile")}
                    </TajwalRegular>
                </Row>

                {/* <Image source={icons.search} style={styles.wihteImage} /> */}

            </Row>
        )
    }

    if (isFetchingData) {
        return (
            <Spinner
                color={myColors.green3}
                size='large'
                textContent={strings('loading')}
                visible={true}
                textStyle={{ fontFamily: myfonts.TajwalRegular, color: myColors.green3 }}
            />)
    }

    return (
        <SafeAreaView style={styles.container} >

            <ScrollView>

                <View style={styles.subViewContainer} >

                    <TajwalBold style={styles.titleText}  >
                        {strings("first_name")}
                    </TajwalBold>

                    <TextInput
                        value={profile?.first_name}
                        style={styles.input}
                        onChangeText={first_name => { setProfile(prevProfile => ({ ...prevProfile, first_name })) }}

                    />

                    {/* <TajwalBold style={styles.titleText} >
                        {strings('middle_name')}
                    </TajwalBold>

                    <TextInput
                        value={profile?.middle_name}
                        style={styles.input}
                        onChangeText={middle_name => { setProfile(prevProfile => ({ ...prevProfile, middle_name })) }}
                    /> */}

                    <TajwalBold style={styles.titleText} >
                        {strings('last_name')}
                    </TajwalBold>


                    <TextInput
                        value={profile?.last_name}
                        style={styles.input}
                        onChangeText={last_name => { setProfile(prevProfile => ({ ...prevProfile, last_name })) }}
                    />

                    <TajwalBold style={styles.titleText} >
                        {strings('email')}
                    </TajwalBold>

                    <TextInput
                        value={profile?.email}
                        style={styles.input}
                        onChangeText={email => { setProfile(prevProfile => ({ ...prevProfile, email })) }}
                    />

                    <TajwalBold style={styles.titleText} >
                        {strings('mobile')}
                    </TajwalBold>

                    <TextInput
                        value={profile?.mobile}
                        style={styles.input}
                        onChangeText={mobile => { setProfile(prevProfile => ({ ...prevProfile, mobile })) }}
                    />
                </View>

            </ScrollView>

            <CartButton
                onPress={() => { onSubmit() }}
                text={strings("Save")}
                isLoading={isLoadingProfile}
            />
        </SafeAreaView>
    )
}

export { UpdateAccount }