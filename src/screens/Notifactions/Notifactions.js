import React, { useEffect, useState, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FlatList, Text, Platform, SafeAreaView, TouchableOpacity, View, ScrollView, RefreshControl } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { icons } from '../../assets';
import { strings } from '../../i18n';
import { h } from '../../mutils';
import { styles } from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import APIKit from "../../utils/APIKit";
import { set } from 'react-native-reanimated';
import { myColors } from "../../styles";
import { NotifactionCard } from "../../components/NotifactionCard";
import { ActivityIndicator } from 'react-native-paper';

const Notifactions = ({ navigation }) => {
	const isFocused = useIsFocused()
	const onEndReachedCalledDuringMomentum = useRef(true)

    const [RefreshList, setRefreshList] = useState(false)
    const [notifactions, setNotifactions] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [spinner, setSpinner] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Ionicons
                        // name={ (I18nManager.isRTL) ? 'arrow-forward-outline' : 'arrow-back-outline' }
                        name='close-outline'
                        color={'#000000'}
                        size={25}
                    />
                </TouchableOpacity>
            )
        })
    }, [])

    useEffect(() => {
		if (isFocused) {
			setSpinner(true)
			setPage(1)
			fetchNotifacation(1)
		}
    }, [isFocused]);


    const fetchNotifacation = async (page) => {
		console.log(`user/notifications?page=${page ? page : 1}`)
        const response = await APIKit.get(`user/notifications?page=${page ? page : 1}`);
		console.log("Notifications")
		console.log(response)
        if (response.data.status === 200) {
            page == 1 ? setNotifactions(response.data.data) : setNotifactions([...notifactions, ...response.data.data]);
            setPageCount(response.data.meta.last_page)
            // console.log("response", response);
            console.log(page == 1 ? response.data.data : [...notifactions, ...response.data.data]);

			setSpinner(false)
			setLoading(false)
			setRefreshList(false)
			onEndReachedCalledDuringMomentum.current = true
        }
    };

    const LoadMoreNotifaction = async (page) => {
        setPage(page)
        setLoading(true)
        fetchNotifacation(page)
    };

    const refresh = async (page) => {
        setPage(page)
        setRefreshList(true)
        fetchNotifacation(page)
    }


    return (
        <SafeAreaView style={styles.fullContainer} >
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={RefreshList} onRefresh={() => { refresh(1) }}
                        tintColor={myColors.green3}
                        colors={[myColors.green3]}
                    />
                }
            >
                <View style={{ marginBottom: 15 }}>
                    <FlatList
                        // style={{ height: 120 }}
                        data={notifactions}
                        ListEmptyComponent={
                            <View style={{ flex: 1, height: 500 }}>
                                <Text style={styles.noResult}>{strings('noResult')}</Text>
                            </View>
                        }
                        renderItem={({ item, index }) => (
                            <NotifactionCard item={item} index={ index } />
                        )}
                        keyExtractor={(item, index) => index + ""}
                        showsHorizontalScrollIndicator={false}
                        refreshing={RefreshList}
                        onEndReachedThreshold={2}
                        onEndReached={() => {
							if (!spinner && !loading && !RefreshList) {
								console.log("Page = " + page)
								console.log("PageCount = " + pageCount)
								console.log(page < pageCount)

								if (page < pageCount) {
									LoadMoreNotifaction(page + 1)
								}
							}
						}}
						onMomentumScrollBegin={() => { onEndReachedCalledDuringMomentum.current = false }}
                        ListFooterComponent={loading&&<ActivityIndicator size={'small'} color={myColors.green3} style={{ alignSelf: 'center',paddingVertical:h(10) }} />}
                    // scrollEventThrottle={150}
                    />
                </View>
            </ScrollView>
            <Spinner
                visible={spinner}
            />
        </SafeAreaView>
    )

}

export { Notifactions };
