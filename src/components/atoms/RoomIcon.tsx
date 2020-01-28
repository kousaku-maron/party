import React from 'react'
import { Icons } from '../../@assets/vector-icons'
import { View } from 'react-native'

type Props = {
  tintColor?: string
  focused?: boolean
  inset?: [number, number, number, number]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RoomIcon = ({ tintColor, focused, inset }: Props) => {
  if (inset) {
    return (
      <View
        style={{
          paddingTop: inset[0],
          paddingRight: inset[1],
          paddingBottom: inset[2],
          paddingLeft: inset[3]
        }}
      >
        <Icons name="chat" size={24} color={tintColor} />
      </View>
    )
  }
  return <Icons name="chat" size={24} color={tintColor} />
}

export default RoomIcon
