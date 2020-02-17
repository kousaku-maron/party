import firebase from '../repositories/firebase'
import { User } from '../entities/User'
import { createDocument } from '../entities/Document'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createBlockUser = async (uid: string, blockUser: User) => {
  const blockUserRef = usersRef.doc(uid).collection('blockUsers')
  const batch = db.batch()
  try {
    batch.set(
      blockUserRef.doc(),
      createDocument<User>({
        id: blockUser.id,
        enabled: blockUser.enabled,
        isAccepted: blockUser.isAccepted,
        isAnonymous: blockUser.isAnonymous,
        uid: blockUser.uid,
        userID: blockUser.userID,
        name: blockUser.name,
        thumbnailURL: blockUser.thumbnailURL,
        gender: blockUser.gender,
        blockUIDs: blockUser.blockUIDs,
        appliedFriendUIDs: blockUser.appliedFriendUIDs,
        friendUIDs: blockUser.friendUIDs
      }),
      { merge: false }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
