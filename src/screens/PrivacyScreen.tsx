import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { WebView } from 'react-native-webview'

const PrivacyScreen = () => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-privacy' }} />
}

PrivacyScreen.navigationOptions = (props: NavigationStackScreenProps) =>
  headerNavigationOptions({ ...props, title: 'プライバシーポリシー' })

export default PrivacyScreen
