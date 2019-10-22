import actionCreateFactory from 'typescript-fsa'
import { User } from '../entities'

const actionCreator = actionCreateFactory()

export interface Fetch {
  onSuccess?: () => void
  onFailure?: () => void
}

export const authActions = {
  signInFacebook: actionCreator<Fetch>('SIGNIN_FACEBOOK'),
  signOut: actionCreator<Fetch>('SIGNOUT'),
  setAuth: actionCreator<string>('SET_AUTH'),
  resetAuth: actionCreator<void>('RESET_AUTH'),
  getMyUserRequest: actionCreator<string>('GET_MY_USER_REQUEST'),
  getMyUserSuccess: actionCreator<User>('GET_MY_USER_SUCCESS'),
  getMyUserFailure: actionCreator<void>('GET_MY_USER_FAILURE')
}
