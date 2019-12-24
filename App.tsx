import React from 'react'
import { YellowBox } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import configureStore from './src/store/configureStore'
import AppNavigator from './src/navigators/AppNavigator'
import FlashMessage from 'react-native-flash-message'
import { LoadingModal } from './src/components/organisms'

// MEMO: react最新バージョンに対応仕切れていないライブラリがあるため、特定の警告を画面に表示させないようにしている。
YellowBox.ignoreWarnings([
  'Warning: componentWillMount has been renamed, and is not recommended for use. See https://fb.me/react-async-component-lifecycle-hooks for details.'
])

const store = configureStore()

const App = (): JSX.Element => {
  const theme = useColorScheme()
  enableScreens()

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
