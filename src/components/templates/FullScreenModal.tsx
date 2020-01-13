import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import {
  useStyles,
  MakeStyles,
  useColors,
  isIPhoneX,
  isIPhoneXAbove,
  X_ABOVE_HEADER_NOTCH_HEIGHT,
  ANDROID_STATUS_BAR_HEIGHT
} from '../../services/design'
import Modal from 'react-native-modal'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  title?: string
  isVisible: boolean
  onClose: () => void
}

const FullScreenModal: React.FC<Props> = props => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  return (
    <View>
      <Modal isVisible={props.isVisible} style={styles.modal}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.titleText}>{props.title}</Text>
            <TouchableOpacity style={styles.closeWrapper} onPress={props.onClose}>
              <AntDesign name="close" size={24} color={colors.foregrounds.secondary} />
            </TouchableOpacity>
          </View>
          {props.children}
        </View>
      </Modal>
    </View>
  )
}

const TOP_SPACE = Platform.select({
  ios: isIPhoneX() || isIPhoneXAbove() ? X_ABOVE_HEADER_NOTCH_HEIGHT : 0,
  android: ANDROID_STATUS_BAR_HEIGHT,
  default: 0
})

const APPBAR_HEIGHT = Platform.select({
  ios: 44,
  android: 56,
  default: 64
})

const hairlineWidth = StyleSheet.hairlineWidth

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    modal: {
      margin: 0
    },
    inner: {
      flex: 1,
      paddingTop: TOP_SPACE,
      backgroundColor: colors.backgrounds.secondary
    },
    header: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: APPBAR_HEIGHT,
      backgroundColor: colors.backgrounds.secondary,
      borderBottomColor: colors.foregrounds.separator,
      borderBottomWidth: hairlineWidth,
      zIndex: 1100
    },
    closeWrapper: {
      position: 'absolute',
      top: 12,
      left: 12
    },
    titleText: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.foregrounds.primary
    }
  })

export default FullScreenModal
