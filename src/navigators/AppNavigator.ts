import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import WelcomeNavigator from './WelcomeNavigator'
import TabNavigator from './TabNavigator'

const AppNavigator = createSwitchNavigator(
  {
    Welcome: WelcomeNavigator,
    App: TabNavigator
  },
  {
    initialRouteName: 'Welcome'
  }
)

export default createAppContainer(AppNavigator)
