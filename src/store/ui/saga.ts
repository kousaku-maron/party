import { take, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { Appearance, ColorSchemeName } from 'react-native-appearance'
import { uiActions } from './actions'

const themeChannel = () => {
  const channel = eventChannel(emit => {
    const subscription = Appearance.addChangeListener(({ colorScheme }: { colorScheme: ColorSchemeName }) => {
      emit({ colorScheme })
    })
    return () => subscription.remove()
  })
  return channel
}

function* checkTheme() {
  const channel = yield call(themeChannel)
  while (true) {
    const { colorScheme } = yield take(channel)

    if (colorScheme) {
      yield put(uiActions.setTheme(colorScheme))
    }
  }
}

function* firstCheckTheme() {
  const colorScheme = Appearance.getColorScheme()
  yield put(uiActions.setTheme(colorScheme))
}

const saga = [firstCheckTheme(), checkTheme()]

export default saga
