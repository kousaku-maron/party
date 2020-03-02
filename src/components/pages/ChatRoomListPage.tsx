import React, { useCallback } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { useRoomsWithUser } from '../../services/room'
import { useStyles, MakeStyles } from '../../services/design'
import { Room } from '../../entities'
import { ShadowBase } from '../../components/atoms'
import { RoomCard } from '../../components/organisms'

type OwnProps = { onPress: (roomID: string) => void }
type Props = OwnProps

const ChatRoomListPage = ({ onPress }: Props) => {
  const roomsWithUser = useRoomsWithUser() // TODO: roomに"users"を保存させるので、"useRooms"に変える。
  const styles = useStyles(makeStyles)

  const onPressCard = useCallback(
    (room: Room) => {
      if (!onPress) return
      onPress(room.id)
    },
    [onPress]
  )

  return (
    <ScrollView style={styles.scrollView}>
      {roomsWithUser.map(roomWithUser => (
        <View key={roomWithUser.id} style={styles.cardWrapper}>
          <ShadowBase>
            <RoomCard room={roomWithUser} onPress={onPressCard} fullWidth={true} />
          </ShadowBase>
        </View>
      ))}
    </ScrollView>
  )
}

const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    scrollView: {
      width: '100%',
      paddingVertical: 24,
      paddingHorizontal: 12
    },
    cardWrapper: {
      width: '100%',
      paddingBottom: 10
    }
  })

export default ChatRoomListPage
