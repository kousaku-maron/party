import { all } from 'redux-saga/effects'
import { authSaga } from './auth'
import { uiSaga } from './ui'
import { roomSaga } from './room'

export default function* rootSaga() {
  yield all([...authSaga, ...uiSaga, ...roomSaga])
}
