import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useStyles, MakeStyles } from '../../../services/design'
import { CustomBubble } from './Bubble'
import { CustomAvatar } from './Avatar'
import { CustomSend } from './Send'
import { CustomInputToolbar } from './InputToolbar'
import { CustomComposer } from './Composer'
import { useGiftedhatTools } from '../../../services/chat'
import { useAuthState } from '../../../store/hooks'
import { GiftedChat } from 'react-native-gifted-chat'

type OwnProps = { roomID: string }
type Props = OwnProps

const ChatroomPage = ({ roomID }: Props) => {
  const styles = useStyles(makeStyles)

  const { uid } = useAuthState()
  const { messages, onSend, onQuickReply } = useGiftedhatTools(roomID)

  const renderBubble = useCallback(props => <CustomBubble {...props} customParameter={{ uid }} />, [uid])

  const renderAvatar = useCallback(props => <CustomAvatar {...props} />, [])

  const renderSend = useCallback(props => <CustomSend {...props} />, [])

  const renderInputToolbar = useCallback(props => <CustomInputToolbar {...props} />, [])

  const renderComposer = useCallback(props => <CustomComposer {...props} />, [])

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
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
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
