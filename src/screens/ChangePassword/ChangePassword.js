import React, { useState } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import { CartButton, TajwalBold } from '../../components';
import { strings } from '../../i18n';
import { updatePassword } from '../../services/Profile';
import { showToast } from '../../utils';
import { styles } from './styles';

const ChangePassword = ({ route, navigation }) => {

    const [password, setPassword] = useState()
    const [oldPassword, setOldPassword] = useState()

    const [isLoadingProfile, setIsLoadingProfile] = useState(false)

    const onSubmit = () => {

        if (!oldPassword || oldPassword.length < 4) {

            showToast("Please Enter Valid Old password")
            return
        }

        if (!password || password.length < 4) {
            showToast("Please Enter Valid password")
            return
        }

        setIsLoadingProfile(true)

        updatePassword({ old_password: oldPassword, password }, res => {
            setIsLoadingProfile(false)
            navigation.goBack()
        }, err => {
            setIsLoadingProfile(false)
        })

    }


    return (
        <SafeAreaView style={styles.container} >

            <View>

                <View style={styles.subViewContainer} >

                    <TajwalBold style={styles.titleText}  >
                        {strings("oldPassword")}
                    </TajwalBold>

                    <TextInput
                        value={oldPassword}
                        style={styles.input}
                        onChangeText={oldPassword => { setOldPassword(oldPassword) }}
                        secureTextEntry
                    />

                    <TajwalBold style={styles.titleText}  >
                        {strings("Password")}
                    </TajwalBold>

                    <TextInput
                        value={password}
                        style={styles.input}
                        onChangeText={password => { setPassword(password) }}
                        secureTextEntry
                    />

                </View>
            </View>

            <CartButton
                onPress={() => { onSubmit() }}
                text={strings("Save")}
                isLoading={isLoadingProfile}
            />
        </SafeAreaView>
    )
}

export { ChangePassword };
