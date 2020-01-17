import { db } from './firebase'
import { User, buildUser, updateDocument, createDocument } from '../entities'

const partiesRef = db.collection('parties')
export const getMembers = async (partyID: string, groupID: string) => {
  const membersRef = partiesRef
    .doc(partyID)
    .collection('groups')
    .doc(groupID)
    .collection('mambers')
  try {
    const snapShot = await membersRef.get()
    const members = snapShot.docs.map(doc => buildUser(doc))
    return members
  } catch (e) {
    console.warn(e)
  }
}

export const setMembers = async (partyID: string, groupID: string, members: User[]) => {
  if (!members || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const membersRef = groupsRef.doc(groupID).collection('members')
  const batch = db.batch()
  try {
    members.map(member => {
      batch.set(membersRef.doc(), updateDocument<User>(member), { merge: true })
    })
    return { result: true, ids: members.map(member => member.uid) }
  } catch (e) {
    console.warn(e)
    return { result: false, ids: null }
  }
}

export const createMembers = async (partyID: string, groupID: string, members: User[]) => {
  if (!members || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const membersRef = groupsRef.doc(groupID).collection('members')
  const batch = db.batch()
  try {
    members.map(member => {
      batch.set(membersRef.doc(), createDocument<User>(member), { merge: false })
    })
    await batch.commit()
    return { result: true, ids: members.map(member => member.uid) }
  } catch (e) {
    console.warn(e)
    return { result: false, ids: null }
  }
}
