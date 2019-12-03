import { db, storage, functions } from './firebase'
import { buildUser, UpdateUser, updateDocument, MessageUser, UpdateMessage } from '../entities'

const storageRef = storage.ref('users')
const usersRef = db.collection('users')

// MEMO: messagesの保存場所を一時的にparty直下にしている。
const roomsRef = db.collection('parties')
const getMessagesRef = (roomID: string) => {
  return roomsRef.doc(roomID).collection('messages')
}

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

// TODO: 参加中のルーム一覧を取得し、メッセージのuserもアップデートするように修正する。
export const setUser = async (uid: string, user: UpdateUser) => {
  try {
    if (user.userID) {
      const { userID } = await setUserID(uid, user.userID)
      if (!userID) {
        throw 'update userID failure.'
      }
    }

    const batch = db.batch()

    let updatedThumbnailURL = null
    if (user.thumbnailURL) {
      const { thumbnailURL } = await setThumbnail(uid, user.thumbnailURL)
      if (!thumbnailURL) {
        throw 'update thumbnail failure.'
      }

      updatedThumbnailURL = thumbnailURL

      batch.set(
        usersRef.doc(uid),
        updateDocument({
          name: user.name,
          thumbnailURL
        }),
        { merge: true }
      )
    }

    if (!user.thumbnailURL) {
      batch.set(
        usersRef.doc(uid),
        updateDocument({
          name: user.name
        }),
        { merge: true }
      )
    }

    // TODO: firestore triggerに退避させる。
    // ---------------------------------------
    const currentUser = await getUser(uid)

    const messageUpdateUser: MessageUser = {
      enabled: currentUser.enabled,
      isAccepted: currentUser.isAccepted,
      isAnonymous: currentUser.isAnonymous,
      uid,
      userID: user.userID || currentUser.userID,
      name: user.name,
      thumbnailURL: updatedThumbnailURL || currentUser.thumbnailURL,
      gender: currentUser.gender
    }

    const roomsSnapshot = await roomsRef.where('entryUIDs', 'array-contains', uid).get()
    const roomIDs = roomsSnapshot.docs.map(roomDoc => roomDoc.id)

    const tasks = roomIDs.map(async roomID => {
      const messagesRef = getMessagesRef(roomID)
      const messagesSnapshot = await messagesRef.where('writerUID', '==', uid).get()
      messagesSnapshot.docs.map(messageDoc => {
        batch.set(
          messageDoc.ref,
          updateDocument<UpdateMessage>({ user: messageUpdateUser }),
          { merge: true }
        )
      })
    })

    await Promise.all(tasks)

    await batch.commit()
    // ---------------------------------------

    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
