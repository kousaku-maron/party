import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import WelcomeNavigator from './WelcomeNavigator'
import TabNavigator from './TabNavigator'
import { AuthLoadingScreen } from '../containers'

const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Welcome: WelcomeNavigator,
    App: TabNavigator
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default createAppContainer(AppNavigator)
