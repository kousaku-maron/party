import { take, call } from 'redux-saga/effects'
import { roomActions } from './actions'
import { entryDemoParty } from '../../services/party'

function* entryDemoPartyProcess() {
  while (true) {
    const { payload } = yield take(roomActions.entryDemoRoom)
    const { roomID, onSuccess, onFailure } = payload
    const { success, cancelled, error } = yield call(entryDemoParty, roomID)

    if (success && !cancelled && !error) {
      if (onSuccess) onSuccess()
    }

    if (!success && !cancelled && error) {
      if (onFailure) onFailure()
    }
  }
}

const saga = [entryDemoPartyProcess()]

export default saga
