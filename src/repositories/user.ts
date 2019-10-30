import { db, storage, functions } from './firebase'
import { buildUser, UpdateUser, updateDocument } from '../entities'
import { userEditFlashCardTrue, userEditFlashCardFalse } from '../services/flashCard'

const storageRef = storage.ref('users')
const usersRef = db.collection('users')

const metadata = {
  contentType: 'image/png'
}

const setThumbnail = async (uid: string, url: string) => {
  const thumbnailRef = storageRef.child(`${uid}/thumbnail01.png`)
  const response = await fetch(url)
  const blob = await response.blob()
  const task = thumbnailRef.put(blob, metadata)

  return task
    .then(snapshop => snapshop.ref.getDownloadURL())
    .then(async url => {
      return { thumbnailURL: url }
    })
    .catch(e => {
      console.warn(e)
      return { thumbnailURL: null }
    })
}

const setUserID = async (uid: string, userID: string) => {
  try {
    await functions.httpsCallable('updateUserID')({ uid, userID })
    return { userID }
  } catch (e) {
    console.warn(e)
    return { userID: null }
  }
}

export const getUser = async (uid: string) => {
  try {
    const snapshot = await usersRef.doc(uid).get()
    const user = buildUser(snapshot.data())
    return user
  } catch (e) {
    console.warn(e)
    return null
  }
}

export const setUser = async (uid: string, user: UpdateUser) => {
  try {
    if (user.userID) {
      const { userID } = await setUserID(uid, user.userID)
      if (!userID) {
        throw 'update userID failure.'
      }
    }

    if (user.thumbnailURL) {
      const { thumbnailURL } = await setThumbnail(uid, user.thumbnailURL)
      if (!thumbnailURL) {
        throw 'update thumbnail failure.'
      }

      await usersRef.doc(uid).set(
        updateDocument({
          name: user.name,
          thumbnailURL
        }),
        { merge: true }
      )
      userEditFlashCardTrue()

      return { result: true }
    }

    await usersRef.doc(uid).set(updateDocument({ name: user.name }), { merge: true })

    return { result: true }
  } catch (e) {
    console.warn(e)
    userEditFlashCardFalse()

    return { result: false }
  }
}
