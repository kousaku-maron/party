import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WelcomeNavigator from './WelcomeNavigator'
import TabNavigator from './TabNavigator'
import { useAuthState } from '../store/hooks'
import { AuthLoadingScreen } from '../screens'
const Stack = createStackNavigator()

const AppNavigator = () => {
  const auth = useAuthState()

  if (!auth.checked) {
    return <AuthLoadingScreen />
  }

  return (
    <Stack.Navigator screenOptions={{ gestureEnabled: false }} headerMode="none">
      {!auth.uid ? (
        <Stack.Screen name="Welcome" component={WelcomeNavigator} />
      ) : (
        <Stack.Screen name="Main">{() => <TabNavigator />}</Stack.Screen>
      )}
      <Stack.Screen name="App">{() => <TabNavigator />}</Stack.Screen>
    </Stack.Navigator>
  )
}

export default AppNavigator
