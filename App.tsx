import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { AppearanceProvider } from 'react-native-appearance'
import configureStore from './src/store/configureStore'
import AppNavigator from './src/navigators/AppNavigator'
import FlashMessage from 'react-native-flash-message'
import { LoadingModal } from './src/components/organisms'

const store = configureStore()

const App = (): JSX.Element => {
  enableScreens()

  return (
    <NavigationContainer>
      <AppearanceProvider>
        <Provider store={store}>
          <AppNavigator />
          <FlashMessage position="top" />
          <LoadingModal />
        </Provider>
      </AppearanceProvider>
    </NavigationContainer>
  )
}

export default App
