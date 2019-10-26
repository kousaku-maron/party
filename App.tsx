import React from 'react'
import { Provider } from 'react-redux'
import { AppearanceProvider } from 'react-native-appearance'
import configureStore from './src/reducers/configureStore'
import AppNavigator from './src/navigators/AppNavigator'

const store = configureStore()

const App = (): JSX.Element => {
  return (
    <AppearanceProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </AppearanceProvider>
  )
}

export default App
