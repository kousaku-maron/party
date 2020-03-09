import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {
  HomeScreen,
  SwipeCardScreen,
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
import { useColors } from '../services/design'

const Stack = createStackNavigator()

const HomeNavigator = () => {
  const colors = useColors()

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="SwipeCard"
        component={SwipeCardScreen}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: colors.foregrounds.onTintPrimary,
          headerTransparent: true,
          headerTitle: null
        }}
      />
      <Stack.Screen
        name="PartyEntry"
        component={PartyEntryScreen}
        options={{ headerBackTitleVisible: false, headerTransparent: true }}
      />
      <Stack.Screen
        name="PartyDetail"
        component={PartyDetailScreen}
        options={{ headerBackTitleVisible: false, headerTransparent: true }}
      />
      <Stack.Screen
        name="PartyMake"
        component={PartyMakeScreen}
        options={{ headerBackTitleVisible: false, headerTransparent: true }}
      />
      <Stack.Screen
        name="PartyGroups"
        component={PartyGroupsScreen}
        options={{ headerBackTitleVisible: false, headerTransparent: true }}
      />
      <Stack.Screen
        name="GroupDetail"
        component={GroupDetailScreen}
        options={{ headerBackTitleVisible: false, headerTransparent: true }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerBackTitleVisible: false, headerTransparent: true }}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: colors.foregrounds.primary,
          headerTransparent: true,
          headerTitle: 'プロフィール'
        }}
      />
    </Stack.Navigator>
  )
}

const RoomNavigator = () => {
  const colors = useColors()

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={RoomScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: colors.foregrounds.primary,
          headerTransparent: true,
          headerTitle: null
        }}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{ headerBackTitleVisible: false, headerTransparent: true }}
      />
    </Stack.Navigator>
  )
}

const UserNavigator = () => {
  const colors = useColors()

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={UserScreen}
        options={{
          headerTitle: 'プロフィール',
          headerBackTitleVisible: false,
          headerTransparent: true
        }}
      />
      <Stack.Screen
        name="UserEdit"
        component={UserEditScreen}
        options={{
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: colors.foregrounds.onTintPrimary
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerTitle: '設定', headerBackTitleVisible: false, headerTintColor: colors.foregrounds.primary }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsScreen}
        options={{
          headerTitle: '利用規約',
          headerBackTitleVisible: false,
          headerTintColor: colors.foregrounds.primary
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          headerTitle: 'プライバシーポリシー',
          headerBackTitleVisible: false,
          headerTintColor: colors.foregrounds.primary
        }}
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="HomeSection" tabBar={() => null} tabBarOptions={{ showLabel: false }}>
    <Tab.Screen name="HomeSection" component={HomeNavigator} />
    <Tab.Screen name="RoomSection" component={RoomNavigator} />
    <Tab.Screen name="UserSection" component={UserNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
