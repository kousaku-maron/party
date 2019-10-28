import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from 'react-native'

type Props = {
  tintColor?: string
  focused?: boolean
  inset?: [number, number, number, number]
}

const HomeIcon = ({ tintColor, focused, inset }: Props) => {
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
        <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={24} color={tintColor} />
      </View>
    )
  }
  return <MaterialCommunityIcons name={focused ? 'home' : 'home-outline'} size={24} color={tintColor} />
}

export default HomeIcon
