import React, { useCallback, useRef } from 'react'
import { View, FlatList, StyleSheet, Dimensions } from 'react-native'
import Animated, { Value, Extrapolate, interpolate } from 'react-native-reanimated'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useStackNavigation } from '../services/route'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useSafeArea } from 'react-native-safe-area-context'
import { RouteParams } from '../navigators/RouteProps'
import { useAppAuthState } from '../store/hooks'
import { MakeStyles, useStyles } from '../services/design'
import { useMessages, useSendMessage } from '../services/chat'
import { NormalLayout } from '../components/templates'
import { ShadowBase } from '../components/atoms'
import { ChatBubble, ChatInput, Header } from '../components/organisms'
import { User } from '../entities'

const HEADER_HEIGHT = 50 + 24 + 6 // height + paddingTop + paddingBottom
const TAB_HEIGHT = 70 // height
const ON_END_REACHED_THRESHOLD = 1

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const ChatScreen = () => {
  const { uid } = useAppAuthState()
  const navigation = useStackNavigation()
  const inset = useSafeArea()
  const route = useRoute<RouteProp<RouteParams, 'Chat'>>()
  const roomID = route.params.roomID
  const { fetching, messages, onNext } = useMessages(roomID)
  const { onSend } = useSendMessage(roomID)
  const styles = useStyles(makeStyles)

  const onPressAvatar = useCallback(
    (user: User) => {
      navigation.push('User', { userID: user.id })
    },
    [navigation]
  )

  const scrollY = useRef(new Value<number>(0))

  const hbOpacity = useRef(
    interpolate(scrollY.current, {
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP
    })
  )

  const onEndReachedCalled = useRef(false)

  const onEndReached = useCallback(async () => {
    if (fetching || onEndReachedCalled.current) return
    onEndReachedCalled.current = true
    await onNext()
    onEndReachedCalled.current = false
  }, [fetching, onNext])

  return (
    <NormalLayout fetching={fetching}>
      <View style={styles.container}>
        <View style={[styles.headerContainer, { paddingTop: 24 + inset.top }]}>
          <View style={styles.headerInner}>
            <Header fullWidth={true} title="トークルーム" />
          </View>
        </View>

        <Animated.View style={[styles.headerBackground, { paddingTop: 24 + inset.top, opacity: hbOpacity.current }]} />

        <AnimatedFlatList
          style={[styles.scrollView, { paddingTop: HEADER_HEIGHT + inset.top + 24 }]}
          showsVerticalScrollIndicator={false}
          inverted={-1} // MEMO: 上下逆さまにしている。
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY.current
                }
              }
            }
          ])}
          onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
          onEndReached={onEndReached}
          data={messages}
          renderItem={({ item }) => {
            const isMy = item.user.uid === uid

            return (
              <View key={item.id} style={isMy ? styles.myBubbleContainer : styles.bubbleContainer}>
                <ShadowBase>
                  <ChatBubble message={item} isMy={isMy} onPressAvatar={onPressAvatar} />
                </ShadowBase>
              </View>
            )
          }}
          // ListEmptyComponent={() => {
          //   if (!fetching && messages.length === 0) {
          //     return (
          //       <View style={styles.emptyMessageContainer}>
          //         <Text style={styles.emptyMessageText}>あいさつしてみよう！</Text>
          //       </View>
          //     )
          //   }

          //   return null
          // }}
          ListFooterComponent={() => <View style={{ paddingBottom: inset.top + HEADER_HEIGHT + 200 }} />}
          ListHeaderComponent={() => (
            <View
              style={{
                paddingBottom: messages.length > 3 ? inset.bottom + TAB_HEIGHT + 200 : inset.bottom + TAB_HEIGHT + 400
              }}
            />
          )}
        />

        <View style={[styles.tabContainer, { paddingBottom: inset.bottom }]}>
          <ShadowBase intensity={2}>
            <ChatInput fullWidth={true} onSend={onSend} />
          </ShadowBase>
          <KeyboardSpacer />
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
      height: 124,
      backgroundColor: colors.backgrounds.tertiary
    },
    headerInner: {
      paddingHorizontal: 36
    },
    scrollView: {},
    emptyMessageContainer: {
      width: '100%',
      height: 400,
      justifyContent: 'center',
      alignItems: 'center'
    },
    bubbleContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: 12,
      paddingBottom: 20
    },
    myBubbleContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: 12,
      paddingBottom: 20
    },
    tabContainer: {
      position: 'absolute',
      bottom: 0,
      width: fullWidth,
      paddingHorizontal: 12
    },
    emptyMessageText: {
      fontSize: 16,
      color: colors.foregrounds.secondary
    }
  })

export default ChatScreen
