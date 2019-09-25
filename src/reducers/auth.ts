import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { authActions } from '../actions'

export interface Auth {
  checked: boolean
  uid: string
}

const initialState: Auth = {
  checked: false,
  uid: null
}

export const authReducer = reducerWithInitialState(initialState)
  .case(authActions.setAuth, (state, uid) => {
    return { ...state, uid, checked: true }
  })
  .case(authActions.resetAuth, () => {
    return { ...initialState, checked: true }
  })
