import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FullScreenModal } from '../templates'
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
    <FullScreenModal isVisible={props.isVisible} onClose={props.onClose}>
      <View style={styles.container}>
        <View style={styles.headWrapper}>
          <Text>友達のIDを検索してください。</Text>
          <TextInput value={value} onChangeText={onChangeText} fullWidth={true} />
        </View>
      </View>
    </FullScreenModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  headWrapper: {
    paddingTop: 48,
    width: 300
  }
})

export default SearchUserPage
