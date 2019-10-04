import React from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { WebView } from 'react-native'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps

const TermsScreen = (_props: Props) => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-terms' }} />
}

TermsScreen.navigationOptions = () => ({
  headerTitle: '利用規約'
})

export default TermsScreen
