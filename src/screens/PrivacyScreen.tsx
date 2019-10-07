import React from 'react'
import { WebView } from 'react-native-webview'

const PrivacyScreen = () => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-privacy' }} />
}

PrivacyScreen.navigationOptions = () => ({
  headerTitle: 'プライバシーポリシー'
})

export default PrivacyScreen
