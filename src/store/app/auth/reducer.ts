import { useSelector } from 'react-redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { appAuthActions } from './actions'
import { User } from '../../../entities'
import { StoreState } from '../../configureStore'

export interface AppAuth {
  checked: boolean
  uid: string
  user: User | null
}

const initialState: AppAuth = {
  checked: false,
  uid: null,
  user: null
}

export const appAuthReducer = reducerWithInitialState(initialState)
  .case(appAuthActions.setAuth, (state, uid) => {
    return { ...state, uid, checked: true }
  })
  .case(appAuthActions.resetAuth, state => {
    return { ...state, uid: null, checked: true }
  })
  .case(appAuthActions.setUser, (state, user) => {
    return { ...state, user }
  })
  .case(appAuthActions.resetUser, state => {
    return { ...state, user: null }
  })

export const useAppAuthState = () => {
  const auth = useSelector((state: StoreState) => state.app.auth)

  return auth
}
