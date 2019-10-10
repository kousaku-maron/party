import React, { useState, useCallback } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { isIPhoneX, isIPhoneXAbove, X_ABOVE_HEADER_NOTCH_HEIGHT } from '../../services/design'
import Modal from 'react-native-modal'
import { AntDesign } from '@expo/vector-icons'
import { TextInput } from '../atoms'

type Props = {
  isVisible: boolean
  onClose: () => void
  onChangeUserID?: (userID: string) => void
}

const SearchUserPage = (props: Props) => {
  const [value, setValue] = useState<string>('')

  const onChangeText = useCallback(
    (text: string) => {
      setValue(text)
      if (props.onChangeUserID) {
        props.onChangeUserID(text)
      }
    },
    [props]
  )

  return (
    <Modal isVisible={props.isVisible} style={styles.modal}>
      <View style={styles.inner}>
        <TouchableOpacity style={styles.closeWrapper} onPress={props.onClose}>
          <AntDesign name="close" size={24} />
        </TouchableOpacity>
        <View style={styles.headWrapper}>
          <Text>友達のIDを検索してください。</Text>
          <TextInput value={value} onChangeText={onChangeText} fullWidth={true} />
        </View>
      </View>
    </Modal>
  )
}

const topSpace = isIPhoneX() || isIPhoneXAbove() ? X_ABOVE_HEADER_NOTCH_HEIGHT : 0
// const hairlineWidth = StyleSheet.hairlineWidth

const styles = StyleSheet.create({
  modal: {
    margin: 0
  },
  inner: {
    flex: 1,
    position: 'relative',
    paddingTop: topSpace,
    backgroundColor: '#ededed',
    alignItems: 'center'
  },
  closeWrapper: {
    position: 'absolute',
    top: topSpace + 12,
    right: 12
  },
  headWrapper: {
    paddingTop: 48,
    width: 300
  }
})

export default SearchUserPage
