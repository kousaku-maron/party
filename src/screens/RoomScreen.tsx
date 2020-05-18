import React, { useCallback, useState, useRef, useMemo } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import Animated, { Value, Extrapolate, interpolate } from 'react-native-reanimated'
import { useSafeArea } from 'react-native-safe-area-context'
import { useAppAuthState } from '../store/hooks'
import { useStackNavigation } from '../services/route'
import { useColors, useStyles, MakeStyles } from '../services/design'
import { useLayoutTransitions } from '../services/ui'
import { useRooms, useCreateRoomTools } from '../services/room'
import { useSendMessage } from '../services/chat'
import { useFriends } from '../services/friend'
import { ShadowBase, BlurView } from '../components/atoms'
import {
  RoomCard,
  CheckUserListItem,
  Header,
  BottomTab,
  ChatInput,
  MessageFlatList,
  ListItemTransition,
  HeaderIconTransition
} from '../components/organisms'
import { NormalLayout } from '../components/templates'
import { Room, User } from '../entities'
import { Icons } from '../@assets/vector-icons'
import { AntDesign } from '@expo/vector-icons'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)
const AnimatedMessageFlatList = Animated.createAnimatedComponent(MessageFlatList)

const HEADER_HEIGHT = 50 + 24 + 6 // height + paddingTop + paddingBottom
// const TAB_HEIGHT = 70 // height

type Layout = 'rooms' | 'createRoom' | 'chat'

