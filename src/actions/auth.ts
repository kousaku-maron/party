import actionCreateFactory from 'typescript-fsa'
import { User } from '../entities'

const actionCreator = actionCreateFactory()

export const authActions = {
  setAuth: actionCreator<User>('SET_AUTH'),
  resetAuth: actionCreator<void>('RESET_AUTH')
}
