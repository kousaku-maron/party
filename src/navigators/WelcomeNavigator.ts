import { createStackNavigator } from 'react-navigation-stack'
import { WelcomeScreen } from '../screens'

const WelcomeNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen
  },
  {
    initialRouteName: 'Welcome'
  }
)

export default WelcomeNavigator
