import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { BlurView } from '@react-native-community/blur'

type Props = {
  blurType?: 'xlight' | 'light' | 'dark'
  blurAmount?: number
  reducedTransparencyFallbackColor?: string
  style?: StyleProp<ViewStyle>
}

const CustomBlurView: React.FC<Props> = ({
  blurType = 'light',
  blurAmount = 10,
  reducedTransparencyFallbackColor,
  style,
  children
}) => {
  return (
    <BlurView
      blurType={blurType}
      blurAmount={blurAmount}
      reducedTransparencyFallbackColor={reducedTransparencyFallbackColor}
      style={style}
    >
      {children}
    </BlurView>
  )
}

export default CustomBlurView
