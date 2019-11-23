import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { View } from 'react-native'

type Props = {
  tintColor?: string
  focused?: boolean
  inset?: [number, number, number, number]
}

const UserIcon = ({ tintColor, focused, inset }: Props) => {
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
        <FontAwesome name={focused ? 'user' : 'user-o'} size={24} color={tintColor} />
      </View>
    )
  }
  return <FontAwesome name={focused ? 'user' : 'user-o'} size={24} color={tintColor} />
}

export default UserIcon
