import React from 'react'
import { WebView } from 'react-native-webview'

const TermsScreen = () => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-terms' }} />
}

TermsScreen.navigationOptions = () => ({ headerShown: false })

export default TermsScreen
