import firebase from '../../repositories/firebase'
import * as AppleAuthentication from 'expo-apple-authentication'
import { getRandomID } from '../util'

type Result = {
  success?: boolean
  cancelled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

export const signInApple = async (): Promise<Result> => {
  try {
    const nonce = getRandomID()
    const { identityToken } = await AppleAuthentication.signInAsync({
      requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME],
      state: nonce
    })

    if (identityToken) {
      const provider = new firebase.auth.OAuthProvider('apple.com')
      const credential = provider.credential(identityToken) // TODO: nonce check process

      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          throw new Error(error)
        })
      return { success: true }
    }

    return { cancelled: true }
  } catch (e) {
    if (e.code === 'ERR_CANCELED') {
      return { cancelled: true }
    }

    console.warn(e)
    return { error: e }
  }
}

export const isAvailableSignInWithApple = async () => {
  const isAvailable = await AppleAuthentication.isAvailableAsync()
  return isAvailable
}
