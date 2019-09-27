import firebase from '../../repositories/firebase'

type Result = {
  success?: boolean
  cancelled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

export const signOut = async (): Promise<Result> => {
  try {
    await firebase
      .auth()
      .signOut()
      .catch(error => {
        throw new Error(error)
      })
    return { success: true }
  } catch (e) {
    console.warn(e)
    return { error: e }
  }
}
