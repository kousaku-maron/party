import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View } from 'react-native'

type Props = {
  tintColor?: string
  focused?: boolean
  inset?: [number, number, number, number]
}

const PostIcon = ({ tintColor, focused, inset }: Props) => {
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
        <AntDesign name={focused ? 'pluscircle' : 'pluscircleo'} size={24} color={tintColor} />
      </View>
    )
  }
  return <AntDesign name={focused ? 'pluscircle' : 'pluscircleo'} size={24} color={tintColor} />
}

export default PostIcon
