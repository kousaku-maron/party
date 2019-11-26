import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { HomeIcon, PostIcon, UserIcon } from '../components/atoms'
import {
  HomeScreen,
  PartyEntryScreen,
  UserScreen,
  UserEditScreen,
  PartyDetailScreen,
  SettingScreen,
  TermsScreen,
  PrivacyScreen,
  PostScreen,
  ChatScreen
} from '../screens'
import { getTheme } from '../themes'
import { isIPhoneX, isIPhoneXAbove, X_ABOVE_TAB_NOTCH_HEIGHT } from '../services/design'

const theme = getTheme()

const HomeNavigator = createStackNavigator(
  {
    Main: HomeScreen,
    PartyEntry: PartyEntryScreen,
    PartyDetail: PartyDetailScreen,
    Chat: ChatScreen
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
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          if (isIPhoneX() || isIPhoneXAbove()) {
            return HomeIcon({ tintColor, focused, inset: [0, 0, X_ABOVE_TAB_NOTCH_HEIGHT, 0] })
          }
          return HomeIcon({ tintColor, focused })
        }
      }
    },
    Post: {
      screen: PostNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          if (isIPhoneX() || isIPhoneXAbove()) {
            return PostIcon({ tintColor, focused, inset: [0, 0, X_ABOVE_TAB_NOTCH_HEIGHT, 0] })
          }
          return PostIcon({ tintColor, focused })
        }
      }
    },
    User: {
      screen: UserNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => {
          if (isIPhoneX() || isIPhoneXAbove()) {
            return UserIcon({ tintColor, focused, inset: [0, 0, X_ABOVE_TAB_NOTCH_HEIGHT, 0] })
          }
          return UserIcon({ tintColor, focused })
        }
      }
    }
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: {
        dark: theme.dark.tints.primary.main,
        light: theme.light.tints.primary.main
      },
      inactiveTintColor: {
        dark: theme.dark.system.gray,
        light: theme.light.system.gray
      },
      activeBackgroundColor: {
        dark: theme.dark.backgrounds.secondary,
        light: theme.light.backgrounds.secondary
      },
      inactiveBackgroundColor: {
        dark: theme.dark.backgrounds.secondary,
        light: theme.light.backgrounds.secondary
      },
      showLabel: false,
      style: {
        height: isIPhoneX() || isIPhoneXAbove() ? 49 + X_ABOVE_TAB_NOTCH_HEIGHT : 49
      },
      safeAreaInset: { bottom: 'never', top: 'never' }
    }
  }
)

export default TabNavigator
