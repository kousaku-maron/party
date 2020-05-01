import React, { useCallback } from 'react'
import { View, ScrollView, StyleSheet, Dimensions, Text } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useStackNavigation } from '../services/route'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useSafeArea } from 'react-native-safe-area-context'
import { RouteParams } from '../navigators/RouteProps'
import { useAuthState } from '../store/hooks'
import { MakeStyles, useStyles } from '../services/design'
import { useMessages, useSendMessage } from '../services/chat'
import { BottomTabLayout } from '../components/templates'
import { ShadowBase } from '../components/atoms'
import { ChatBubble, ChatInput, Header } from '../components/organisms'
import { User } from '../entities'

const ChatScreen = () => {
  const { uid } = useAuthState()
  const navigation = useStackNavigation()
  const inset = useSafeArea()
  const route = useRoute<RouteProp<RouteParams, 'Chat'>>()
  const roomID = route.params.roomID
  const { fetching, messages } = useMessages(roomID)
  const { onSend } = useSendMessage(roomID)
  const styles = useStyles(makeStyles)

  const onPressAvatar = useCallback(
    (user: User) => {
      navigation.push('User', { userID: user.id })
    },
    [navigation]
  )

  return (
    <BottomTabLayout fetching={fetching}>
      <View style={styles.container}>
        <ScrollView
          style={[styles.scrollView, { paddingTop: inset.top }]}
          stickyHeaderIndices={[1]}
          // メッセージは、スクロールできる長さが不確実なためインジゲーターを表示させることにしている。
          // showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerTopSpacer} />

          <View style={styles.headerContainer}>
            <Header />
          </View>

          {!fetching && messages.length === 0 && (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>あいさつしてみよう！</Text>
            </View>
          )}

          {messages.map(message => {
            const isMy = message.user.uid === uid

            return (
              <View key={message.id} style={isMy ? styles.myBubbleContainer : styles.bubbleContainer}>
                <ShadowBase>
                  <ChatBubble message={message} isMy={isMy} onPressAvatar={onPressAvatar} />
                </ShadowBase>
              </View>
            )
          })}

          {/* MEMO: tab height 70px */}
          <View style={{ paddingBottom: inset.bottom + 70 + 200 }} />
        </ScrollView>

        <View style={[styles.tabContainer, { paddingBottom: inset.bottom }]}>
          <ShadowBase intensity={2}>
            <ChatInput fullWidth={true} onSend={onSend} />
          </ShadowBase>
          <KeyboardSpacer />
        </View>
      </View>
    </BottomTabLayout>
  )
}

const fullWidth = Dimensions.get('window').width

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgrounds.primary
    },
    scrollView: {
      display: 'flex',
      width: '100%',
      height: '100%'
    },
    headerContainer: {
      width: '100%',
      paddingHorizontal: 24
    },
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
      paddingRight: 14,
      paddingBottom: 20
    },
    tabContainer: {
      position: 'absolute',
      bottom: 0,
      width: fullWidth,
      paddingHorizontal: 24
    },
    headerTopSpacer: {
      paddingBottom: 36
    },
    emptyMessageText: {
      fontSize: 16,
      color: colors.foregrounds.secondary
    }
  })

export default ChatScreen
