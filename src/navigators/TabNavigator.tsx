import React from 'react'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { UserScreen, PostScreen } from '../containers'
import { HomeScreen } from '../screens'
import { MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons'

type IconProps = {
  tintColor?: string
  focused?: boolean
}

const HomeIcon = ({ tintColor, focused }: IconProps) => {
  if (focused) {
    return <MaterialCommunityIcons name="home" size={24} color={tintColor} />
  }
  return <MaterialCommunityIcons name="home-outline" size={24} color={tintColor} />
}

const PostIcon = ({ tintColor, focused }: IconProps) => {
  if (focused) {
    return <AntDesign name="pluscircle" size={24} color={tintColor} />
  }
  return <AntDesign name="pluscircleo" size={24} color={tintColor} />
}

const UserIcon = ({ tintColor, focused }: IconProps) => {
  if (focused) {
    return <FontAwesome name="user" size={24} color={tintColor} />
  }
  return <FontAwesome name="user-o" size={24} color={tintColor} />
}

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
    Main: PostScreen,
    PostFinish: PostFinishScreen
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
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: HomeIcon
      }
    },
    Post: {
      screen: PostNavigator,
      navigationOptions: {
        tabBarIcon: PostIcon
      }
    },
    User: {
      screen: UserNavigator,
      navigationOptions: {
        tabBarIcon: UserIcon
      }
    }
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: 'black',
      showLabel: false
    }
  }
)

export default TabNavigator
