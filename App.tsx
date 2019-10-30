import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/reducers/configureStore'
import AppNavigator from './src/navigators/AppNavigator'
import FlashMessage from 'react-native-flash-message'

const store = configureStore()

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <FlashMessage position="top" />
    </Provider>
  )
}

export default App
