import firebase from '../../repositories/firebase'
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
    await Facebook.initializeAsync(APPID, 'party demo')
    const result = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile']
    })

    if (result.type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(result.token)
      console.info(result.token)

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

export const linkWithFacebook = async (): Promise<Result> => {
  try {
    await Facebook.initializeAsync(APPID, 'party demo')
    const result = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile']
    })

    if (result.type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(result.token)
      console.info(result.token)

      firebase
        .auth()
        .currentUser.linkAndRetrieveDataWithCredential(credential)
        .then(
          usercred => {
            const user = usercred.user
            console.info('Anonymous account successfully upgraded', user)
            return { success: true }
          },
          error => {
            console.warn('Error upgrading anonymous account', error)
            return { error }
          }
        )
    }

    return { cancelled: true }
  } catch (e) {
    return { error: e }
  }
}
