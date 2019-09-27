import firebase from './firebase'

const db = firebase.firestore()
const storage = firebase.storage()

const storageRef = storage.ref('users')
const usersRef = db.collection('users')

const metadata = {
  contentType: 'image/png'
}

// TODO: user objectを返す。
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
