import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actionCreateFactory from 'typescript-fsa'
import { User } from '../../entities'

const actionCreator = actionCreateFactory()

export const authActions = {
  setAuth: actionCreator<string>('SET_AUTH'),
  resetAuth: actionCreator<void>('RESET_AUTH'),
  setUser: actionCreator<User>('SET_USER')
}

export const useAuthActions = () => {
  const dispatch = useDispatch()

  const setUser = useCallback(
    (user: User) => {
      dispatch(authActions.setUser(user))
    },
    [dispatch]
  )

  return { setUser }
}
