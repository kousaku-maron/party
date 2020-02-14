import firebase from './firebase'
import { User } from '../entities/User'
import { createDocument } from '../entities/Document'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createAppliedFriend = async (uid: string, appliedFriend: User) => {
  const appliedFriendRef = usersRef.doc(uid).collection('appliedFriends')
  const batch = db.batch()
  try {
    batch.set(
      appliedFriendRef.doc(),
      createDocument<User>({
        enabled: appliedFriend.enabled,
        isAccepted: appliedFriend.isAccepted,
        isAnonymous: appliedFriend.isAnonymous,
        uid: appliedFriend.uid,
        userID: appliedFriend.userID,
        name: appliedFriend.name,
        ...(appliedFriend.thumbnailURL && { thumbnailURL: appliedFriend.thumbnailURL }),
        ...(appliedFriend.gender && { gender: appliedFriend.gender }),
        ...(appliedFriend.blockUIDs && { blockUIDs: appliedFriend.blockUIDs }),
        ...(appliedFriend.appliedFriendsUIDs && { appliedFriendsUIDs: appliedFriend.appliedFriendsUIDs }),
        ...(appliedFriend.acceptedFriendsUIDs && { acceptedFriendsUIDs: appliedFriend.acceptedFriendsUIDs })
      }),
      { merge: false }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}

export const deleteAppliedFriend = async (uid: string, appliedFriendUID: string) => {
  const appliedFriendsRef = usersRef
    .doc(uid)
    .collection('appliedFriends')
    .doc(appliedFriendUID)
  const batch = db.batch()
  try {
    batch.delete(appliedFriendsRef)
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}

export const getAppliedFriendUID = async (uid: string, appliedFriendUID: string) => {
  const appliedFriendsRef = usersRef.doc(uid).collection('appliedFriends')
  const snapshot = await appliedFriendsRef.where('uid', '==', appliedFriendUID).get()

  if (snapshot.docs.length !== 1) {
    console.warn('There are  mroe than two uids')
    return
  }
  return snapshot.docs[0].id
}
