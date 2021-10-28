import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { FlatList, I18nManager, KeyboardAvoidingView, TextInput, TouchableOpacity, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';
import { AirbnbRating } from 'react-native-ratings';
import { strings } from '../../i18n';
import { ratingReasons } from '../../services/Orders';
import { myColors } from '../../styles';
import { Line, Row, TajwalBold, TajwalRegular } from '../index';
import { styles } from "./styles";

const rateImage = require('../../assets/rate.png')
const unRateImage = require('../../assets/unRate.png')


export const RatingModal = ({
    onCancel,
    isVisible,
    onSubmit,
    hideModal,
    defaultRating = 0,
    isLastOrder = false,
    orderId,
    delveryDate
}) => {

    const [problems, setProblems] = useState([])
    const [visibleProblems, setVisibleProblems] = useState([])
    const [rating, setRating] = useState(defaultRating)
    const [suggestions, setSuggestions] = useState("")

    useEffect(() => {

        ratingReasons(({ data }) => {
            const checkedProblems = data.map(problem => ({ ...problem, checked: false }))
            setProblems(checkedProblems)
            handelVisibleRating(rating)
        })
        setSuggestions("")

    }, [isVisible])


    const handelVisibleRating = (ratingToCheck) => {

        if (!ratingToCheck) {
            setVisibleProblems([])
            return
        }

        // setVisibleProblems(problems.filter(item => parseInt(item.from_rate) <= ratingToCheck).map(item => ({ ...item, checked: false })))
        // un comment line below to make it work

        setVisibleProblems([])
        // comment line below to make it work
    }

    const emptyAll = () => {
        setSuggestions("")

        const clonned = problems.map(item => ({
            ...item,
            checked: false
        }))

        setProblems(clonned)
        setRating(defaultRating)
    }

    const onRate = (currentRate) => {
        if (currentRate == 5) {
            setRating(currentRate)
            setVisibleProblems([])
            return
        }
        setRating(currentRate)
        handelVisibleRating(currentRate)
    }

    const onSelectProblem = (index) => {

        const clonned = visibleProblems.map(item => ({
            ...item,
            checked: item.id == visibleProblems[index].id ? !item.checked : false
        }))

        setVisibleProblems(clonned)
    }

    const renderProblem = ({ item, index }) => (
        <CheckBox
            title={item?.name}
            checked={item?.checked}
            onPress={() => { onSelectProblem(index) }}
            size={18}
            titleProps={{ style: styles.checkBoxText }}
            containerStyle={styles.checkBoxContainer}
            checkedColor={myColors.green3}
        // uncheckedIcon={<Image source={icons.unCheckedBox} resizeMode='contain' />}
        />
    )


    const moreOptions = Platform.OS == 'ios' ? { behavior: 'padding', keyboardVerticalOffset: 20 } : {}

    return (
        <Modal
            style={styles.modal}
            isVisible={isVisible}
            animationIn={'fadeInUp'}
            animationInTiming={2000}
            onBackButtonPress={() => { hideModal && hideModal(); emptyAll() }}
            onBackdropPress={() => { hideModal && hideModal(); emptyAll() }}
        >
            <KeyboardAvoidingView {...moreOptions} >

                <View style={styles.mainContainer} >

                    <View style={styles.subContainer} >

                        {orderId && <View>

                            {true && <TajwalRegular style={styles.topText} >
                                {`${strings("Rate your last order")}`}
                            </TajwalRegular>}

                            <TajwalRegular style={styles.topText} >
                                {`${strings("Order")} ${orderId} `}
                            </TajwalRegular>

                            { (delveryDate &&
                                <TajwalRegular style={styles.topText} >
                                    {`${strings("Delivered on")} ${delveryDate}`}
                                </TajwalRegular>
							)}
                            <Line />
                        </View>
                        }

                        <View style={styles.ratingContainer} >
                            {/* <Rating
                                rating={rating}
                                max={5}
                                iconWidth={40}
                                iconHeight={40}
                                iconSelected={rateImage}
                                iconUnselected={unRateImage}
                                onRate={r => onRate(r)}
                            /> */}
                            <AirbnbRating
                                ratingCount={5}
                                starImage={rateImage}
                                onFinishRating={(r) => { onRate(r); console.log(r) }}
                                showRating={false}
                                starContainerStyle={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}
                                unSelectedColor='#c7c7c7'
                                defaultRating={rating}
                            />
                        </View>

                    </View>


                    <View>

                        {visibleProblems.length ? <TajwalRegular style={styles.subContainer} >
                            {strings("What went wrong")}
                        </TajwalRegular> : null}

                        <FlatList
                            data={visibleProblems}
                            keyExtractor={(item, index) => `${item.id}`}
                            numColumns={2}
                            renderItem={renderProblem}
                            contentContainerStyle={styles.checkBoxListContainer}

                        />


                        <TextInput
                            placeholder={strings("Any suggestions")}
                            placeholderTextColor='#A6A6A6'
                            style={styles.suggestionsTextInput}
                            value={suggestions}
                            onChangeText={text => { setSuggestions(text) }}
                        />


                        <Row style={styles.buttonsRow} >

                            <TouchableOpacity
                                style={styles.cancelContainer}
                                onPress={() => { onCancel && onCancel(); emptyAll() }}
                            >
                                <TajwalBold>
                                    {strings("Cancel")}
                                </TajwalBold>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.submitContainer}
                                onPress={() => {
                                    onSubmit && onSubmit(visibleProblems.find(problem => problem?.checked), rating, suggestions)
                                    hideModal && hideModal()
                                    emptyAll()
                                }}
                            >
                                <TajwalBold style={styles.submitText} >
                                    {strings("Submit")}
                                </TajwalBold>
                            </TouchableOpacity>

                        </Row>

                    </View>
                </View>
            </KeyboardAvoidingView>

        </Modal>
    )
}
