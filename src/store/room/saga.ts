import { take, put, call } from 'redux-saga/effects'
import { roomActions } from './actions'
import { entryDemoParty } from '../../services/party'

function* entryDemoRoomRequestProcess() {
  while (true) {
    const { payload } = yield take(roomActions.entryDemoRoomRequest)
    const { roomID, onSuccess, onFailure } = payload
    const { success, error } = yield call(entryDemoParty, roomID)

    if (success && !error) {
      yield put(roomActions.entryDemoRoomSuccess({ onSuccess }))
    }

    if (!success && error) {
      yield put(roomActions.entryDemoRoomFailure({ onFailure }))
    }
  }
}

function* entryDemoRoomSuccessProcess() {
  while (true) {
    const { payload } = yield take(roomActions.entryDemoRoomSuccess)
    const { onSuccess } = payload

    if (onSuccess) {
      onSuccess()
    }
  }
}

function* entryDemoRoomFailureProcess() {
  while (true) {
    const { payload } = yield take(roomActions.entryDemoRoomFailure)
    const { onFailure } = payload

    if (onFailure) {
      onFailure()
    }
  }
}

const saga = [entryDemoRoomRequestProcess(), entryDemoRoomSuccessProcess(), entryDemoRoomFailureProcess()]

export default saga
