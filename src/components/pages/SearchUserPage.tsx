import React, { useState, useRef, useCallback } from 'react'
import { View, ScrollView, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { FullScreenModal } from '../templates'
import { TextBox } from '../atoms'

type Props = {
  isVisible: boolean
  onClose: () => void
  onChangeUserID?: (userID: string) => void
  onSubmitUserID?: (userID: string) => void
}

const useSearchButton = () => {
  const buttonWidth = useRef(new Animated.Value(0)).current
  const buttonPaddingLeft = useRef(new Animated.Value(0)).current

  const show = useCallback(() => {
    Animated.parallel([
      Animated.timing(buttonWidth, { toValue: 50, duration: 200 }),
      Animated.timing(buttonPaddingLeft, { toValue: 8, duration: 200 })
    ]).start()
  }, [buttonPaddingLeft, buttonWidth])

  const hidden = useCallback(() => {
    Animated.parallel([
      Animated.timing(buttonWidth, { toValue: 0, duration: 200 }),
      Animated.timing(buttonPaddingLeft, { toValue: 0, duration: 200 })
    ]).start()
  }, [buttonPaddingLeft, buttonWidth])

  return { buttonWidth, buttonPaddingLeft, show, hidden }
}

const SearchUserPage = (props: Props) => {
  const [value, setValue] = useState<string>('')
  const searchButtonTools = useSearchButton()

  const onChangeText = useCallback(
    (text: string) => {
      setValue(text)
      if (props.onChangeUserID) {
        props.onChangeUserID(text)
      }
    },
    [props]
  )

  const onSubmitEditing = useCallback(() => {
    if (props.onSubmitUserID) {
      props.onSubmitUserID(value)
    }
  }, [props, value])

  return (
    <FullScreenModal title="Nomoca" isVisible={props.isVisible} onClose={props.onClose}>
      <View style={styles.container}>
        <View style={styles.headWrapper}>
          <View style={styles.searchBox}>
            <TextBox
              placeholder={'友達のIDを検索'}
              value={value}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
              onEndEditing={searchButtonTools.hidden}
              onFocus={searchButtonTools.show}
              fullWidth={true}
            />
          </View>

          <TouchableOpacity onPress={onSubmitEditing}>
            <Animated.Text
              style={[
                styles.buttonText,
                { width: searchButtonTools.buttonWidth, paddingLeft: searchButtonTools.buttonPaddingLeft }
              ]}
            >
              検索
            </Animated.Text>
          </TouchableOpacity>
        </View>
        <ScrollView></ScrollView>
      </View>
    </FullScreenModal>
  )
}

// const hairlineWidth = StyleSheet.hairlineWidth

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  headWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 6
    // borderBottomWidth: hairlineWidth,
    // borderBottomColor: 'gray'
  },
  searchBox: {
    flex: 1
  },
  buttonText: {
    fontSize: 18
  }
})

export default SearchUserPage
