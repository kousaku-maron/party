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

// MEMO: Animated.createAnimatedComponent(BlurView)を有効化するために、class componentにしている。
class BlurView extends React.Component<Props, {}> {
  render() {
    return <CustomBlurView {...this.props} />
  }
}

export default BlurView
