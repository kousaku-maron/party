import { Platform } from 'react-native'
import firebase from '../../../repositories/firebase'
import { GoogleSignin } from '@react-native-community/google-signin'

type Result = {
  success?: boolean
  cancelled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

const signInNativeApp = async () => {
  try {
    console.log(process.env.GOOGLE_CLIENT_ID_FOR_IOS)
    GoogleSignin.configure({
      webClientId:
        Platform.OS === 'ios' ? process.env.GOOGLE_CLIENT_ID_FOR_IOS : process.env.GOOGLE_CLIENT_ID_FOR_ANDROID,
      offlineAccess: false,
      forceCodeForRefreshToken: true
    })
    await GoogleSignin.hasPlayServices()

    const authState = await GoogleSignin.signIn()
    return authState
  } catch (error) {
    console.warn(error)
  }
}

export const signInGoogle = async (): Promise<Result> => {
  console.log('signinGoogleaa')
  try {
    console.log('signinGoogleaa')
    const authState = await signInNativeApp()

    console.info(authState.idToken)

    if (!authState.idToken) {
      return { cancelled: true }
    }

    const credential = firebase.auth.GoogleAuthProvider.credential(authState.idToken)

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
