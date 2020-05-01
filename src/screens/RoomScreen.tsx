import React, { useCallback } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native'
import { useStackNavigation } from '../services/route'
import { useSafeArea } from 'react-native-safe-area-context'
import { useColors, useStyles, MakeStyles } from '../services/design'
import { useRoomsWithUser } from '../services/room'
import { ShadowBase } from '../components/atoms'
import { RoomCard, Header } from '../components/organisms'
import { BottomTabLayout } from '../components/templates'
import { Room } from '../entities'
import { Icons } from '../@assets/vector-icons'

const RoomScreen = () => {
  const navigation = useStackNavigation()
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const inset = useSafeArea()
  const { fetching, roomsWithUser } = useRoomsWithUser() // TODO: roomに"users"を保存させるので、"useRooms"に変える。

  const onPressCard = useCallback(
    (room: Room) => {
      navigation.push('Chat', { roomID: room.id })
    },
    [navigation]
  )

  return (
    <BottomTabLayout fetching={fetching}>
      <View style={styles.container}>
        <ScrollView
          style={[styles.scrollView, { paddingTop: inset.top }]}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerTopSpacer} />

          <View style={styles.headerContainer}>
            <Header
              fullWidth={true}
              title="トークルーム"
              renderRight={() => (
                <TouchableOpacity style={styles.chatPlusIconWrapper}>
                  <Icons name="chat-plus" color={colors.foregrounds.primary} size={24} />
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.headerBottomSpacer} />

          {!fetching && roomsWithUser.length === 0 && (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>ルームがまだありません</Text>
            </View>
          )}

          {roomsWithUser.length > 0 && (
            <React.Fragment>
              {roomsWithUser.map(roomWithUser => (
                <View key={roomWithUser.id} style={styles.cardWrapper}>
                  <ShadowBase>
                    <RoomCard room={roomWithUser} onPress={onPressCard} fullWidth={true} />
                  </ShadowBase>
                </View>
              ))}

              {/* MEMO: tab height 70px */}
              <View style={{ paddingBottom: inset.bottom + 70 + 200 }} />
            </React.Fragment>
          )}
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
    emptyMessageContainer: {
      width: '100%',
      height: 400,
      justifyContent: 'center',
      alignItems: 'center'
    },
    chatPlusIconWrapper: {},
    cardWrapper: {
      width: '100%',
      paddingBottom: 20
    },
    headerContainer: {
      width: '100%',
      paddingHorizontal: 24
    },
    headerTopSpacer: {
      paddingBottom: 36
    },
    headerBottomSpacer: {
      paddingBottom: 20
    },
    emptyMessageText: {
      fontSize: 16,
      color: colors.foregrounds.secondary
    }
  })

export default RoomScreen
