import React from 'react'
import { ChatroomPage } from '../components/pages'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps

const ChatScreen = ({ navigation }: Props) => {
  const roomID = navigation.state.params.roomID

  return <ChatroomPage roomID={roomID} />
}

ChatScreen.navigationOptions = (props: NavigationStackScreenProps) =>
  headerNavigationOptions({ ...props, title: 'トークルーム' })

export default ChatScreen
