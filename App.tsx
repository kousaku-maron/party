import React from 'react'
import { useScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import configureStore from './src/store/configureStore'
import AppNavigator from './src/navigators/AppNavigator'
import FlashMessage from 'react-native-flash-message'
import { LoadingModal } from './src/components/organisms'

const store = configureStore()

const App = (): JSX.Element => {
  const theme = useColorScheme()
  useScreens()

  return (
    <AppearanceProvider>
      <Provider store={store}>
        <AppNavigator theme={theme} />
        <FlashMessage position="top" />
        <LoadingModal />
      </Provider>
    </AppearanceProvider>
  )
}

export default App
