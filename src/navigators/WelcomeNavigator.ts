import { createStackNavigator } from 'react-navigation-stack'
import { WelcomeScreen, TermsScreen, PrivacyScreen } from '../containers'

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
