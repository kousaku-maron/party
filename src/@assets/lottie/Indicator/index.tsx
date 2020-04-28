import React from 'react'
import LottieView from 'lottie-react-native'

type Props = {
  size?: number
}

export const Indicator = ({ size = 200 }: Props) => {
  return (
    <LottieView
      style={{
        width: size,
        height: size
      }}
      autoPlay={true}
      loop={true}
      source={require('./data.json')}
    />
  )
}
