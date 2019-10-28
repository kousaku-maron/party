import React from 'react'
import { Provider } from 'react-redux'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import configureStore from './src/reducers/configureStore'
import AppNavigator from './src/navigators/AppNavigator'

const store = configureStore()

const App = (): JSX.Element => {
  const theme = useColorScheme()

  return (
    <AppearanceProvider>
      <Provider store={store}>
        <AppNavigator theme={theme} />
      </Provider>
    </AppearanceProvider>
  )
}

export default App
