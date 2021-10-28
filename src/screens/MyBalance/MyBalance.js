import { useIsFocused } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { icons } from '../../assets';
import { Row, TajwalBold, TajwalRegular } from '../../components';
import { getBalanceHistory, getProfile } from '../../services/Profile';
// Helpers
import { strings } from '../../i18n';
import { styles } from './styles';

const BalanceItem = ({ item }) => {

    const {
        operation,
        date,
        amount,
        user_mobile
    } = item


    if (operation == "add") {
        return (
            <Row style={styles.transActionRow} >

                <Row style={{ alignItems: 'center' }} >
                    <Image source={icons.walletTopup} resizeMode='center' />
                    <View style={{ width: 10 }} />
                    <View>
                        <TajwalBold>
                            {strings("Top Up")}
                        </TajwalBold>
                        { /*<TajwalRegular>
                            {number}
						</TajwalRegular>*/ }
                    </View>
                </Row>

                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <TajwalBold>
                        {`+ ${amount} ${strings("AED")}`}
                    </TajwalBold>
                    { /*<TajwalRegular>
                        {date}
					</TajwalRegular>*/ }
                </View>

            </Row>
        )
    }

    if (operation == "transfer_in" || operation == "transfer_out") {

        return (
            <Row style={styles.transActionRow} >

                <Row style={{ alignItems: 'center', }} >
                    <Image source={icons.walletTransfer} resizeMode='center' />
                    <View style={{ width: 10 }} />
                    <View>
                        <TajwalBold>
                            {strings("Transfer")}
                        </TajwalBold>
                        <TajwalRegular>
                            {user_mobile}
						</TajwalRegular>
                    </View>
                </Row>

                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <TajwalBold>
                        {`${operation == "transfer_in" ? '+' : '-'}${amount} ${strings("AED")}`}
                    </TajwalBold>
                    { /*<TajwalRegular>
                        {date}
					</TajwalRegular>*/ }
                </View>

            </Row>
        )
    }



    if (operation == "order") {

        return (
            <Row style={styles.transActionRow} >

                <Row style={{ alignItems: 'center', }} >
                    <Image source={icons.walletOrder} resizeMode='center' />
                    <View style={{ width: 10 }} />
                    <View>
                        <TajwalBold>
                            {strings("Order")}
                        </TajwalBold>
                        { /*<TajwalRegular>
                            {number}
						</TajwalRegular>*/ }
                    </View>
                </Row>

                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <TajwalBold>
                        {`${amount} ${strings("AED")}`}
                    </TajwalBold>
                    { /*<TajwalRegular>
                        {date}
					</TajwalRegular>*/ }
                </View>

            </Row>
        )
    }
    return null

}

const MyBalance = ({ navigation }) => {

    const [myProfile, setMyProfile] = useState({})
    const [balanceHistory, setBalanceHistory] = useState()

    const isFocused = useIsFocused()

    useEffect(() => {
        getProfile((res) => {
            setMyProfile(res.data)
        })
        getBalanceHistory(res => {
            /*const df = [ // this array not vaild please check end point
                { operation: 'add', date: '6/8/2020', amount: "8000", number: '20' },
                { operation: "transfer_in", date: '6/8/2020', amount: "7000", number: "100" },
                { operation: "transfer_out", date: '6/8/2020', amount: "9000", number: "50" },
                { operation: "order", date: '6/8/2020', amount: "9000", number: "800" }
            ]*/
			console.log(res)
            setBalanceHistory(res.data)
            // setBalanceHistory(df)
        })
    }, [isFocused])


    return (
        <SafeAreaView style={styles.container}>

            <View style={{ backgroundColor: 'white', marginTop: 10, paddingHorizontal: 15, flex: 1 }} >


                <Row style={{ justifyContent: 'space-between', paddingVertical: 15, }} >
                    <View  >
                        <TajwalBold>
                            {strings("Hello")}
                        </TajwalBold>
                        <TajwalRegular style={{ marginTop: 5, }} >
                            {myProfile?.first_name}
                        </TajwalRegular>
                    </View>

                    <View>

                        <TajwalRegular>
                            {strings("YourBalance")}
                        </TajwalRegular>
                        <TajwalBold style={{ marginTop: 5, }} >
                            {`${myProfile?.balance} ${strings("AED")}`}
                        </TajwalBold>

                    </View>
                </Row>


                <Row style={{ justifyContent: 'center' }} >

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate('UpdateBalance', { balance: myProfile?.balance })
                        }}
                        style={styles.buttons}
                    >
                        <Image source={icons.walletTopup} resizeMode='center' />

                        <TajwalRegular style={{ marginVertical: 10 }} >
                            {strings("Top Up")}
                        </TajwalRegular>

                    </TouchableOpacity>

                    <View style={{ width: 10 }} />
                    <TouchableOpacity
                        activeOpacity={0.8}
						onPress={() => {
							navigation.navigate('BalanceContacts', { balance: myProfile?.balance })
						}}
                        style={styles.buttons}
                    >
                        <Image source={icons.walletTransfer} resizeMode='center' />

                        <TajwalRegular style={{ marginVertical: 10 }} >
                            {strings("Transfer")}
                        </TajwalRegular>
                    </TouchableOpacity>

                </Row>

				{
					(balanceHistory && balanceHistory.length > 0 &&
						<FlatList
							data={balanceHistory}
							ListHeaderComponent={() =>
								<TajwalRegular style={{ alignSelf: "flex-start" }}>{strings("Transactions")}</TajwalRegular>
							}
							renderItem={({ item, index }) => (<BalanceItem item={item} />)}
							keyExtractor={(item, index) => String(index)}
							contentContainerStyle={{ marginTop: 20 }}
						/>
					)
				}
            </View>



        </SafeAreaView>
    )
}

export { MyBalance };
