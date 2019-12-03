import React from 'react'
import { Actions, ActionsProps } from 'react-native-gifted-chat'

export const CustomActions = (
  props: Readonly<ActionsProps> &
    Readonly<{
      children?: React.ReactNode
    }>
) => {
  return <Actions {...props} />
}
