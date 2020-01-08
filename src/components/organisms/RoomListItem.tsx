import React, { useMemo } from 'react'
import { User } from '../../entities'
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { Thumbnail, RoundedButton } from '../atoms'
import { useStyles, MakeStyles } from '../../services/design'

type Props = {
  users: User[]
  disabled?: boolean
  onPress?: () => void
  actionButton?: React.ReactElement | string
}

const showAvatarCount = 3

const RoomListItem = ({ users, actionButton, disabled = false, onPress }: Props) => {
  const styles = useStyles(makeStyles)

  const ActionButton = useMemo(() => {
    if (!actionButton) {
      return null
    }

    if (typeof actionButton == 'string') {
      return <RoundedButton>{actionButton}</RoundedButton>
    }

    return React.cloneElement(actionButton)
  }, [actionButton])

  return (
    <TouchableOpacity style={styles.container} disabled={disabled} onPress={onPress}>
      <View style={styles.head}>
        {users.slice(0, showAvatarCount).map((user, index) => (
          <View key={user.uid} style={index === 0 ? styles.thumbnailWrapper : styles.subThumbnailWrapper}>
            <Thumbnail size={48} uri={user.thumbnailURL} />
          </View>
        ))}
      </View>
      <View style={styles.tail}>{ActionButton}</View>
    </TouchableOpacity>
  )
}

const width = Dimensions.get('window').width

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
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
    thumbnailWrapper: {},
    subThumbnailWrapper: {
      marginLeft: -16
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

export default RoomListItem
