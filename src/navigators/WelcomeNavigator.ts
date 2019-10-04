import { createStackNavigator } from 'react-navigation-stack'
import { TermsScreen, PrivacyScreen } from '../screens' // TODO: containerからimportするように修正する。
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
