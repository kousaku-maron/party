import actionCreateFactory from 'typescript-fsa'
import { User } from '../../../entities'

const actionCreator = actionCreateFactory()

export const appAuthActions = {
  setAuth: actionCreator<string>('SET_AUTH'),
  resetAuth: actionCreator<void>('RESET_AUTH'),
  setAuthUser: actionCreator<User>('SET_AUTH_USER'),
  resetAuthUser: actionCreator<void>('RESET_AUTH_USER'),
  startAuthUserSession: actionCreator<string>('START_AUTH_USER_SESSION'),
  stopAuthUserSession: actionCreator<void>('STOP_AUTH_USER_SESSION')
}
