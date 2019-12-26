import firebase from '../../repositories/firebase'
import * as Facebook from 'expo-facebook'

type Result = {
  success?: boolean
  cancelled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

export const signInFacebook = async (): Promise<Result> => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(process.env.FACEBOOK_APP_ID, {
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

export const linkWithFacebook = async (): Promise<Result> => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(process.env.FACEBOOK_APP_ID, {
      permissions: ['public_profile']
    })

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      console.info(token)

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
