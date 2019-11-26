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
      <View style={styles.bubbleWrapper}>
        {props.currentMessage.user._id !== uid && <Text style={styles.username}>{props.currentMessage.user.name}</Text>}
        <CustomBubble
          {...props}
          containerStyle={{
            left: { paddingTop: 8 },
            right: { paddingTop: 8 }
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
      styles.bubbleWrapper,
      styles.createdAt,
      styles.pinnedLeft,
      styles.pinnedRight,
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
    bubbleWrapper: {
      position: 'relative'
    },
    pinnedRight: {
      position: 'absolute',
      bottom: 0,
      right: 35
    },
    pinnedLeft: {
      position: 'absolute',
      bottom: 0,
      left: 35
    },
    username: {
      fontSize: 16,
      backgroundColor: 'transparent',
      color: colors.foregrounds.secondary
    },
    createdAt: {
      fontSize: 8,
      backgroundColor: 'transparent',
      color: colors.foregrounds.secondary
    }
  })

export default ChatScreen
