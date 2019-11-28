import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { useStyles, MakeStyles } from '../../../services/design'
import { CustomBubble } from './Bubble'
import { CustomAvatar } from './Avatar'
import { CustomSend } from './Send'
import { CustomInputToolbar } from './InputToolbar'
import { CustomComposer } from './Composer'
// import { CustomActions } from './Actions'
import { CustomDay } from './Day'
import { useGiftedChatTools } from '../../../services/chat'
import { useAuthState } from '../../../store/hooks'
import { GiftedChat } from 'react-native-gifted-chat'

type OwnProps = { roomID: string }
type Props = OwnProps

const ChatroomPage = ({ roomID }: Props) => {
  const styles = useStyles(makeStyles)

  const { uid } = useAuthState()
  const { messages, onSend, onQuickReply /*, onPressActionButton */ } = useGiftedChatTools(roomID)

  const renderBubble = useCallback(props => <CustomBubble {...props} customParameter={{ uid }} />, [uid])
  const renderAvatar = useCallback(props => <CustomAvatar {...props} />, [])
  const renderSend = useCallback(props => <CustomSend {...props} />, [])
  const renderInputToolbar = useCallback(props => <CustomInputToolbar {...props} />, [])
  const renderComposer = useCallback(props => <CustomComposer {...props} />, [])
  // const renderActions = useCallback(props => <CustomActions {...props} />, [])
  const renderDay = useCallback(props => <CustomDay {...props} />, [])

  return (
    <View style={styles.flex}>
      <GiftedChat
        placeholder="Aa"
        messages={messages}
        user={{ _id: uid }}
        alwaysShowSend={true}
        renderAvatarOnTop={true}
        showAvatarForEveryMessage={true}
        isKeyboardInternallyHandled={false}
        onSend={onSend}
        onQuickReply={onQuickReply}
        // onPressActionButton={onPressActionButton}
        renderBubble={renderBubble}
        renderAvatar={renderAvatar}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        // renderActions={renderActions}
        renderDay={renderDay}
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
