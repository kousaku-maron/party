import firebase from '../../repositories/firebase'

type Result = {
  success?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

export const signInAnonymously = async (): Promise<Result> => {
  try {
    firebase.auth().signInAnonymously()
    return { success: true }
  } catch (e) {
    console.warn(e)
    return { error: e }
  }
}
