import React, { useMemo } from 'react'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { useGiftedhatTools } from '../services/chat'
import { headerNavigationOptions } from '../navigators/options'
import { useAuthState } from '../store/hooks'
import { GiftedChat } from 'react-native-gifted-chat'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChatScreen = ({ navigation }: Props) => {
  const { uid } = useAuthState()

  const partyID = navigation.state.params.partyID

  const tempUIDs = useMemo(() => {
    return ['NVQ3p5JIWxV5NAXAp93JEwl3mY83', 'SZ0otA7TZBY4FeuY4yMSNr0E9Kf2', 'YzbLah6jv9hy1CPEvpC2lDWU7KJ2']
  }, [])

  const { messages, onSend } = useGiftedhatTools(partyID, tempUIDs)

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: uid
      }}
    />
  )
}

ChatScreen.navigationOptions = (props: NavigationStackScreenProps) => headerNavigationOptions(props)

// const { width } = Dimensions.get('window')

// const makeStyles: MakeStyles = colors =>
//   StyleSheet.create({
//     container: {
//       width: width,
//       padding: 10,
//       backgroundColor: colors.backgrounds.primary
//     }
//   })

export default ChatScreen
