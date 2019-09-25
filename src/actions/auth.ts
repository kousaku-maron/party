import actionCreateFactory from 'typescript-fsa'

const actionCreator = actionCreateFactory()

export interface Fetch {
  onSuccess?: () => void
  onFailure?: () => void
}

export const authActions = {
  signInFacebook: actionCreator<Fetch>('SIGNIN_FACEBOOK'),
  signOut: actionCreator<Fetch>('SIGNOUT'),
  setAuth: actionCreator<string>('SET_AUTH'),
  resetAuth: actionCreator<void>('RESET_AUTH')
}
