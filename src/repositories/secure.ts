import { db } from './firebase'
import { Secure, buildSecure } from '../entities'
import { updateDocument } from '../entities'

const usersRef = db.collection('users')
const getSecureRef = (uid: string) => {
  return usersRef
    .doc(uid)
    .collection('options')
    .doc('secure')
}

export const getSecure = async (uid: string) => {
  const secureRef = getSecureRef(uid)

  try {
    const snapshot = await secureRef.get()
    const secure = buildSecure(snapshot.data())
    return secure
  } catch (e) {
    console.warn(e)
    return null
  }
}

export const setSecure = async (uid: string, secure: Secure) => {
  const secureRef = getSecureRef(uid)

  try {
    await secureRef.set(
      updateDocument<Secure>({
        pushToken: secure.pushToken,
        certificateURL: secure.certificateURL
      })
    )
    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
