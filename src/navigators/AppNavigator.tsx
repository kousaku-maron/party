import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WelcomeNavigator from './WelcomeNavigator'
import TabNavigator from './TabNavigator'
import { AuthLoadingScreen } from '../screens'

const Stack = createStackNavigator()

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ gestureEnabled: false }} headerMode="none">
    <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
    <Stack.Screen name="Welcome" component={WelcomeNavigator} />
    <Stack.Screen name="App">{() => <TabNavigator />}</Stack.Screen>
  </Stack.Navigator>
)

export default AppNavigator
