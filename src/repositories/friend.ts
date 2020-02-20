import firebase from './firebase'
import { User, CreateUser } from '../entities/User'
import { createDocument } from '../entities/Document'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createfriend = async (uid: string, friend: User) => {
  const friendsRef = usersRef.doc(uid).collection('friends')
  const batch = db.batch()
  const { id, ...others } = friend// eslint-disable-line
  const omittedFriend = { ...others }
  try {
    batch.set(friendsRef.doc(), createDocument<CreateUser>(omittedFriend), { merge: false })
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
