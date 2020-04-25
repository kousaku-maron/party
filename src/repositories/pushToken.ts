import { db } from './firebase'
import { CreatePushToken, buildPushToken, createDocument } from '../entities'

const usersRef = db.collection('users')

export const getPushTokens = async (uid: string) => {
  const pushTokensRef = usersRef.doc(uid).collection('pushTokens')

  try {
    const snapShot = await pushTokensRef.get()
    const pushTokens = snapShot.docs.map(doc => buildPushToken(doc.id, doc.data()))
    return pushTokens
  } catch (e) {
    console.warn(e)
    return null
  }
}

export const createPushToken = async (uid: string, pushToken: CreatePushToken) => {
  const pushTokensRef = usersRef.doc(uid).collection('pushTokens')

  try {
    await pushTokensRef.doc().set(createDocument<CreatePushToken>(pushToken))
    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}

export const deletePushToken = async (uid: string, pushTokenID: string) => {
  const pushTokensRef = usersRef.doc(uid).collection('pushTokens')

  try {
    await pushTokensRef.doc(pushTokenID).delete()
    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
