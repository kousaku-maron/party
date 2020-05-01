import React from 'react'
import LottieView from 'lottie-react-native'

type Props = {
  theme?: 'dark' | 'light' | 'no-preference'
  size?: number
}

export const Indicator = ({ theme = 'light', size = 200 }: Props) => {
  if (theme === 'dark') {
    return (
      <LottieView
        style={{
          width: size,
          height: size
        }}
        autoPlay={true}
        loop={true}
        source={require('./data_dark.json')}
      />
    )
  }

  return (
    <LottieView
      style={{
        width: size,
        height: size
      }}
      autoPlay={true}
      loop={true}
      source={require('./data_light.json')}
    />
  )
}
