import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import {
  HomeScreen,
  SwipeCardScreen,
  UserScreen,
  UserEditScreen,
  SettingScreen,
  TermsScreen,
  PrivacyScreen,
  RoomScreen,
  SearchUserScreen
} from '../screens'

const Stack = createStackNavigator()

const HomeNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SwipeCard" component={SwipeCardScreen} options={{ headerShown: false }} />
    <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
    <Stack.Screen name="UserEdit" component={UserEditScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SearchUser" component={SearchUserScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
)

const RoomNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={RoomScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SwipeCard" component={SwipeCardScreen} options={{ headerShown: false }} />
    <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
    <Stack.Screen name="UserEdit" component={UserEditScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SearchUser" component={SearchUserScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
)

const UserNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={UserScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SwipeCard" component={SwipeCardScreen} options={{ headerShown: false }} />
    <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
    <Stack.Screen name="UserEdit" component={UserEditScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SearchUser" component={SearchUserScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Setting" component={SettingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Terms" component={TermsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: false }} />
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
