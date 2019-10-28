import React from 'react'
import { WebView } from 'react-native-webview'
import { colorsHandler } from '../services/design'

const TermsScreen = () => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-terms' }} />
}

TermsScreen.navigationOptions = ({ navigation }) => {
  const colors = colorsHandler({ navigation })
  return {
    headerTitle: '利用規約',
    headerBackTitle: null,
    headerTintColor: colors.foregrounds.primary,
    headerStyle: {
      backgroundColor: colors.backgrounds.secondary
    }
  }
}

export default TermsScreen
