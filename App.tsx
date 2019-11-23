import React from 'react'
import { Provider } from 'react-redux'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import configureStore from './src/reducers/configureStore'
import AppNavigator from './src/navigators/AppNavigator'
import { LoadingModal } from './src/containers/components/organisms'

const store = configureStore()

const App = (): JSX.Element => {
  const theme = useColorScheme()

  return (
    <AppearanceProvider>
      <Provider store={store}>
        <AppNavigator theme={theme} />
        <LoadingModal />
      </Provider>
    </AppearanceProvider>
  )
}

export default App
