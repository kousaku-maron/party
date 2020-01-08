import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { View } from 'react-native'

type Props = {
  tintColor?: string
  focused?: boolean
  inset?: [number, number, number, number]
}

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
        <MaterialIcons name={focused ? 'chat-bubble' : 'chat-bubble-outline'} size={24} color={tintColor} />
      </View>
    )
  }
  return <MaterialIcons name={focused ? 'chat-bubble' : 'chat-bubble-outline'} size={24} color={tintColor} />
}

export default RoomIcon
