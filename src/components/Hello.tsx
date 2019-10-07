import React, { useState } from 'react'
import { Text } from 'react-native'

const Hello = (): JSX.Element => {
  const [message] = useState<string>('hello world')

  return <Text>{message}</Text>
}

export default Hello
