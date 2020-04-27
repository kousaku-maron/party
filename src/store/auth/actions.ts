import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actionCreateFactory from 'typescript-fsa'
import { User } from '../../entities'

const actionCreator = actionCreateFactory()

export interface Fetch {
  onSuccess?: () => void
  onFailure?: () => void
}

export const authActions = {
  signInApple: actionCreator<Fetch>('SIGNIN_APPLE'),
  signInGoogle: actionCreator<Fetch>('SIGNIN_GOOGLE'),
  signInFacebook: actionCreator<Fetch>('SIGNIN_FACEBOOK'),
  signInAnonymously: actionCreator<Fetch>('SIGNIN_ANONYMOUSLY'),
  signOut: actionCreator<Fetch>('SIGNOUT'),
  setAuth: actionCreator<string>('SET_AUTH'),
  resetAuth: actionCreator<void>('RESET_AUTH'),
  setUser: actionCreator<User>('SET_USER')
}

export const useAuthActions = () => {
  const dispatch = useDispatch()

  const signInApple = useCallback(
    (fetch: Fetch) => {
      dispatch(authActions.signInApple(fetch))
    },
    [dispatch]
  )

  const signInGoogle = useCallback(
    (fetch: Fetch) => {
      dispatch(authActions.signInGoogle(fetch))
    },
    [dispatch]
  )

  const signInFacebook = useCallback(
    (fetch: Fetch) => {
      dispatch(authActions.signInFacebook(fetch))
    },
    [dispatch]
  )

  const signInAnonymously = useCallback(
    (fetch: Fetch) => {
      dispatch(authActions.signInAnonymously(fetch))
    },
    [dispatch]
  )

  const signOut = useCallback(
    (fetch: Fetch) => {
      dispatch(authActions.signOut(fetch))
    },
    [dispatch]
  )

  const setUser = useCallback(
    (user: User) => {
      dispatch(authActions.setUser(user))
    },
    [dispatch]
  )

  return {
    signInApple,
    signInGoogle,
    signInFacebook,
    signInAnonymously,
    signOut,
    setUser
  }
}
