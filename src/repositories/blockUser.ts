import firebase from '../repositories/firebase'
import { User } from '../entities/User'
import { createDocument } from '../entities/Document'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createBlockUser = async (uid: string, blockUser: User) => {
  const blockUserRef = usersRef.doc(uid).collection('blockUsers')
  const batch = db.batch()
  try {
    batch.set(blockUserRef.doc(), createDocument<User>(blockUser), { merge: false })
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
