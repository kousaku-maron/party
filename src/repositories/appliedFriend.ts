import firebase from './firebase'
import { User, CreateUser, buildUser } from '../entities/User'
import { createDocument } from '../entities/Document'
import _ from 'lodash'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createAppliedFriendUser = async (uid: string, appliedFriendUser: User) => {
  const appliedFriendUserRef = usersRef.doc(uid).collection('appliedFriendUsers')
  const batch = db.batch()
  try {
    batch.set(
      appliedFriendUserRef.doc(),
      createDocument<CreateUser>({
        ..._.omit(appliedFriendUser, 'id')
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

export const getAppliedFriendUser = async (uid: string, appliedFriendUID: string) => {
  const appliedFriendUsersRef = usersRef.doc(uid).collection('appliedFriendUsers')
  const snapshot = await appliedFriendUsersRef.where('uid', '==', appliedFriendUID).get()

  if (snapshot.docs.length !== 1) {
    console.warn('There are  mroe than two uids')
    return
  }
  const appliedFriendUser = buildUser(snapshot.docs[0].id, snapshot.docs[0].data)
  return appliedFriendUser
}
