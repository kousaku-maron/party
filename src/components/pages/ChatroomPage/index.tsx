import React from 'react'
import { View, StyleSheet } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useStyles, MakeStyles } from '../../../services/design'
import { CustomBubble } from './Bubble'
import { CustomAvatar } from './Avatar'
import { useGiftedhatTools } from '../../../services/chat'
import { useAuthState } from '../../../store/hooks'
import { GiftedChat } from 'react-native-gifted-chat'

type OwnProps = { roomID: string }
type Props = OwnProps

const ChatroomPage = ({ roomID }: Props) => {
  const styles = useStyles(makeStyles)

  const { uid } = useAuthState()
  const { messages, onSend, onQuickReply } = useGiftedhatTools(roomID)

  return (
    <View style={styles.flex}>
      <GiftedChat
        placeholder="メッセージを入力"
        messages={messages}
        alwaysShowSend={true}
        onSend={onSend}
        onQuickReply={onQuickReply}
        user={{ _id: uid }}
        renderBubble={props => <CustomBubble {...props} customParameter={{ uid }} />}
        renderAvatarOnTop={true}
        showAvatarForEveryMessage={true}
        renderAvatar={props => <CustomAvatar {...props} />}
        isKeyboardInternallyHandled={false}
      />
      <KeyboardSpacer />
    </View>
  )
}

const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    flex: {
      flex: 1
    }
  })

export default ChatroomPage
