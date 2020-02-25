import React from 'react'
import { Entypo } from '@expo/vector-icons'
import { View } from 'react-native'

type Props = {
  tintColor?: string
  focused?: boolean
  inset?: [number, number, number, number]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DotsIcon = ({ tintColor, focused, inset }: Props) => {
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
        <Entypo name="dots-two-vertical" size={24} color={tintColor} />
      </View>
    )
  }
  return <Entypo name="dots-two-vertical" size={24} color={tintColor} />
}

export default DotsIcon
