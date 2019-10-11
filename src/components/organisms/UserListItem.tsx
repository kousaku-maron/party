import React, { useMemo } from 'react'
import { User } from '../../entities'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Thumbnail, RoundedButton } from '../atoms'

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

  /* TODO:　Userにid実装後、uidをidに変更 */
  return (
    <TouchableOpacity style={styles.container} disabled={disabled} onPress={() => onPress(user)}>
      <View style={styles.head}>
        <View style={styles.thumbnailWrapper}>
          <Thumbnail size={48} uri={user.thumbnailURL} />
        </View>
        <View>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.idText}>@{user.uid}</Text>
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
    padding: 12,
    backgroundColor: 'white'
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
    fontSize: 16
  },
  idText: {
    fontSize: 12,
    color: 'gray'
  }
})

export default UserListItem
