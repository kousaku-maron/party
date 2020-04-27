import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './configureStore'

const store = configureStore()

const StoreProvider: React.FC<{}> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
