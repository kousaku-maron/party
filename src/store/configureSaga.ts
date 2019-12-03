import { all } from 'redux-saga/effects'
import { authSaga } from './auth'
import { uiSaga } from './ui'

export default function* rootSaga() {
  yield all([...authSaga, ...uiSaga])
}
