import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { authActions } from '../actions'

export interface Auth {
  uid: string
}

const initialState: Auth = {
  uid: null
}

export const authReducer = reducerWithInitialState(initialState)
  .case(authActions.setAuth, (state, user) => {
    return { ...state, uid: user.uid }
  })
  .case(authActions.resetAuth, () => {
    return { ...initialState }
  })
