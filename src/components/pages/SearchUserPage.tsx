import React, { useState, useRef, useCallback } from 'react'
import { User } from '../../entities'
import { View, ScrollView, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { useSearchUsers } from '../../services/user'
import { useStyles, MakeStyles } from '../../services/design'
import { TextInput } from '../atoms'
import { UserListItem } from '../organisms'
import { FullScreenModal } from '../templates'

type Props = {
  isVisible: boolean
  onClose: () => void
  ignoreUserIDs?: string[]
  onChangeUserID?: (userID: string) => void
  onSubmitUserID?: (userID: string) => void
  onSelectUser?: (user: User) => void
}

const useSearchButton = () => {
  const buttonWidth = useRef(new Animated.Value(0)).current
  const buttonPaddingLeft = useRef(new Animated.Value(0)).current

  const show = useCallback(() => {
    Animated.parallel([
      Animated.timing(buttonWidth, { toValue: 50, duration: 200 }),
      Animated.timing(buttonPaddingLeft, { toValue: 12, duration: 200 })
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
  const styles = useStyles(makeStyles)

  const [value, setValue] = useState<string>('')
  const searchButtonTools = useSearchButton()
  const { users, search } = useSearchUsers({ ignoreUserIDs: props.ignoreUserIDs })

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
    search(value)
    if (props.onSubmitUserID) {
      props.onSubmitUserID(value)
    }
  }, [props, search, value])

  const onSelectUser = useCallback(
    (user: User) => {
      if (props.onSelectUser) {
        props.onSelectUser(user)
      }
    },
    [props]
  )

  return (
    <FullScreenModal title="Nomoca" isVisible={props.isVisible} onClose={props.onClose}>
      <View style={styles.container}>
        <View style={styles.headWrapper}>
          <View style={styles.searchBox}>
            <TextInput
              placeholder={'友達のIDを検索'}
              value={value}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
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
              numberOfLines={1}
            >
              検索
            </Animated.Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {users.map((user: User) => (
            <UserListItem key={user.userID} user={user} onPress={() => onSelectUser(user)} />
          ))}
        </ScrollView>
      </View>
    </FullScreenModal>
  )
}

// const hairlineWidth = StyleSheet.hairlineWidth

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
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
      fontSize: 18,
      color: colors.foregrounds.primary
    }
  })

export default SearchUserPage
