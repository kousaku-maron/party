import firebase from './firebase'
import { User } from '../entities/User'
import { createDocument } from '../entities/Document'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createAcceptedUser = async (uid: string, acceptedFriend: User) => {
  const acceptedFriendsRef = usersRef.doc(uid).collection('acceptedFriends')
  const batch = db.batch()
  try {
    batch.set(
      acceptedFriendsRef.doc(),
      createDocument<User>({
        enabled: acceptedFriend.enabled,
        isAccepted: acceptedFriend.isAccepted,
        isAnonymous: acceptedFriend.isAnonymous,
        uid: acceptedFriend.uid,
        userID: acceptedFriend.userID,
        name: acceptedFriend.name,
        ...(acceptedFriend.thumbnailURL && { thumbnailURL: acceptedFriend.thumbnailURL }),
        ...(acceptedFriend.gender && { gender: acceptedFriend.gender }),
        ...(acceptedFriend.blockUIDs && { blockUIDs: acceptedFriend.blockUIDs }),
        ...(acceptedFriend.appliedFriendsUIDs && { appliedFriendsUIDs: acceptedFriend.appliedFriendsUIDs }),
        ...(acceptedFriend.acceptedFriendsUIDs && { acceptedFriendsUIDs: acceptedFriend.acceptedFriendsUIDs })
      }),
      { merge: false }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
