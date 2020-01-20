import { take, put, call, fork } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { buildUser } from '../../entities'
import { authActions } from './actions'
import { db } from '../../repositories/firebase'
import firebase from '../../repositories/firebase'
// import * as userRepository from '../../repositories/user'
import { signInApple, signInGoogle, signInFacebook, signOut, signInAnonymously } from '../../services/authentication'

const usersRef = db.collection('users')

const authChannel = () => {
  const channel = eventChannel(emit => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      user => emit({ user }),
      error => emit({ error })
    )
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
      yield fork(getMyUser, user.uid)
      // yield put(authActions.getMyUserRequest(user.uid))
    } else {
      yield put(authActions.resetAuth())
    }
  }
}

const userChannel = (uid: string) => {
  const channel = eventChannel(emit => {
    const userRef = usersRef.doc(uid)
    const unsubscribe = userRef.onSnapshot(
      (doc: firebase.firestore.DocumentSnapshot) => {
        if (!doc.exists) return null
        const user = buildUser(doc.data())
        emit({ user })
      },
      (error: Error) => {
        emit({ error })
      }
    )
    return unsubscribe
  })
  return channel
}

function* getMyUser(uid: string) {
  const channel = yield call(userChannel, uid)
  while (true) {
    const { user, error } = yield take(channel)

    if (user && !error) {
      yield put(authActions.getMyUserSuccess(user))
    } else {
      yield put(authActions.getMyUserFailure())
    }
  }
}

function* signInAppleProcess() {
  while (true) {
    const { payload } = yield take(authActions.signInApple)
    const { onSuccess, onFailure } = payload
    const { success, cancelled, error } = yield call(signInApple)

    if (success && !cancelled && !error) {
      if (onSuccess) onSuccess()
    }

    if (!success && !cancelled && error) {
      if (onFailure) onFailure()
    }
  }
}

function* signInGoogleProcess() {
  while (true) {
    const { payload } = yield take(authActions.signInGoogle)
    const { onSuccess, onFailure } = payload
    const { success, cancelled, error } = yield call(signInGoogle)

    if (success && !cancelled && !error) {
      if (onSuccess) onSuccess()
    }

    if (!success && !cancelled && error) {
      if (onFailure) onFailure()
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

// function* fetchMyUser() {
//   while (true) {
//     const { payload } = yield take(authActions.getMyUserRequest)

//     try {
//       const user = yield call(userRepository.getUser, payload)
//       yield put(authActions.getMyUserSuccess(user))
//     } catch (e) {
//       yield put(authActions.getMyUserFailure())
//     }
//   }
// }

const saga = [
  checkAuthState(),
  signInAppleProcess(),
  signInGoogleProcess(),
  signInFacebookProcess(),
  signInAnonymouslyProcess(),
  signOutProcess()
]

export default saga
