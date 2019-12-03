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
  signInFacebook: actionCreator<Fetch>('SIGNIN_FACEBOOK'),
  signInAnonymously: actionCreator<Fetch>('SIGNIN_ANONYMOUSLY'),
  signOut: actionCreator<Fetch>('SIGNOUT'),
  setAuth: actionCreator<string>('SET_AUTH'),
  resetAuth: actionCreator<void>('RESET_AUTH'),
  getMyUserRequest: actionCreator<string>('GET_MY_USER_REQUEST'),
  getMyUserSuccess: actionCreator<User>('GET_MY_USER_SUCCESS'),
  getMyUserFailure: actionCreator<void>('GET_MY_USER_FAILURE')
}

export const useAuthActions = () => {
  const dispatch = useDispatch()

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

  return {
    signInFacebook,
    signInAnonymously,
    signOut
  }
}
