import React from 'react'
import { Button, Text, View, StyleSheet, Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import { NavigationStackProp } from 'react-navigation-stack'

type Props = {
  title?: string
  uid: string
  pid: string
  isModal: boolean
  navigation: NavigationStackProp
  onApply: (uid: string, pid: string) => void
  onOpen: () => void
  onClose: () => void
}

const APplyModal: React.FC<Props> = props => {
  return (
    <View style={{ flex: 1 }}>
      <Button title={String(props.title)} color="#FF9999" onPress={props.onOpen} />
      <Modal isVisible={props.isModal}>
        <View style={styles.inner}>
          <View style={styles.messageArea}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>この飲み会に参加しますか？</Text>
            </View>
            <Text>参加後のドタキャンは評価が落ちるためお気をつけ下さい</Text>
          </View>
          <View style={styles.actionArea}>
            <View style={[styles.button, styles.borderRight]}>
              <Button
                title="はい"
                onPress={() => {
                  props.onApply(props.uid, props.pid)
                }}
              />
            </View>
          </View>
        </View>
        <Text></Text>
        <View style={styles.cancelInner}>
          <View style={[styles.button, styles.borderRight]}>
            <Button title="キャンセル" onPress={props.onClose} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const width = Dimensions.get('window').width
const hairlineWidth = StyleSheet.hairlineWidth
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  inner: {
    display: 'flex',
    height: (width * 2) / 6,
    backgroundColor: '#ededed',
    borderRadius: 16
  },
  messageArea: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 24,
    paddingRight: 16,
    paddingLeft: 16
  },
  titleWrapper: {
    paddingBottom: 8
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  buttonContainer: {
    height: 30,
    width: 80,
    backgroundColor: '#FF9999',
    margin: 3,
    borderRadius: 10
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
  cancelInner: {
    display: 'flex',
    height: width / 8,
    backgroundColor: 'rgba(237, 237, 237, 0.9)',
    borderRadius: 16
  }
})

export default APplyModal
