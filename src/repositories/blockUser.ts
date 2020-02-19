import firebase from '../repositories/firebase'
import { User, CreateUser } from '../entities/User'
import { createDocument } from '../entities/Document'
import _ from 'lodash'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const createBlockUser = async (uid: string, blockUser: User) => {
  const blockUserRef = usersRef.doc(uid).collection('blockUsers')
  const batch = db.batch()
  try {
    batch.set(
      blockUserRef.doc(),
      createDocument<CreateUser>({
        ..._.omit(blockUser, 'id')
      }),
      { merge: false }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}
