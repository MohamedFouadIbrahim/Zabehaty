import * as React from "react";
import { Image, Text, View, TextInput, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { icons } from "../../assets";
import { strings } from "../../i18n";
import { calcFont, h } from "../../mutils";
import { Line } from "../Line";
import { Row } from "../Row";
import { styles } from "./styles";

export const OffersAndVouchers = (props) => {

    const {
        voucherCode: voucherCodeProp = "",
        TotalBeforeDiscount = "0",
        Delivery = "",
        Tax = "0",
        Discount = "0",
        Total = "0",
        onDeleteVoucherCode,
        onApplyVoucherCode,
        VoucherCodeApplied,
        navigation,
        onPressToBrowseVouchers
    } = props

    const [voucherCode, setVoucherCode] = React.useState(voucherCodeProp)

    return (
        <View style={styles.container} >

            <View style={styles.headerTextContainer} >

                <Text style={styles.headerText}  >
                    {strings('OffersAndVouchers')}
                </Text>

            </View>

            <Line style={styles.line} />

            <View style={styles.secoundContainer} >

                <TouchableOpacity activeOpacity={1} onPress={() => { onPressToBrowseVouchers && onPressToBrowseVouchers() }} >
                    <Row style={styles.browseVouchersContainer}>

                        <Text style={styles.browseVouchersText}>
                            {strings("browseVouchers")}
                        </Text>

                        <Image source={icons.left} />

                    </Row>
                </TouchableOpacity>


                {voucherCodeProp != "" && <Row style={styles.selectedVoucherConatiner} >
                    <TextInput
                        style={styles.selectedVoucherText}
                        // onChangeText={(voucherCodeText) => setVoucherCode(voucherCodeText)}
                        placeholder={strings("WriteVoucher")}
                        value={voucherCodeProp.toLocaleUpperCase()}
                        editable={false}
                    />

                    <TouchableOpacity
                        onPress={() => {
                            if (VoucherCodeApplied) {
                                onDeleteVoucherCode && onDeleteVoucherCode()
                            } else {
                                onApplyVoucherCode && onApplyVoucherCode(voucherCodeProp)
                            }
                        }}
                    // style={styles.selectedVoucherText}
                    >
                        <Text style={styles.deleteText} >
                            {VoucherCodeApplied ? strings("Delete") : strings("Apply")}
                        </Text>
                    </TouchableOpacity>
                </Row>}

                <Row style={[styles.infoContainer, { marginTop: h(20) }]} >
                    <Text style={styles.infoText} >
                        {strings("TotalBeforeDiscount")}
                    </Text>
                    <Text style={[styles.infoValueText, { fontSize: calcFont(18) }]} >
                        {TotalBeforeDiscount} {strings('AED')}
                    </Text>
                </Row>

                <Row style={styles.infoContainer} >
                    <Text style={styles.infoText} >
                        {strings("Tax")}
                    </Text>
                    <Text style={[styles.infoValueText, { fontSize: calcFont(16) }]} >
                        {Tax} {strings('AED')}
                    </Text>
                </Row>

                <Row style={styles.infoContainer} >
                    <Text style={styles.infoText} >
                        {strings("Delivery")}
                    </Text>
                    <Text style={[styles.infoValueText, { fontSize: calcFont(16) }]} >
                        {(Delivery) ? `${Delivery} ${strings('AED')}` : strings("Free")}
                    </Text>
                </Row>
                {
                    (Discount) ?
                        <Row style={styles.infoContainer} >
                            <Text style={styles.infoText} >
                                {strings("Discount")}
                            </Text>
                            <Text style={styles.discountText} >
                                {(parseFloat(Discount) > 0) ? "-" : ""} {Discount} {strings('AED')}
                            </Text>
                        </Row>
                        :
                        null
                }

                {
                    (VoucherCodeApplied &&
                        <Row style={styles.giftedContainer} >
                            <Image source={icons.gift} resizeMode='contain' />
                            <Text style={styles.giftedText} >
                                {strings("YouHaveVoucherActivated")}
                            </Text>
                        </Row>
                    )
                }


                <Row style={[styles.infoContainer, { marginTop: h(20) }]} >
                    <Row style={styles.taxesincludedRow} >
                        <Text style={styles.infoText} >
                            {strings("Total")}
                        </Text>
                        <Text style={styles.taxesIncldedText} >
                            {`(${strings("Taxesincluded")})`}
                        </Text>
                    </Row>
                    <Text style={[styles.infoValueText, { fontSize: calcFont(16) }]} >
                        {Total} {strings('AED')}
                    </Text>
                </Row>

                <Row style={[styles.infoContainer, { marginTop: h(20) }]} >
                    <Text style={[styles.infoText, Platform.OS == 'ios' ? { lineHeight: 20 } : {}]} >
                        {strings("TaxMessage")}
                    </Text>
                </Row>
            </View>

        </View>
    )
};
