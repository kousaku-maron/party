import React, { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { useStyles, MakeStyles } from '../services/design'
import { formattedDateForMessageCreatedAt } from '../services/formatedDate'
import { useGiftedhatTools } from '../services/chat'
import { headerNavigationOptions } from '../navigators/options'
import { useAuthState } from '../store/hooks'
import { GiftedChat, Bubble, Avatar } from 'react-native-gifted-chat'
import { useColors } from '../services/design'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps

const ChatScreen = ({ navigation }: Props) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const { uid } = useAuthState()
  const roomID = navigation.state.params.roomID

  const { messages, onSend, onQuickReply } = useGiftedhatTools(roomID)

  // MEMO: "Type instantiation is excessively deep and possibly infinite."のエラー回避のため、ラップしている。
  const CustomBubble = useCallback(props => {
    return <Bubble {...props} />
  }, [])

  const renderBubble = useCallback(
    props => (
      <View style={props.currentMessage.user._id === uid ? styles.bubbleRightWrapper : styles.bubbleLeftWrapper}>
        {props.currentMessage.user._id !== uid && <Text style={styles.username}>{props.currentMessage.user.name}</Text>}
        <CustomBubble
          {...props}
          containerStyle={{
            left: { paddingTop: 3 },
            right: { paddingTop: 3 }
          }}
          containerToPreviousStyle={{ left: { borderTopLeftRadius: 15 }, right: { borderTopRightRadius: 15 } }}
          containerToNextStyle={{ left: { borderBottomLeftRadius: 15 }, right: { borderBottomRightRadius: 15 } }}
          wrapperStyle={{
            left: { backgroundColor: colors.backgrounds.secondary, padding: 3 },
            right: { backgroundColor: colors.tints.primary.light, padding: 3 }
          }}
          textStyle={{
            left: { color: colors.foregrounds.primary },
            right: { color: colors.foregrounds.onTintPrimary }
          }}
          renderTime={() => {
            return null
          }}
        />
        {props.currentMessage.user._id === uid ? (
          <View style={styles.rightTriangle} />
        ) : (
          <View style={styles.leftTriangle} />
        )}
        <View style={props.currentMessage.user._id !== uid ? styles.pinnedRight : styles.pinnedLeft}>
          <Text style={styles.createdAt}>{formattedDateForMessageCreatedAt(props.currentMessage.createdAt)}</Text>
        </View>
      </View>
    ),
    [
      colors.backgrounds.secondary,
      colors.foregrounds.onTintPrimary,
      colors.foregrounds.primary,
      colors.tints.primary.light,
      styles.bubbleLeftWrapper,
      styles.bubbleRightWrapper,
      styles.createdAt,
      styles.leftTriangle,
      styles.pinnedLeft,
      styles.pinnedRight,
      styles.rightTriangle,
      styles.username,
      uid
    ]
  )

  const renderAvatar = useCallback(props => {
    return <Avatar {...props} />
  }, [])

  return (
    <View style={styles.flex}>
      <GiftedChat
        placeholder="メッセージを入力"
        messages={messages}
        alwaysShowSend={true}
        onSend={onSend}
        onQuickReply={onQuickReply}
        user={{ _id: uid }}
        renderBubble={renderBubble}
        renderAvatarOnTop={true}
        showAvatarForEveryMessage={true}
        renderAvatar={renderAvatar}
        isKeyboardInternallyHandled={false}
      />
      <KeyboardSpacer />
    </View>
  )
}

ChatScreen.navigationOptions = (props: NavigationStackScreenProps) =>
  headerNavigationOptions({ ...props, title: 'トークルーム' })

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    flex: {
      flex: 1
    },
    bubbleRightWrapper: {
      position: 'relative',
      maxWidth: '80%',
      paddingBottom: 6,
      paddingRight: 6
    },
    bubbleLeftWrapper: {
      position: 'relative',
      maxWidth: '80%',
      paddingBottom: 6
    },
    pinnedRight: {
      position: 'absolute',
      bottom: 12,
      right: 32
    },
    pinnedLeft: {
      position: 'absolute',
      bottom: 12,
      left: 32
    },
    username: {
      fontSize: 10.5,
      backgroundColor: 'transparent',
      color: colors.foregrounds.secondary
    },
    createdAt: {
      fontSize: 8,
      backgroundColor: 'transparent',
      color: colors.foregrounds.secondary
    },
    rightTriangle: {
      position: 'absolute',
      top: 12,
      right: -10 + 6,
      width: 0,
      height: 0,
      borderTopColor: colors.tints.primary.light,
      borderTopWidth: 16,
      borderBottomColor: 'transparent',
      borderBottomWidth: 16,
      borderRightColor: 'transparent',
      borderRightWidth: 16
    },
    leftTriangle: {
      position: 'absolute',
      top: 24,
      left: -10,
      width: 0,
      height: 0,
      borderTopColor: colors.backgrounds.secondary,
      borderTopWidth: 16,
      borderBottomColor: 'transparent',
      borderBottomWidth: 16,
      borderLeftColor: 'transparent',
      borderLeftWidth: 16
    }
  })

export default ChatScreen
