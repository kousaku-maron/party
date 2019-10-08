import React from 'react'
import { View, Text, Button, Image, StyleSheet, Dimensions } from 'react-native'
import Modal from 'react-native-modal'

type Props = {
  isVisible: boolean
  url: string
  onClose: () => void
  onUpload: () => void
}

const UploadCertificateModal = (props: Props) => {
  return (
    <View>
      <Modal isVisible={props.isVisible}>
        <View style={styles.inner}>
          <View style={styles.messageArea}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>この画像をアップロードしますか？</Text>
            </View>
            <Text>アップロードされた画像は年齢確認にのみ、使用します。</Text>
          </View>

          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={{ uri: props.url }} />
          </View>

          <View style={styles.actionArea}>
            <View style={[styles.button, styles.borderRight]}>
              <Button title="キャンセル" onPress={props.onClose} />
            </View>
            <View style={styles.button}>
              <Button title="アップロード" onPress={props.onUpload} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const width = Dimensions.get('window').width
const hairlineWidth = StyleSheet.hairlineWidth

const styles = StyleSheet.create({
  inner: {
    display: 'flex',
    height: (width * 4) / 5,
    backgroundColor: '#ededed',
    borderRadius: 16
  },
  messageArea: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16
  },
  imageWrapper: {
    flex: 1,
    padding: 16
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  titleWrapper: {
    paddingBottom: 8
  },
  image: {
    flex: 1
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    borderColor: 'gray',
    borderTopWidth: hairlineWidth
  },
  borderRight: {
    borderColor: 'gray',
    borderRightWidth: hairlineWidth
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default UploadCertificateModal
