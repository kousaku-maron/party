import React, { useMemo, useCallback } from 'react'
import { User } from '../../entities'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Thumbnail, RoundedButton } from '../atoms'
import { colors } from '../../themes'

type Props = {
  user: User
  disabled?: boolean
  onPress?: (user: User) => void
  actionButton?: React.ReactElement | string
}

const UserListItem = ({ user, actionButton, disabled = false, onPress }: Props) => {
  const ActionButton = useMemo(() => {
    if (!actionButton) {
      return null
    }

    if (typeof actionButton == 'string') {
      return <RoundedButton>{actionButton}</RoundedButton>
    }

    return React.cloneElement(actionButton)
  }, [actionButton])

  const _onPress = useCallback(
    (user: User) => {
      if (onPress) {
        onPress(user)
      }
    },
    [onPress]
  )

  return (
    <TouchableOpacity style={styles.container} disabled={disabled} onPress={() => _onPress(user)}>
      <View style={styles.head}>
        <View style={styles.thumbnailWrapper}>
          <Thumbnail size={48} uri={user.thumbnailURL} />
        </View>
        <View>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.idText}>@{user.userID}</Text>
        </View>
      </View>
      <View style={styles.tail}>{ActionButton}</View>
    </TouchableOpacity>
  )
}

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    height: 75,
    padding: 12
    // backgroundColor: colors.backgrounds.primary
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  tail: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  thumbnailWrapper: {
    paddingRight: 12
  },
  nameText: {
    fontSize: 16,
    color: colors.foregrounds.primary
  },
  idText: {
    fontSize: 12,
    color: colors.foregrounds.secondary
  }
})

export default UserListItem
