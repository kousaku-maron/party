import React, { useCallback } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { useRoomsWithUser } from '../../services/room'
import { useStyles, MakeStyles } from '../../services/design'
import { RoomListItem } from '../../components/organisms'

type OwnProps = { onPressItem: (roomID: string) => void }
type Props = OwnProps

const ChatRoomListPage = ({ onPressItem }: Props) => {
  const roomsWithUser = useRoomsWithUser()
  const styles = useStyles(makeStyles)

  const onPress = useCallback(
    (roomID: string) => {
      if (!onPressItem) return
      onPressItem(roomID)
    },
    [onPressItem]
  )

  return (
    <ScrollView>
      {roomsWithUser.map(roomWithUser => (
        <React.Fragment key={roomWithUser.id}>
          <RoomListItem
            users={roomWithUser.users}
            onPress={() => {
              onPress(roomWithUser.id)
            }}
          />
          <View style={styles.divider} />
        </React.Fragment>
      ))}
    </ScrollView>
  )
}

const hairlineWidth = StyleSheet.hairlineWidth

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    divider: {
      borderBottomColor: colors.foregrounds.separator,
      borderBottomWidth: hairlineWidth
    }
  })

export default ChatRoomListPage
