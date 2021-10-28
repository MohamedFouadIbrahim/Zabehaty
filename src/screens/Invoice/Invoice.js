import React, { useEffect, useState } from 'react';
import { ActivityIndicator, I18nManager, Platform, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import RNFS from 'react-native-fs';
import PDFView from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { strings } from '../../i18n';
import { myColors } from '../../styles/myColors';
import { writeFilePermission } from '../../utils/Permissions';
import { showToast } from '../../utils/Toast';
import { styles } from './styles';
const Invoice = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isFileDownloaded, setIsFileDownloaded] = useState(false)
	const [filePath, setFilePath] = useState("")

    const fileType = "application/pdf";


    // console.log('route?.params?.uri', route?.params?.uri)

    const path = `${ (Platform.OS === 'android') ? RNFS.DownloadDirectoryPath : RNFS.MainBundlePath }/Invoice-${route?.params?.orderId}.pdf`


    useEffect(() => {

        setIsLoading(true)
        writeFilePermission(() => {
			console.log(path)
			const dirs = RNFetchBlob.fs.dirs
			RNFetchBlob
				.config({
					// add this option that makes response data to be stored as a file,
					// this is much more performant.
					fileCache : true,
					//appendExt : 'pdf'
					path : dirs.DocumentDir + `/Invoice-${route?.params?.orderId}.pdf`
				})
				.fetch('GET', route?.params?.uri, {
					//some headers ..
				})
				.then((res) => {
					// the temp file path
					console.log('The file saved to ', res.path())
					setFilePath(res.path())
					setIsLoading(false)
                    setIsFileDownloaded(true)
                    showToast("File Downloaded")
				})

            /*RNFS.downloadFile({
                fromUrl: route?.params?.uri,
                toFile: path
            }).promise.then((e) => {
                if (e.statusCode == 200) {
                    setIsLoading(false)
                    setIsFileDownloaded(true)
                    showToast("File Downloaded")
                }

            }, (e) => {
                console.log('fejhfej', e)
                setIsLoading(false)
            })*/

        }, () => {
            setIsLoading(false)
        })

    }, [])


    const onShare = () => {

        Share.open({
            title: `${strings("Invoice")}${route?.params?.orderId}`,
            message: strings("I Want To Share Invoice With You"),
            url: `file://${filePath}`, //`file:///${path}`,
            type: `${fileType}`,
            filename: `${strings("Invoice")}${route?.params?.orderId}`
        }).catch((e) => { })

    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}
                    onPress={() => { navigation.goBack() }}
                >
                    <Ionicons
                        name={(I18nManager.isRTL) ? 'arrow-forward-outline' : 'arrow-back-outline'}
                        color={'#000000'}
                        size={25}
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center" }}
                    disabled={!isFileDownloaded}
                    onPress={() => { onShare() }}
                >
                    <Entypo
                        name={'share'}
                        color={'#000000'}
                        size={25}
                    />
                </TouchableOpacity>
            )
        })
    }, [isFileDownloaded])


    if (isLoading) {
        return <ActivityIndicator color={myColors.green3} size='large' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    }

    return (
        <SafeAreaView style={styles.container} >
			{
				(isFileDownloaded) ?
					<PDFView
						source={{ uri: `file://${filePath}` }}
						style={{
							backgroundColor: myColors.white,
							flex:1,
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').height
						}}
					/>
					:
					<ActivityIndicator color={ myColors.green } />
			}
        </SafeAreaView>
    )
}
export { Invoice };
