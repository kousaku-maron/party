import firebase from './firebase'
import { User, CreateUser } from '../entities/User'
import { createDocument } from '../entities/Document'
import _ from 'lodash'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createfriend = async (uid: string, friend: User) => {
  const friendsRef = usersRef.doc(uid).collection('friends')
  const batch = db.batch()
  try {
    batch.set(
      friendsRef.doc(),
      createDocument<CreateUser>({
        ..._.omit(friend, 'id')
      }),
      { merge: false }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
