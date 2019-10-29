import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { WebView } from 'react-native-webview'

const TermsScreen = () => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-terms' }} />
}

TermsScreen.navigationOptions = (props: NavigationStackScreenProps) =>
  headerNavigationOptions({ ...props, title: '利用規約' })

export default TermsScreen
