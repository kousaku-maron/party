import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { WelcomeScreen, TermsScreen, PrivacyScreen } from '../screens'

const Stack = createStackNavigator()

const WelcomeNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Terms" component={TermsScreen} />
    <Stack.Screen name="Privacy" component={PrivacyScreen} />
  </Stack.Navigator>
)

export default WelcomeNavigator
