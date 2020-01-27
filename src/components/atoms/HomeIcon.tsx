import React from 'react'
import { Home } from '../../@design/vector-icons'
import { View } from 'react-native'

type Props = {
  tintColor?: string
  focused?: boolean
  inset?: [number, number, number, number]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <Home size={24} color={tintColor} />
      </View>
    )
  }
  return <Home size={24} color={tintColor} />
}

export default HomeIcon
