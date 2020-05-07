import actionCreateFactory from 'typescript-fsa'
import { User } from '../../../entities'

const actionCreator = actionCreateFactory()

export const appAuthActions = {
  setAuth: actionCreator<string>('SET_AUTH'),
  resetAuth: actionCreator<void>('RESET_AUTH'),
  setUser: actionCreator<User>('SET_USER'),
  resetUser: actionCreator<void>('RESET_USER'),
  startUserSession: actionCreator<string>('START_USER_SESSION'),
  stopUserSession: actionCreator<void>('STOP_USER_SESSION')
}
