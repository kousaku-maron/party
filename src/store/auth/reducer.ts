import { useSelector } from 'react-redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { authActions } from './actions'
import { User } from '../../entities'
import { AppState } from '../configureStore'

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
  .case(authActions.setUser, (state, user) => {
    return { ...state, user }
  })

export const useAuthState = () => {
  const auth = useSelector((state: AppState) => state.auth)

  return auth
}
