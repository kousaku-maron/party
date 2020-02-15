import firebase from './firebase'
import { User } from '../entities/User'
import { createDocument } from '../entities/Document'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createAcceptedFriendUser = async (uid: string, acceptedFriendUser: User) => {
  const friendUsersRef = usersRef.doc(uid).collection('friendUsers')
  const batch = db.batch()
  try {
    batch.set(
      friendUsersRef.doc(),
      createDocument<User>({
        enabled: acceptedFriendUser.enabled,
        isAccepted: acceptedFriendUser.isAccepted,
        isAnonymous: acceptedFriendUser.isAnonymous,
        uid: acceptedFriendUser.uid,
        userID: acceptedFriendUser.userID,
        name: acceptedFriendUser.name,
        ...(acceptedFriendUser.thumbnailURL && { thumbnailURL: acceptedFriendUser.thumbnailURL }),
        ...(acceptedFriendUser.gender && { gender: acceptedFriendUser.gender }),
        ...(acceptedFriendUser.blockUIDs && { blockUIDs: acceptedFriendUser.blockUIDs }),
        ...(acceptedFriendUser.appliedFriendUIDs && { appliedFriendUIDs: acceptedFriendUser.appliedFriendUIDs }),
        ...(acceptedFriendUser.friendUIDs && { friendUIDs: acceptedFriendUser.friendUIDs })
      }),
      { merge: false }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
