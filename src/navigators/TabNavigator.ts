import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { HomeScreen, PostScreen, UserScreen } from '../screens'

const HomeNavigator = createStackNavigator(
  {
    Main: HomeScreen
  },
  {
    initialRouteName: 'Main'
  }
)

const PostNavigator = createStackNavigator(
  {
    Main: PostScreen
  },
  {
    initialRouteName: 'Main'
  }
)

const UserNavigator = createStackNavigator(
  {
    Main: UserScreen
  },
  {
    initialRouteName: 'Main'
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeNavigator,
    Post: PostNavigator,
    User: UserNavigator
  },
  {
    initialRouteName: 'Home'
  }
)

export default TabNavigator
