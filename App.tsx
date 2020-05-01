import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import { AppearanceProvider } from 'react-native-appearance'
import StoreProvider from './src/store/StoreProvider'
import AppNavigator from './src/navigators/AppNavigator'
import FlashMessage from 'react-native-flash-message'
import { LoadingModal } from './src/components/organisms'

const App = (): JSX.Element => {
  enableScreens()

  return (
    <NavigationContainer>
      <AppearanceProvider>
        <StoreProvider>
          <StoreProvider>
            <AppNavigator />
            <FlashMessage position="top" />
            <LoadingModal />
          </StoreProvider>
        </StoreProvider>
      </AppearanceProvider>
    </NavigationContainer>
  )
}

export default App
