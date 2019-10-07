import firebase from './firebase'
import { buildUser, User } from '../entities'

const db = firebase.firestore()
const storage = firebase.storage()

const storageRef = storage.ref('users')
const usersRef = db.collection('users')

const metadata = {
  contentType: 'image/png'
}

export const setThumbnail = async (uid: string, uri: string) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  const thumbnailRef = storageRef.child(`${uid}/thumbnail01.png`)
  const task = thumbnailRef.put(blob, metadata)

  task
    .then(snapshop => snapshop.ref.getDownloadURL())
    .then(url => {
      usersRef
        .doc(uid)
        .set(
          {
            thumbnailURL: url,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          },
          { merge: true }
        )
        .then(
          () => {
            return { result: true }
          },
          error => {
            console.warn(error)
            return { result: false }
          }
        )
    })
}

// TODO: valudate入れる。
export const setName = (uid: string, name: string) => {
  usersRef
    .doc(uid)
    .set(
      {
        name,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    )
    .then(
      () => {
        return { result: true }
      },
      error => {
        console.warn(error)
        return { result: false }
      }
    )
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

export const setUser = async (uid: string, user: User) => {
  try {
    await usersRef
      .doc(uid)
      .set({ ...user, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true })
    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
