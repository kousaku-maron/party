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
        enabled: blockUser.enabled,
        isAccepted: blockUser.isAccepted,
        isAnonymous: blockUser.isAnonymous,
        uid: blockUser.uid,
        userID: blockUser.userID,
        name: blockUser.name,
        ...(blockUser.thumbnailURL && { thumbnailURL: blockUser.thumbnailURL }),
        ...(blockUser.gender && { gender: blockUser.gender }),
        ...(blockUser.blockUIDs && { blockUIDs: blockUser.blockUIDs }),
        ...(blockUser.appliedFriendsUIDs && { appliedFriendsUIDs: blockUser.appliedFriendsUIDs }),
        ...(blockUser.friendUIDs && { friendUIDs: blockUser.friendUIDs })
      }),
      { merge: false }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
