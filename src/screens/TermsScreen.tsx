import React from 'react'
import { WebView } from 'react-native-webview'
import { colors } from '../themes'

const TermsScreen = () => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-terms' }} />
}

TermsScreen.navigationOptions = () => ({
  headerTitle: '利用規約',
  headerBackTitle: null,
  headerTintColor: colors.tertiary.light,
  headerStyle: {
    backgroundColor: colors.senary.dark
  }
})

export default TermsScreen
