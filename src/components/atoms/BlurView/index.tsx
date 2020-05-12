import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Constants from 'expo-constants'

type Props = {
  blurType?: 'xlight' | 'light' | 'dark'
  blurAmount?: number
  reducedTransparencyFallbackColor?: string
  style?: StyleProp<ViewStyle>
}

let CustomBlurView

if (Constants.appOwnership === 'expo') {
  CustomBlurView = require('./BlurView.expo').default
}

if (Constants.appOwnership !== 'expo') {
  CustomBlurView = require('./BlurView').default
}

const BlurView: React.FC<Props> = props => <CustomBlurView {...props} />

export default BlurView
