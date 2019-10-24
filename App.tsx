import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './src/reducers/configureStore'
import AppNavigator from './src/navigators/AppNavigator'
import { LoadingModal } from './src/containers/components/organisms'

const store = configureStore()

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <LoadingModal />
    </Provider>
  )
}

export default App
