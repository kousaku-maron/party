import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { YellowBox } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { AppearanceProvider } from 'react-native-appearance'
import configureStore from './src/store/configureStore'
import AppNavigator from './src/navigators/AppNavigator'
import FlashMessage from 'react-native-flash-message'
import { LoadingModal } from './src/components/organisms'

// MEMO: react最新バージョンに対応仕切れていないライブラリがあるため、特定の警告を画面に表示させないようにしている。
YellowBox.ignoreWarnings([
  'Warning: componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.'
])

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
