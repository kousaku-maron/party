import { createStackNavigator } from 'react-navigation-stack'
import { TermsScreen, PrivacyScreen } from '../screens' // TODO: コンテナから読み込むように変更する。
import { WelcomeScreen } from '../containers'

const WelcomeNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Terms: TermsScreen,
    Privacy: PrivacyScreen
  },
  {
    initialRouteName: 'Welcome'
  }
)

export default WelcomeNavigator
