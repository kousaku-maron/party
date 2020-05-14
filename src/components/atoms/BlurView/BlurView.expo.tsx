import React, { useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'

type Props = {
  blurType?: 'xlight' | 'light' | 'dark'
  blurAmount?: number
  reducedTransparencyFallbackColor?: string
  style?: StyleProp<ViewStyle>
}

const CustomBlurView: React.FC<Props> = ({ blurType = 'light', blurAmount = 10, style, children }) => {
  const tint = useMemo(() => {
    if (blurType === 'dark') {
      return 'dark'
    }

    if (blurType === 'xlight' || blurType === 'light') {
      return 'light'
    }

    return 'light'
  }, [blurType])

  return (
    <BlurView tint={tint} intensity={blurAmount} style={style}>
      {children}
    </BlurView>
  )
}

export default CustomBlurView
