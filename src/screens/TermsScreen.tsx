import React from 'react'
import { WebView } from 'react-native-webview'
import { getColors } from '../services/design'

const colors = getColors()

const TermsScreen = () => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-terms' }} />
}

TermsScreen.navigationOptions = () => ({
  headerTitle: '利用規約',
  headerBackTitle: null,
  headerTintColor: colors.foregrounds.primary,
  headerStyle: {
    backgroundColor: colors.backgrounds.secondary
  }
})

export default TermsScreen
