import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { authActions } from '../actions'
import { User } from '../entities'

export interface Auth {
  checked: boolean
  uid: string
  user: User | null
}

const initialState: Auth = {
  checked: false,
  uid: null,
  user: null
}

export const authReducer = reducerWithInitialState(initialState)
  .case(authActions.setAuth, (state, uid) => {
    return { ...state, uid, checked: true }
  })
  .case(authActions.resetAuth, () => {
    return { ...initialState, checked: true }
  })
  .case(authActions.getMyUserRequest, state => {
    return { ...state }
  })
  .case(authActions.getMyUserSuccess, (state, user: User) => {
    return { ...state, user }
  })
  .case(authActions.getMyUserFailure, state => {
    return { ...state }
  })
