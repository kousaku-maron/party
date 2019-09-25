import { take, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { buildUser } from '../entities'
import { authActions } from '../actions'
import firebase from '../services/firebase'

const authChannel = () => {
  const channel = eventChannel(emit => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => emit({ user }), error => emit({ error }))
    return unsubscribe
  })
  return channel
}

function* checkAuthState() {
  const channel = yield call(authChannel)
  while (true) {
    const { user, error } = yield take(channel)

    if (user && !error) {
      yield put(authActions.setAuth(buildUser({ uid: user.uid })))
    } else {
      yield put(authActions.resetAuth())
    }
  }
}

const saga = [checkAuthState()]

export default saga
