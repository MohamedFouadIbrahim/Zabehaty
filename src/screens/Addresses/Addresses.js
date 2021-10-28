import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, SafeAreaView, TouchableOpacity, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '../../assets';
import { CartButton, Row, TajwalBold, TajwalMedium } from '../../components';
import { strings } from '../../i18n';
import { CHANGE_BRANCH, CHANGE_FULLADDRESS } from '../../Redux/actionTypes';
import { deleteAddress, getAddresses } from '../../services/Addresses';
import { myColors } from "../../styles/myColors";
import { styles } from './styles';

import { HomeHeader } from "../../components/HomeHeader";
import { setBranchId } from "../../utils/APIKit";


const Addresses = ({ navigation, route }) => {
	const dispatch = useDispatch();
    const {
        params: {
            onSelect = undefined,
            lockEmirates
        }
    } = route

    const isFocused = useIsFocused()
    const [selectedAdress, setSelectedAdress] = useState({})
    const [Adresses, setAdresses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isPageLoading, setIsPageLoading] = useState(false)
    const currentBranch = useSelector(state => state.address.currentBranch)
	const currentEmirate = useSelector(state => state.address.currentEmirate)

    useEffect(() => {

        if (isFocused) {
            getAllAddress()
        }

    }, [isFocused])

    const homeNamed = ['Home', 'home', 'المنزل', 'منزل'];

    const getAllAddress = () => {

        setIsPageLoading(true)
        //getAddresses(currentBranch?.id, res => {
		getAddresses(res => {
            setAdresses(res.data.map((item) => ({
                ...item,
                img: homeNamed.includes(item.name) ? icons.HomeIcon : icons.LocationIcon,
                fullAddress: `${item?.address} \n${item?.apartment_num} ${item?.street_name}`
            })))

            setSelectedAdress({})
            setIsPageLoading(false)

            if(!res.data.length) {
                dispatch({ type: CHANGE_FULLADDRESS, data: { } })
            }

        }, err => {
            setIsPageLoading(false)
        })

    }

    const onSelectAddress = (address) => {
        setSelectedAdress({ ...address, Region: address?.region })
    }

    const onDeleteAddress = () => {

        setIsLoading(true)

        deleteAddress(selectedAdress?.id, ({ data }) => {
            getAllAddress()
            setSelectedAdress({})
            setIsLoading(false)
        }, err => {
            setIsLoading(false)
        })

    }

    const onEditAddress = () => {

        navigation.navigate('Address', {
            editMode: true,
            selectedAdress: {
                ...selectedAdress,
                address_id: selectedAdress.id
            },
            lockEmirates,
            onSelectAddress: onSelect
        })
        // navigate to edit address
    }

    const onAddAddress = () => {

        navigation.navigate('Address', {
            editMode: false,
            lockEmirates,
            onSelectAddress: onSelect
        })
    }

    const _renderAddress = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.AddressItem, { backgroundColor: item.id == selectedAdress.id ? myColors.yellow2 : "transparent" }]}
            onPress={() => onSelectAddress(item)}
        >

            <Image
                source={item.img}
                resizeMode='contain'
            />

            <View style={styles.AddressTextContainer} >

                <TajwalBold style={styles.AddressName}>
                    {item.name}
                </TajwalBold>

                <TajwalMedium style={styles.FullAddress} >
                    {item.fullAddress}
                </TajwalMedium>

            </View>

        </TouchableOpacity>
    )

    const renderAddressOptionsButtons = () => {
        if (selectedAdress?.id) {
            return (
                <Row style={styles.AddressOptionsButtonsContainer} >

                    <TouchableOpacity
                        style={styles.AddressOptions}
                        onPress={() => onEditAddress()}
                    >
                        <TajwalMedium style={styles.EditSelectedAddressText} >
                            {strings("EditSelectedAddress")}
                        </TajwalMedium>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={isLoading}
                        style={styles.AddressOptions}
                    >

                        {isLoading ? <ActivityIndicator size='small' /> :
                            <TajwalMedium style={styles.EditSelectedAddressText} onPress={() => onDeleteAddress(selectedAdress?.id)} >
                                {strings("DeleteSelectedAddress")}
                            </TajwalMedium>
                        }
                    </TouchableOpacity>

                </Row>
            )
        }
    }

    const renderAddNewAddressButton = () => (
        <TouchableOpacity style={styles.AddNewButton} onPress={() => onAddAddress()} >
            <TajwalMedium style={styles.AddNewText} >
                {strings("ADDNEWADDRESS")}
            </TajwalMedium>
        </TouchableOpacity>
    )


    const renderContinueButton = () => {
        if (selectedAdress?.id && onSelect) {
            return (
                <CartButton
                    text={strings("Continue")}
                    onPress={() => {
                        onSelect && onSelect(selectedAdress);
                        navigation.goBack()
                    }}
                />
            )
        }
    }

    if (isPageLoading) {
        return <ActivityIndicator size='large' color={myColors.green3} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} />
    }

	const handelBranches = (branch = null, onSucessAddBranchId) => {
		if (branch?.id) {
			setBranchId(branch.id)
			dispatch({ type: CHANGE_BRANCH, data: branch })
			onSucessAddBranchId && onSucessAddBranchId()
			return
		}

		if (currentBranch?.id) { // we stoed braches before
			setBranchId(currentBranch?.id)
			onSucessAddBranchId && onSucessAddBranchId()
			return
		}
	}

    return (
        <SafeAreaView style={styles.container} >
			<HomeHeader
				onFinish={branch => {
					handelBranches(branch, () => {
						getAllAddress()
					})
				}}
			/>
            {/* {renderHeader()} */}
			{
				(Adresses.length > 0) ?
					<FlatList
						data={Adresses}
						keyExtractor={(item, index) => String(index)}
						renderItem={_renderAddress}
					/>
					:
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={styles.noAddressesLbl}>{ strings("No addresses found in this region") }</Text>
					</View>
			}
            {renderAddressOptionsButtons()}
            {renderAddNewAddressButton()}
            {renderContinueButton()}
        </SafeAreaView>
    )
}

export { Addresses };
