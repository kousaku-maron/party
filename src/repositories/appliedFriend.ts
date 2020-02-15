import firebase from './firebase'
import { User } from '../entities/User'
import { createDocument } from '../entities/Document'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createAppliedFriendUser = async (uid: string, appliedFriendUser: User) => {
  const appliedFriendUserRef = usersRef.doc(uid).collection('appliedFriendUsers')
  const batch = db.batch()
  try {
    batch.set(
      appliedFriendUserRef.doc(),
      createDocument<User>({
        enabled: appliedFriendUser.enabled,
        isAccepted: appliedFriendUser.isAccepted,
        isAnonymous: appliedFriendUser.isAnonymous,
        uid: appliedFriendUser.uid,
        userID: appliedFriendUser.userID,
        name: appliedFriendUser.name,
        ...(appliedFriendUser.thumbnailURL && { thumbnailURL: appliedFriendUser.thumbnailURL }),
        ...(appliedFriendUser.gender && { gender: appliedFriendUser.gender }),
        ...(appliedFriendUser.blockUIDs && { blockUIDs: appliedFriendUser.blockUIDs }),
        ...(appliedFriendUser.appliedFriendUIDs && { appliedFriendUIDs: appliedFriendUser.appliedFriendUIDs }),
        ...(appliedFriendUser.friendUIDs && { friendUIDs: appliedFriendUser.friendUIDs })
      }),
      { merge: false }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}

export const deleteAppliedFriendUser = async (uid: string, appliedFriendUID: string) => {
  const appliedFriendUserRef = usersRef
    .doc(uid)
    .collection('appliedFriendUsers')
    .doc(appliedFriendUID)
  const batch = db.batch()
  try {
    batch.delete(appliedFriendUserRef)
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}

export const getAppliedFriendUserUID = async (uid: string, appliedFriendUID: string) => {
  const appliedFriendUsersRef = usersRef.doc(uid).collection('appliedFriendUsers')
  const snapshot = await appliedFriendUsersRef.where('uid', '==', appliedFriendUID).get()

  if (snapshot.docs.length !== 1) {
    console.warn('There are  mroe than two uids')
    return
  }
  return snapshot.docs[0].id
}
