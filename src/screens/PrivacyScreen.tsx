import React from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { WebView } from 'react-native'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps

const PrivacyScreen = (_props: Props) => {
  return <WebView source={{ uri: 'https://insta-693eb.web.app/webview-privacy' }} />
}

PrivacyScreen.navigationOptions = () => ({
  headerTitle: 'プライバシーポリシー'
})

export default PrivacyScreen
