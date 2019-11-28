import React from 'react'
import { Avatar, AvatarProps, IMessage } from 'react-native-gifted-chat'

export const CustomAvatar = (
  props: Readonly<AvatarProps<IMessage>> &
    Readonly<{
      children?: React.ReactNode
    }>
) => {
  return <Avatar {...props} />
}
