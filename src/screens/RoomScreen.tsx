import React, { useCallback, useState, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Animated, { Value } from 'react-native-reanimated'
import { useSafeArea } from 'react-native-safe-area-context'
import { useAppAuthState } from '../store/hooks'
import { useStackNavigation } from '../services/route'
import { useColors, useStyles, MakeStyles } from '../services/design'
import { useRooms, useCreateRoomTools } from '../services/room'
import { useFriends } from '../services/friend'
import { ShadowBase, Fab, BlurView } from '../components/atoms'
import { RoomCard, UserCard, Header, ListItemTransition, HeaderIconTransition } from '../components/organisms'
import { BottomTabLayout } from '../components/templates'
import { Room, User } from '../entities'
import { Icons } from '../@assets/vector-icons'
import { AntDesign } from '@expo/vector-icons'

const HEADER_HEIGHT = 50 + 24 + 6 // height + paddingTop + paddingBottom

type ListItemProps = {
  user: User
  checked: boolean
  onPress: (user: User) => void
}

const UserListItem = ({ user, checked, onPress }: ListItemProps) => {
  const colors = useColors()

  return (
    <UserCard
      user={user}
      onPress={onPress}
      fullWidth={true}
      renderRight={() => {
        if (checked) {
          return (
            <Fab color={colors.backgrounds.secondary}>
              <Icons color={colors.tints.primary.main} name="check" size={24} />
            </Fab>
          )
        }
      }}
    />
  )
}

const RoomScreen = () => {
  const { uid } = useAppAuthState()
  const navigation = useStackNavigation()
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const inset = useSafeArea()
  const { fetching: fetchingRooms, rooms } = useRooms()
  const { fetching: fetchingFriends, friends } = useFriends(uid)
  const { selectedUsers, onSwitchUser, onCreateRoom } = useCreateRoomTools()

  const onPressCard = useCallback(
    (room: Room) => {
      navigation.push('Chat', { roomID: room.id })
    },
    [navigation]
  )

  const [isShowRooms, setIsShowRooms] = useState<boolean>(true)
  const [isShowCreateRoom, setIsShowCreateRoom] = useState<boolean>(false)
  const [isActiveCreateRoom, setIsActiveCreateRoom] = useState<boolean>(false)
  const [isActiveRooms, setIsActiveRooms] = useState<boolean>(true)

  const onSwitchCreateRoom = useCallback(() => {
    setIsShowRooms(false)
    setIsShowCreateRoom(true)
  }, [])

  const onSwitchRooms = useCallback(() => {
    setIsShowCreateRoom(false)
    setIsShowRooms(true)
  }, [])

  const onCreateAndSwitchRoom = useCallback(async () => {
    if (selectedUsers.length === 0) {
      return alert('ユーザーを選択してください。')
    }

    onCreateRoom()
    onSwitchRooms()
  }, [onCreateRoom, onSwitchRooms, selectedUsers.length])

  const scrollY = useRef(new Value<number>(0))

  return (
    <BottomTabLayout fetching={fetchingRooms || fetchingFriends}>
      <View style={styles.container}>
        <View style={[styles.headerContainer, { paddingTop: 24 + inset.top }]}>
          <View style={styles.headerInner}>
            <Header
              fullWidth={true}
              title="トークルーム"
              renderLeft={() => {
                // -------------------------------------------------
                // Create Room Header Icon
                // -------------------------------------------------
                if (isActiveCreateRoom) {
                  return (
                    <HeaderIconTransition isShow={isShowCreateRoom}>
                      <TouchableOpacity onPress={onSwitchRooms}>
                        <AntDesign name="arrowleft" color={colors.foregrounds.primary} size={28} />
                      </TouchableOpacity>
                    </HeaderIconTransition>
                  )
                }
              }}
              renderRight={() => {
                // -------------------------------------------------
                // Room List Header Icon
                // -------------------------------------------------
                if (isActiveRooms) {
                  return (
                    <HeaderIconTransition isShow={isShowRooms}>
                      <TouchableOpacity onPress={onSwitchCreateRoom}>
                        <Icons name="chat-plus" color={colors.foregrounds.primary} size={28} />
                      </TouchableOpacity>
                    </HeaderIconTransition>
                  )
                }

                // -------------------------------------------------
                // Create Room Header Icon
                // -------------------------------------------------
                if (isActiveCreateRoom) {
                  return (
                    <HeaderIconTransition isShow={isShowCreateRoom}>
                      <TouchableOpacity onPress={onCreateAndSwitchRoom}>
                        <Text style={styles.createText}>作成</Text>
                      </TouchableOpacity>
                    </HeaderIconTransition>
                  )
                }
              }}
            />
          </View>
        </View>

        <BlurView style={[styles.headerBackground, { paddingTop: 24 + inset.top }]} />

        <Animated.ScrollView
          style={[styles.scrollView, { paddingTop: HEADER_HEIGHT + inset.top + 24 }]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY.current } }
            }
          ])}
        >
          {/*
            -------------------------------------------------
            Room List ScrollView Items
            -------------------------------------------------
          */}
          {isActiveRooms && !fetchingRooms && rooms.length === 0 && (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>ルームがまだありません</Text>
            </View>
          )}

          {isActiveRooms &&
            rooms.length > 0 &&
            rooms.map(room => (
              <ListItemTransition
                key={room.id}
                isShow={isShowRooms}
                onAnimationEnd={() => {
                  if (isShowRooms) return
                  setIsActiveRooms(false)
                  setIsActiveCreateRoom(true)
                }}
              >
                <View style={styles.cardWrapper}>
                  <ShadowBase>
                    <RoomCard room={room} onPress={onPressCard} fullWidth={true} />
                  </ShadowBase>
                </View>
              </ListItemTransition>
            ))}

          {/*
            -------------------------------------------------
            Create Room ScrollView Items
            -------------------------------------------------
          */}
          {isActiveCreateRoom && !fetchingFriends && friends.length === 0 && (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>ともだちがまだいません</Text>
            </View>
          )}

          {isActiveCreateRoom &&
            friends.length > 0 &&
            friends.map(friend => (
              <ListItemTransition
                key={friend.id}
                isShow={isShowCreateRoom}
                onAnimationEnd={() => {
                  if (isShowCreateRoom) return
                  setIsActiveCreateRoom(false)
                  setIsActiveRooms(true)
                }}
              >
                <View style={styles.cardWrapper}>
                  <ShadowBase>
                    <UserListItem
                      user={friend}
                      checked={!!selectedUsers.find(user => user.uid === friend.uid)}
                      onPress={onSwitchUser}
                    />
                  </ShadowBase>
                </View>
              </ListItemTransition>
            ))}

          {/* MEMO: tab height 70px */}
          <View style={{ paddingBottom: inset.bottom + 70 + 200 }} />
        </Animated.ScrollView>
      </View>
    </BottomTabLayout>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgrounds.primary
    },
    headerContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      zIndex: 1000,
      elevation: 1000,
      paddingBottom: 6
    },
    headerBackground: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      zIndex: 999,
      elevation: 999,
      paddingBottom: 6,
      height: 124
    },
    headerInner: {
      paddingHorizontal: 36
    },
    scrollView: {
      height: '100%'
    },
    emptyMessageContainer: {
      height: 400,
      justifyContent: 'center',
      alignItems: 'center'
    },
    cardWrapper: {
      width: '100%',
      paddingBottom: 20,
      paddingHorizontal: 12
    },
    emptyMessageText: {
      fontSize: 16,
      color: colors.foregrounds.secondary
    },
    createText: {
      color: colors.tints.primary.main,
      fontSize: 18
    }
  })

export default RoomScreen
