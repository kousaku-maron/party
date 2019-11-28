import React from 'react'
import { InputToolbar, InputToolbarProps } from 'react-native-gifted-chat'
import { useColors } from '../../../services/design'

export const CustomInputToolbar = (
  props: Readonly<InputToolbarProps> &
    Readonly<{
      children?: React.ReactNode
    }>
) => {
  const colors = useColors()
  return <InputToolbar {...props} containerStyle={{ backgroundColor: colors.backgrounds.secondary }} />
}
