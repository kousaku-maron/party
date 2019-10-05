import firebase from './firebase'

const db = firebase.firestore()
const storage = firebase.storage()

const storageRef = storage.ref('parties')
const partiesRef = db.collection('parties')

const metadata = {
  contentType: 'image/png'
}

// TODO: party objectを返す。
export const setThumbnail = async (uid: string, uri: string) => {
  const response = await fetch(uri)
  const blob = await response.blob()
  const thumbnailRef = storageRef.child(`${uid}/thumbnail01.png`)
  const task = thumbnailRef.put(blob, metadata)

  task
    .then(snapshop => snapshop.ref.getDownloadURL())
    .then(url => {
      partiesRef
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

// TODO: valudate入れる。party objectを返す。
export const setName = (uid: string, name: string) => {
  partiesRef
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
