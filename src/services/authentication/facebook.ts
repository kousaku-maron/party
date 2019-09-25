import firebase from '../firebase'
import * as Facebook from 'expo-facebook'

const APPID = '2544437788903140'

type Result = {
  success?: boolean
  cancelled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

export const signInFacebook = async (): Promise<Result> => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(APPID, {
      permissions: ['public_profile']
    })

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      console.info(token)

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
    console.warn(e)
    return { error: e }
  }
}
