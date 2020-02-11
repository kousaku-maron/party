import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import {
  HomeScreen,
  PartyEntryScreen,
  UserScreen,
  UserEditScreen,
  PartyDetailScreen,
  SettingScreen,
  TermsScreen,
  PrivacyScreen,
  ChatScreen,
  PartyGroupsScreen,
  GroupDetailScreen,
  PartyMakeScreen,
  RoomScreen
} from '../screens'

const HomeNavigator = createStackNavigator(
  {
    Main: HomeScreen,
    PartyEntry: PartyEntryScreen,
    PartyDetail: PartyDetailScreen,
    PartyMake: PartyMakeScreen,
    PartyGroups: PartyGroupsScreen,
    GroupDetail: GroupDetailScreen,
    Chat: ChatScreen,
    User: UserScreen
  },
  {
    initialRouteName: 'Main'
  }
)

const RoomNavigator = createStackNavigator(
  {
    Main: RoomScreen,
    Chat: ChatScreen,
    User: UserScreen
  },
  {
    initialRouteName: 'Main'
  }
)

const UserNavigator = createStackNavigator(
  {
    Main: UserScreen,
    UserEdit: UserEditScreen,
    Setting: SettingScreen,
    Terms: TermsScreen,
    Privacy: PrivacyScreen
  },
  {
    initialRouteName: 'Main'
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    HomeSection: {
      screen: HomeNavigator,
      navigationOptions: () => {
        return {
          tabBarVisible: false
        }
      }
    },
    RoomSection: {
      screen: RoomNavigator,
      navigationOptions: () => {
        return {
          tabBarVisible: false
        }
      }
    },
    UserSection: {
      screen: UserNavigator,
      navigationOptions: () => {
        return {
          tabBarVisible: false
        }
      }
    }
  },
  {
    initialRouteName: 'HomeSection',
    tabBarOptions: {
      showLabel: false,
      safeAreaInset: { bottom: 'never', top: 'never' }
    }
  }
)

export default TabNavigator
