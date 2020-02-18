import React, { useCallback } from 'react'
import { User } from 'react-native-gifted-chat'
import { ChatroomPage } from '../components/pages'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { RouteParams } from '../navigators/RouteProps'

const ChatScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RouteParams, 'Chat'>>()
  const roomID = route.params.roomID

  const onPressAvatar = useCallback(
    (user: User) => {
      navigation.navigate('User', { userID: user._id })
    },
    [navigation]
  )

  return <ChatroomPage roomID={roomID} onPressAvatar={onPressAvatar} />
}

export default ChatScreen
