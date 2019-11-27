import React from 'react'

import { Day, DayProps, IMessage } from 'react-native-gifted-chat'

export const CustomDay = (
  props: Readonly<DayProps<IMessage>> &
    Readonly<{
      children?: React.ReactNode
    }>
) => {
  return <Day {...props} dateFormat={'MM/DD(ddd)'} />
}
