import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, TextInput, View, I18nManager } from 'react-native';
import { icons } from '../../assets';
import { CartButton, Row, TajwalBlack, TajwalBold, TajwalRegular } from '../../components';
import { strings } from '../../i18n';
import { showToast } from '../../utils/Toast';
import { styles } from './styles';

import RTL_STYLES from "../../styles/rtlStyles";
import LTR_STYLES from "../../styles/ltrStyles";


const UpdateBalance = ({ route, navigation }) => {

    const {
        params: {
            balance
        }
    } = route
    const [amount, setAmount] = useState()

	/*const [amountTxtInput] = useRef(undefined)

	useEffect(() => {
		if (amountTxtInput) {
		}
	}, [amountTxtInput])
*/
    const onSubmit = () => {

        if (amount) {
            navigation.navigate('ChargeBalance', { amount })
        } else {
            showToast("Please Add Amonut")
        }

    }

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.subViewContainer} >
                <View style={{ borderColor: '#F1F1F1', borderWidth: 1, borderRadius: 5, width: '100%', padding: 10, marginVertical: 10, alignItems: 'flex-start' }} >
                    <TajwalBold>
                        {strings("TopUpMethod")}
                    </TajwalBold>
                    <Row style={{ alignItems: 'center', }} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 5, }} >
                            <Image source={icons.walletFCC} resizeMode='center' style={{ tintColor: '#16572C' }} />
                        </View>
                        <View style={{ width: 10 }} />
                        <TajwalBold style={{ marginVertical: 10, }} >
                            {strings("onlinePayment")}
                        </TajwalBold>
                    </Row>
                </View>

                <View style={{ borderColor: '#16572C', borderWidth: 1, borderRadius: 5, width: "100%", paddingVertical: 5, paddingHorizontal: 5, alignItems: 'flex-start' }} >
                    <TajwalBlack style={styles.titleText}  >
                        {strings("Amount")}
                    </TajwalBlack>
                    <TextInput
						//ref={ amountTxtInput }
                        value={amount}
						style={[styles.input, (I18nManager.isRTL) ? RTL_STYLES.inputStyle : LTR_STYLES.inputStyle]}
						autoFocus={ true }
                        onChangeText={amountText => { setAmount(amountText) }}
                        keyboardType='numeric'
                    />
                </View>

                <Row style={{ alignItems: 'center', marginTop: 10, marginHorizontal: 5, }} >
                    <Image source={icons.walletInfo} resizeMode='center' />
                    <View style={{ width: 10 }} />
                    <Row>
                        <TajwalRegular>
                            {`${strings("The remaining balance is")}`}
                        </TajwalRegular>
                        <TajwalBold>
                            {` ${balance} ${strings("AED")}`}
                        </TajwalBold>
                    </Row>
                </Row>
            </View>

			<View style={{ flex: 1 }}>
				<CartButton
					onPress={() => { onSubmit() }}
					text={strings("Top Up")}
					style={{ alignSelf: 'center', width: '90%', borderRadius: 5, }}
				/>
			</View>

        </SafeAreaView>
    )
}

export { UpdateBalance };
