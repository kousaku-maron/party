import { createStackNavigator } from 'react-navigation-stack'
import { WelcomeScreen, TermsScreen, PrivacyScreen } from '../screens'

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
