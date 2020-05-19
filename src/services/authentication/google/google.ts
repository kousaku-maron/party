import { Platform } from 'react-native'
import firebase from '../../../repositories/firebase'
import { GoogleSignin } from '@react-native-community/google-signin'

type Result = {
  success?: boolean
  cancelled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

const getIdToken = async () => {
  try {
    GoogleSignin.configure({
      webClientId:
        Platform.OS === 'ios' ? process.env.GOOGLE_CLIENT_ID_FOR_IOS : process.env.GOOGLE_CLIENT_ID_FOR_ANDROID,
      offlineAccess: false,
      forceCodeForRefreshToken: true
    })
    await GoogleSignin.hasPlayServices()

    const { idToken } = await GoogleSignin.signIn()
    return idToken
  } catch (error) {
    console.warn(error)
  }
}

export const signInGoogle = async (): Promise<Result> => {
  try {
    const idToken = await getIdToken()
    console.info(idToken)

    if (!idToken) {
      return { cancelled: true }
    }

    const credential = firebase.auth.GoogleAuthProvider.credential(idToken)

    firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
        throw new Error(error)
      })

    return { success: true }
  } catch (e) {
    console.warn(e)
    return { error: e }
  }
}
