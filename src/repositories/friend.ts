import firebase from './firebase'
import { User } from '../entities/User'
import { createDocument } from '../entities/Document'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createfriend = async (uid: string, friend: User) => {
  const friendsRef = usersRef.doc(uid).collection('friends')
  const batch = db.batch()
  try {
    batch.set(
      friendsRef.doc(),
      createDocument<User>({
        id: friend.id,
        enabled: friend.enabled,
        isAccepted: friend.isAccepted,
        isAnonymous: friend.isAnonymous,
        uid: friend.uid,
        userID: friend.userID,
        name: friend.name,
        thumbnailURL: friend.thumbnailURL,
        gender: friend.gender,
        blockUIDs: friend.blockUIDs,
        appliedFriendUIDs: friend.appliedFriendUIDs,
        friendUIDs: friend.friendUIDs
      }),
      { merge: false }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