const RoomScreen = () => {
  const { uid } = useAppAuthState()
  const navigation = useStackNavigation()
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const inset = useSafeArea()
  const { fetching: fetchingRooms, rooms } = useRooms()
  const { fetching: fetchingFriends, friends } = useFriends(uid)
  const { selectedUsers, onCheckUser, onCreateRoom: createRoom } = useCreateRoomTools()
  const { onSend } = useSendMessage()
  const [selectedRoomID, setSelectedRoomID] = useState<string | null>(null)

  const { activeLayout, showLayout, onAnimationTo } = useLayoutTransitions<Layout>('rooms')

  const isActiveRooms = useMemo(() => activeLayout === 'rooms', [activeLayout])
  const isActiveCreateRoom = useMemo(() => activeLayout === 'createRoom', [activeLayout])
  const isActiveChat = useMemo(() => activeLayout === 'chat', [activeLayout])
  const isShowRooms = useMemo(() => showLayout === 'rooms', [showLayout])
  const isShowCreateRoom = useMemo(() => showLayout === 'createRoom', [showLayout])
  const isShowChat = useMemo(() => showLayout === 'chat', [showLayout])

  const onPressRoomCard = useCallback(
    (room: Room) => {
      setSelectedRoomID(room.id)
      onAnimationTo('chat', { delay: 200 })
    },
    [onAnimationTo]
  )

  const onPressAvatar = useCallback(
    (user: User) => {
      navigation.push('User', { userID: user.id })
    },
    [navigation]
  )

  const onCreateRoom = useCallback(async () => {
    if (selectedUsers.length === 0) {
      return alert('ユーザーを選択してください。')
    }

    createRoom()
    onAnimationTo('rooms', { delay: 200 })
  }, [createRoom, onAnimationTo, selectedUsers.length])

  const scrollY = useRef(new Value<number>(0))

  const hbOpacity = useRef(
    interpolate(scrollY.current, {
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP
    })
  )

  return (
    <NormalLayout fetching={fetchingRooms || fetchingFriends}>
      <View style={styles.container}>
        <View style={[styles.headerContainer, { paddingTop: 24 + inset.top }]}>
          <View style={styles.headerInner}>
            <Header
              fullWidth={true}
              title="トークルーム"
              renderLeft={() => {
                // -------------------------------------------------
                // Create Room Header Left Icon
                // -------------------------------------------------
                if (isActiveCreateRoom) {
                  return (
                    <HeaderIconTransition isShow={isShowCreateRoom}>
                      <TouchableOpacity onPress={() => onAnimationTo('rooms', { delay: 200 })}>
                        <AntDesign name="arrowleft" color={colors.foregrounds.primary} size={28} />
                      </TouchableOpacity>
                    </HeaderIconTransition>
                  )
                }

                // -------------------------------------------------
                // Chat Header Left Icon
                // -------------------------------------------------
                if (isActiveChat) {
                  return (
                    <HeaderIconTransition isShow={isShowChat}>
                      <TouchableOpacity onPress={() => onAnimationTo('rooms')}>
                        <AntDesign name="arrowleft" color={colors.foregrounds.primary} size={28} />
                      </TouchableOpacity>
                    </HeaderIconTransition>
                  )
                }
              }}
              renderRight={() => {
                // -------------------------------------------------
                // Room Header Right Icon
                // -------------------------------------------------
                if (isActiveRooms) {
                  return (
                    <HeaderIconTransition isShow={isShowRooms}>
                      <TouchableOpacity onPress={() => onAnimationTo('createRoom', { delay: 200 })}>
                        <Icons name="chat-plus" color={colors.foregrounds.primary} size={28} />
                      </TouchableOpacity>
                    </HeaderIconTransition>
                  )
                }

                // -------------------------------------------------
                // Create Room Header Right Icon
                // -------------------------------------------------
                if (isActiveCreateRoom) {
                  return (
                    <HeaderIconTransition isShow={isShowCreateRoom}>
                      <TouchableOpacity onPress={onCreateRoom}>
                        <Text style={styles.createText}>作成</Text>
                      </TouchableOpacity>
                    </HeaderIconTransition>
                  )
                }
              }}
            />
          </View>
        </View>

        <AnimatedBlurView
          style={[styles.headerBackground, { paddingTop: 24 + inset.top, opacity: hbOpacity.current }]}
        />

        {/*
          -------------------------------------------------
          Room ScrollView
          -------------------------------------------------
        */}
        {isActiveRooms && (
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
            {!fetchingRooms && rooms.length === 0 && (
              <View style={styles.emptyMessageContainer}>
                <Text style={styles.emptyMessageText}>ルームがまだありません</Text>
              </View>
            )}

            {rooms.length > 0 &&
              rooms.map(room => (
                <ListItemTransition key={room.id} isShow={isShowRooms}>
                  <View style={styles.cardWrapper}>
                    <ShadowBase>
                      <RoomCard room={room} onPress={onPressRoomCard} fullWidth={true} />
                    </ShadowBase>
                  </View>
                </ListItemTransition>
              ))}

            {/* MEMO: tab height 70px */}
            <View style={{ paddingBottom: inset.bottom + 70 + 200 }} />
          </Animated.ScrollView>
        )}

        {/*
          -------------------------------------------------
          Create Room ScrollView
          -------------------------------------------------
        */}
        {isActiveCreateRoom && (
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
            {!fetchingFriends && friends.length === 0 && (
              <View style={styles.emptyMessageContainer}>
                <Text style={styles.emptyMessageText}>ともだちがまだいません</Text>
              </View>
            )}

            {friends.length > 0 &&
              friends.map(friend => (
                <ListItemTransition key={friend.id} isShow={isShowCreateRoom}>
                  <View style={styles.cardWrapper}>
                    <ShadowBase>
                      <CheckUserListItem
                        user={friend}
                        checked={!!selectedUsers.find(user => user.uid === friend.uid)}
                        onPress={onCheckUser}
                      />
                    </ShadowBase>
                  </View>
                </ListItemTransition>
              ))}

            {/* MEMO: tab height 70px */}
            <View style={{ paddingBottom: inset.bottom + 70 + 200 }} />
          </Animated.ScrollView>
        )}

        {/*
          -------------------------------------------------
          Chat ScrollView
          -------------------------------------------------
        */}
        {isActiveChat && (
          <AnimatedMessageFlatList
            roomID={selectedRoomID}
            onPressAvatar={onPressAvatar}
            style={[styles.scrollView, { paddingTop: HEADER_HEIGHT + inset.top + 24 }]}
            scrollEventThrottle={16}
            onScroll={Animated.event([
              {
                nativeEvent: { contentOffset: { y: scrollY.current } }
              }
            ])}
          />
        )}

        {/* TODO: タブ切り替えアニメーション追加予定 */}
        <View style={[styles.tabContainer, { paddingBottom: inset.bottom }]}>
          <ShadowBase>
            {isActiveRooms && <BottomTab fullWidth={true} />}
            {isActiveChat && <ChatInput fullWidth={true} onSend={text => onSend(selectedRoomID, text)} />}
          </ShadowBase>
        </View>
      </View>
    </NormalLayout>
  )
}

const fullWidth = Dimensions.get('window').width

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
    tabContainer: {
      position: 'absolute',
      bottom: 0,
      width: fullWidth,
      paddingHorizontal: 24
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
