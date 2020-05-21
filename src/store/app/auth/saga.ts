import { take, put, call, fork, cancel, cancelled } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { Permission, User, buildUser } from '../../../entities'
import { appAuthActions } from './actions'
import firebase from '../../../repositories/firebase'
import { db } from '../../../repositories/firebase'
import { getPermission, setPermission } from '../../../repositories/permission'
import notifications from '../../../services/notifications'

// auth state
// ----------------------------------------
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

function* watchAuthChannel() {
  const channel = yield call(authChannel)
  while (true) {
    const { user, error } = yield take(channel)

    if (user && !error) {
      yield fork(handleCatchAuthState, user)
    }

    if (!user || error) {
      yield fork(handleNotCatchAuthState)
    }
  }
}

function* handleCatchAuthState(user: firebase.User) {
  try {
    yield put(appAuthActions.setAuth(user.uid))
    yield put(appAuthActions.startAuthUserSession(user.uid))
    yield call(askNotificationsPermissionTask, user.uid)
    yield call(updateNotificationsTokenTask, user.uid)
  } catch (e) {
    console.warn(e)
  }
}

function* handleNotCatchAuthState() {
  yield put(appAuthActions.resetAuth())
  yield put(appAuthActions.stopAuthUserSession())
}

function* askNotificationsPermissionTask(uid: string) {
  try {
    const {
      notifications: { isAlreadyInitialAsked }
    }: Permission = yield call(getPermission)

    if (!isAlreadyInitialAsked) {
      const { result }: { result: boolean } = yield call(notifications.askNotificationsPermission)
      if (result) {
        yield call(notifications.storeToken, uid)
      }

      if (!result) {
        yield call(setPermission, {
          notifications: { isAlreadyInitialAsked: true, isEnabledNotifications: false }
        })
      }
    }
  } catch (e) {
    console.warn(e)
  }
}

function* updateNotificationsTokenTask(uid: string) {
  try {
    const {
      notifications: { isAlreadyInitialAsked, isEnabledNotifications }
    }: Permission = yield call(getPermission)

    if (isAlreadyInitialAsked && isEnabledNotifications) {
      yield call(notifications.storeToken, uid)
    }

    if (isAlreadyInitialAsked && !isEnabledNotifications) {
      yield call(notifications.removeToken, uid)
    }
  } catch (e) {
    console.warn(e)
  }
}

// user state
// ----------------------------------------
function* userSessionFlow() {
  while (true) {
    const { payload: uid } = yield take(appAuthActions.startAuthUserSession)
    const task = yield fork(watchUserSessionChannel, uid)
    yield take(appAuthActions.stopAuthUserSession)
    yield cancel(task)
  }
}

const userSessionChannel = (uid: string) => {
  const channel = eventChannel(emit => {
    const userRef = db.collection('users').doc(uid)
    const unsubscribe = userRef.onSnapshot(
      (doc: firebase.firestore.DocumentSnapshot) => {
        if (!doc.exists) {
          emit({ error: 'not found user documents' })
          return
        }

        const user = buildUser(doc.id, doc.data())
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

function* watchUserSessionChannel(uid: string) {
  const channel = yield call(userSessionChannel, uid)
  try {
    while (true) {
      const { user, error } = yield take(channel)

      if (user && !error) {
        yield fork(handleCatchUserState, user)
      }

      if (!user || error) {
        yield fork(handleNotCatchUserState)
      }
    }
  } finally {
    if (yield cancelled()) {
      channel.close()
    }
  }
}

function* handleCatchUserState(user: User) {
  yield put(appAuthActions.setAuthUser(user))
}

function* handleNotCatchUserState() {
  yield put(appAuthActions.resetAuthUser())
}

const saga = [watchAuthChannel(), userSessionFlow()]

export default saga
