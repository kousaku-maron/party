import React from 'react'
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import {
  isIPhoneX,
  isIPhoneXAbove,
  X_ABOVE_HEADER_NOTCH_HEIGHT,
  ANDROID_STATUS_BAR_HEIGHT
} from '../../services/design'
import Modal from 'react-native-modal'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  isVisible: boolean
  onClose: () => void
}

const FullScreenModal: React.FC<Props> = props => {
  return (
    <View>
      <Modal isVisible={props.isVisible} style={styles.modal}>
        <View style={styles.inner}>
          {props.children}
          <TouchableOpacity style={styles.closeWrapper} onPress={props.onClose}>
            <AntDesign name="close" size={24} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

const getTopSpace = () => {
  const isIOS = Platform.OS === 'ios'
  if (!isIOS) {
    return ANDROID_STATUS_BAR_HEIGHT
  }

  if (isIPhoneX() || isIPhoneXAbove()) {
    return X_ABOVE_HEADER_NOTCH_HEIGHT
  }

  return 0
}

const topSpace = getTopSpace()
// const hairlineWidth = StyleSheet.hairlineWidth

const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  inner: {
    flex: 1,
    position: 'relative',
    paddingTop: topSpace,
    backgroundColor: '#ededed'
    // alignItems: 'center'
  },
  closeWrapper: {
    position: 'absolute',
    top: topSpace + 12,
    right: 12
  }
})

export default FullScreenModal
