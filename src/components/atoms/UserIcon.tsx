import React from 'react'
import { User } from '../../@design/vector-icons'
import { View } from 'react-native'

type Props = {
  tintColor?: string
  focused?: boolean
  inset?: [number, number, number, number]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <User size={24} color={tintColor} />
      </View>
    )
  }
  return <User size={24} color={tintColor} />
}

export default UserIcon
