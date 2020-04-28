import { take, put, call, fork } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { Permission } from '../../entities'
import { authActions } from './actions'
import firebase from '../../repositories/firebase'
import { getPermission, setPermission } from '../../repositories/permission'
import { askNotificationsPermission, storeToken, removeToken } from '../../services/notifications/notifications'

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
      yield fork(askNotificationsPermissionProcess, user.uid)
      yield fork(updateNotificationsTokenProcess, user.uid)
    } else {
      yield put(authActions.resetAuth())
    }
  }
}

function* askNotificationsPermissionProcess(uid: string) {
  try {
    const {
      notifications: { isAlreadyInitialAsked }
    }: Permission = yield call(getPermission)

    if (!isAlreadyInitialAsked) {
      const { result }: { result: boolean } = yield call(askNotificationsPermission)
      if (result) {
        yield call(storeToken, uid)
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

function* updateNotificationsTokenProcess(uid: string) {
  try {
    const {
      notifications: { isAlreadyInitialAsked, isEnabledNotifications }
    }: Permission = yield call(getPermission)

    if (isAlreadyInitialAsked && isEnabledNotifications) {
      yield call(storeToken, uid)
    }

    if (isAlreadyInitialAsked && !isEnabledNotifications) {
      yield call(removeToken, uid)
    }
  } catch (e) {
    console.warn(e)
  }
}

const saga = [checkAuthState()]

export default saga
