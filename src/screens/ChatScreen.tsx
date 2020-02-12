import React, { useCallback } from 'react'
import { User } from 'react-native-gifted-chat'
import { ChatroomPage } from '../components/pages'
import { NavigationStackProp } from 'react-navigation-stack'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps

const ChatScreen = ({ navigation }: Props) => {
  const roomID = navigation.state.params.roomID

  const onPressAvatar = useCallback(
    (user: User) => {
      navigation.navigate('User', { userID: user._id })
    },
    [navigation]
  )

  return <ChatroomPage roomID={roomID} onPressAvatar={onPressAvatar} />
}

ChatScreen.navigationOptions = () => ({ headerShown: false })

export default ChatScreen
