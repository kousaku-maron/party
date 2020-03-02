import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { WelcomeScreen, TermsScreen, PrivacyScreen } from '../screens'
import { useColors } from '../services/design'

const Stack = createStackNavigator()

const WelcomeNavigator = () => {
  const colors = useColors()

  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
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

export default WelcomeNavigator
