import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
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

const Stack = createStackNavigator()

const HomeNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={HomeScreen} />
    <Stack.Screen name="PartyEntry" component={PartyEntryScreen} />
    <Stack.Screen name="PartyDetail" component={PartyDetailScreen} />
    <Stack.Screen name="PartyMake" component={PartyMakeScreen} />
    <Stack.Screen name="PartyGroups" component={PartyGroupsScreen} />
    <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="User" component={UserScreen} />
  </Stack.Navigator>
)

const RoomNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={RoomScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
    <Stack.Screen name="User" component={UserScreen} />
  </Stack.Navigator>
)

const UserNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={UserScreen} />
    <Stack.Screen name="UserEdit" component={UserEditScreen} />
    <Stack.Screen name="Setting" component={SettingScreen} />
    <Stack.Screen name="Terms" component={TermsScreen} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} />
  </Stack.Navigator>
)

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="HomeSection" tabBar={() => null} tabBarOptions={{ showLabel: false }}>
    <Tab.Screen name="HomeSection" component={HomeNavigator} />
    <Tab.Screen name="RoomSection" component={RoomNavigator} />
    <Tab.Screen name="UserSection" component={UserNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
