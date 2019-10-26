import React from 'react'
import { WebView } from 'react-native-webview'
import { getColors } from '../services/design'

const colors = getColors()

const PrivacyScreen = () => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-privacy' }} />
}

PrivacyScreen.navigationOptions = () => ({
  headerTitle: 'プライバシーポリシー',
  headerBackTitle: null,
  headerTintColor: colors.foregrounds.primary,
  headerStyle: {
    backgroundColor: colors.backgrounds.secondary
  }
})

export default PrivacyScreen
