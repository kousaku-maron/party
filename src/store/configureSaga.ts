import { all } from 'redux-saga/effects'
import authSaga from './app/auth/saga'
import uiSaga from './ui/saga'

export default function* rootSaga() {
  yield all([...authSaga, ...uiSaga])
}
