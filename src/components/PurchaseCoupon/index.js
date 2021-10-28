import React from 'react';
import { View } from 'react-native';
import { Bar } from 'react-native-progress';
import { h, w } from '../../mutils';
import { myColors } from '../../styles/myColors';
import { TajwalRegular } from '../FontedText';
import { SegoeUISemibold ,TajwalBold } from '../index';
import { Row } from '../Row';
import { styles } from './styles';

export const PurchaseCoupon = ({ title, progress, start, end }) => (

    <Row style={styles.container} >


        <TajwalBold style={styles.startText}>
            {start}
        </TajwalBold>

        <View >
            <TajwalRegular style={styles.titleText} >
                {title}
            </TajwalRegular>

            <Bar
                progress={progress}
                color={myColors.lightGreen2}
                unfilledColor={myColors.gray1}
                borderColor={myColors.gray1}
                height={h(9)}
                width={w(200)}
                style={{ marginBottom: 10 }}
            />

        </View>

        <TajwalBold style={styles.startText}>
            {end}
        </TajwalBold>
    </Row>

)