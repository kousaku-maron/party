import React from 'react'
import { WebView } from 'react-native-webview'
import { colorsHandler } from '../services/design'

const PrivacyScreen = () => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-privacy' }} />
}

PrivacyScreen.navigationOptions = ({ navigation }) => {
  const colors = colorsHandler({ navigation })
  return {
    headerTitle: 'プライバシーポリシー',
    headerBackTitle: null,
    headerTintColor: colors.foregrounds.primary,
    headerStyle: {
      backgroundColor: colors.backgrounds.secondary
    }
  }
}

export default PrivacyScreen
