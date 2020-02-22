import firebase from '../repositories/firebase'
import { User, CreateUser } from '../entities/User'
import { createDocument } from '../entities/Document'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createBlockUser = async (uid: string, blockUser: User) => {
  const blockUserRef = usersRef.doc(uid).collection('blockUsers')
  const batch = db.batch()
  const { id, ...others } = blockUser// eslint-disable-line
  const omittedBlockUser = { ...others }
  try {
    batch.set(blockUserRef.doc(), createDocument<CreateUser>(omittedBlockUser), { merge: false })
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
