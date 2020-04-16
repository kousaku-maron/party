import React, { useMemo } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useAuthState } from '../../store/hooks'
import { useColors, useStyles, MakeStyles } from '../../services/design'
import { formattedDateForMessageCreatedAt } from '../../services/formatedDate'
import { Room, User } from '../../entities'
import { Thumbnail, ShadowBase } from '../atoms'
import { Icons } from '../../@assets/vector-icons'

type Props = {
  room: Room & { users: User[] } // TODO: Roomに"users"を保存させるようにする。
  height?: number
  width?: number
  fullWidth?: boolean
  disabled?: boolean
  onPress?: (room: Room) => void
}

const RoomCard: React.FC<Props> = ({
  room,
  width = 300,
  height = 80,
  fullWidth = false,
  disabled = false,
  onPress
}) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const { uid } = useAuthState()

  // MEMO: 自分以外のユーザーデータ取得
  const filteredUsers = useMemo(() => {
    return room.users.filter(user => user.uid !== uid)
  }, [room.users, uid])

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress(room)}
      style={[styles.container, { width: fullWidth ? '100%' : width, height }]}
    >
      <View style={styles.head}>
        <View style={styles.usersWrapper}>
          {filteredUsers.map((user, index) => (
            <View key={user.uid} style={index === 0 ? styles.thumbnailWrapper : styles.subThumbnailWrapper}>
              <ShadowBase>
                <Thumbnail size={55} uri={user.thumbnailURL} />
              </ShadowBase>
            </View>
          ))}
        </View>

        {room.newMessage && (
          <View style={styles.messageWrapper}>
            <View>
              <Text style={styles.nameText}>{room.newMessage.user.name}</Text>
            </View>
            <View>
              <Text style={styles.messageText}>{room.newMessage.text}</Text>
            </View>
          </View>
        )}

        {!room.newMessage && (
          <View style={styles.messageWrapper}>
            <View style={styles.emptyMessageWrapper}>
              <Text style={styles.emptyMessageText}>あいさつしてみよう！</Text>
            </View>
          </View>
        )}
      </View>
      <View style={styles.tail}>
        {room.newMessage && (
          <>
            <View style={styles.timeIconWrapper}>
              <Icons name="time" color={colors.foregrounds.secondary} size={15} />
            </View>
            <Text style={styles.dateText}>{formattedDateForMessageCreatedAt(room.newMessage.createdAt)}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 10,
      padding: 12,
      backgroundColor: colors.backgrounds.secondary
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
    usersWrapper: {
      display: 'flex',
      flexDirection: 'row',
      paddingRight: 10
    },
    thumbnailWrapper: {},
    subThumbnailWrapper: {
      marginLeft: -16
    },
    messageWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 55,
      paddingVertical: 8
    },
    emptyMessageWrapper: {
      display: 'flex',
      height: '100%',
      justifyContent: 'center'
    },
    timeIconWrapper: {
      paddingRight: 6
    },
    nameText: {
      color: colors.foregrounds.primary,
      fontSize: 16
    },
    messageText: {
      color: colors.foregrounds.secondary,
      fontSize: 12
    },
    emptyMessageText: {
      color: colors.foregrounds.secondary,
      fontSize: 14
    },
    dateText: {
      color: colors.foregrounds.secondary,
      fontSize: 14
    }
  })

export default RoomCard
