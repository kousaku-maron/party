import { createStackNavigator } from 'react-navigation-stack'
import { WelcomeScreen } from '../containers'

const WelcomeNavigator = createStackNavigator(
  {
    Welcome: WelcomeScreen
  },
  {
    initialRouteName: 'Welcome'
  }
)

export default WelcomeNavigator
