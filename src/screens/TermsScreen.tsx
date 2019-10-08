import React from 'react'
import { WebView } from 'react-native-webview'

const TermsScreen = () => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-terms' }} />
}

TermsScreen.navigationOptions = () => ({
  headerTitle: '利用規約'
})

export default TermsScreen