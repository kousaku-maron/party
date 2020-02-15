import firebase from './firebase'
import { User } from '../entities/User'
import { createDocument } from '../entities/Document'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createfriend = async (uid: string, friend: User) => {
  const friendUsersRef = usersRef.doc(uid).collection('friendUsers')
  const batch = db.batch()
  try {
    batch.set(
      friendUsersRef.doc(),
      createDocument<User>({
        enabled: friend.enabled,
        isAccepted: friend.isAccepted,
        isAnonymous: friend.isAnonymous,
        uid: friend.uid,
        userID: friend.userID,
        name: friend.name,
        ...(friend.thumbnailURL && { thumbnailURL: friend.thumbnailURL }),
        ...(friend.gender && { gender: friend.gender }),
        ...(friend.blockUIDs && { blockUIDs: friend.blockUIDs }),
        ...(friend.appliedFriendUIDs && { appliedFriendUIDs: friend.appliedFriendUIDs }),
        ...(friend.friendUIDs && { friendUIDs: friend.friendUIDs })
      }),
      { merge: false }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
