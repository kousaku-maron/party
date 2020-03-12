import React, { useCallback } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStyles, MakeStyles } from '../services/design'
import { useRoomsWithUser } from '../services/room'
import { ShadowBase } from '../components/atoms'
import { RoomCard, Header } from '../components/organisms'
import { BottomTabLayout } from '../components/templates'
import { Room } from '../entities'

const RoomScreen = () => {
  const navigation = useNavigation()
  const styles = useStyles(makeStyles)
  const inset = useSafeArea()
  const roomsWithUser = useRoomsWithUser() // TODO: roomに"users"を保存させるので、"useRooms"に変える。

  const onPressCard = useCallback(
    (room: Room) => {
      navigation.navigate('Chat', { roomID: room.id })
    },
    [navigation]
  )

  return (
    <BottomTabLayout>
      <View style={styles.container}>
        <ScrollView
          style={[styles.scrollView, { paddingTop: inset.top }]}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerTopSpacer} />

          <View style={styles.headerContainer}>
            <Header fullWidth={true} title="トークルーム" />
          </View>

          <View style={styles.headerBottomSpacer} />

          {roomsWithUser.map(roomWithUser => (
            <View key={roomWithUser.id} style={styles.cardWrapper}>
              <ShadowBase>
                <RoomCard room={roomWithUser} onPress={onPressCard} fullWidth={true} />
              </ShadowBase>
            </View>
          ))}
        </ScrollView>
      </View>
    </BottomTabLayout>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgrounds.primary
    },
    scrollView: {
      width: '100%',
      paddingHorizontal: 12
    },
    cardWrapper: {
      width: '100%',
      paddingBottom: 20
    },
    headerContainer: {
      width: '100%',
      paddingHorizontal: 24
    },
    headerTopSpacer: {
      paddingBottom: 48
    },
    headerBottomSpacer: {
      paddingBottom: 20
    }
  })

export default RoomScreen
