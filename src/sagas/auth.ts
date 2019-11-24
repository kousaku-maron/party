import { take, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { authActions } from '../actions'
import firebase from '../repositories/firebase'
import * as userRepository from '../repositories/user'
import { signInFacebook, signOut, signInAnonymously } from '../services/authentication'

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
      yield put(authActions.setAuth(user.uid))
      yield put(authActions.getMyUserRequest(user.uid))
    } else {
      yield put(authActions.resetAuth())
    }
  }
}

function* signInFacebookProcess() {
  while (true) {
    const { payload } = yield take(authActions.signInFacebook)
    const { onSuccess, onFailure } = payload
    const { success, cancelled, error } = yield call(signInFacebook)

    if (success && !cancelled && !error) {
      if (onSuccess) onSuccess()
    }

    if (!success && !cancelled && error) {
      if (onFailure) onFailure()
    }
  }
}

function* signInAnonymouslyProcess() {
  while (true) {
    const { payload } = yield take(authActions.signInAnonymously)
    const { onSuccess, onFailure } = payload
    const { success, cancelled, error } = yield call(signInAnonymously)

    if (success && !cancelled && !error) {
      if (onSuccess) onSuccess()
    }

    if (!success && !cancelled && error) {
      if (onFailure) onFailure()
    }
  }
}

function* signOutProcess() {
  while (true) {
    const { payload } = yield take(authActions.signOut)
    const { onSuccess, onFailure } = payload
    const { success, error } = yield call(signOut)

    if (success && !error) {
      yield put(authActions.resetAuth())
      if (onSuccess) onSuccess()
    }

    if (!success && error) {
      if (onFailure) onFailure()
    }
  }
}

function* fetchMyUser() {
  while (true) {
    const { payload } = yield take(authActions.getMyUserRequest)

    try {
      const user = yield call(userRepository.getUser, payload)
      yield put(authActions.getMyUserSuccess(user))
    } catch (e) {
      yield put(authActions.getMyUserFailure())
    }
  }
}

const saga = [checkAuthState(), signInFacebookProcess(), signInAnonymouslyProcess(), signOutProcess(), fetchMyUser()]

export default saga
