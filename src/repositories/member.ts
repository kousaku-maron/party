import { db } from './firebase'
import { CreateUser, buildUser, createDocument } from '../entities'

const partiesRef = db.collection('parties')
export const getMembers = async (partyID: string, groupID: string) => {
  const membersRef = partiesRef
    .doc(partyID)
    .collection('groups')
    .doc(groupID)
    .collection('mambers')
  try {
    const snapShot = await membersRef.get()
    const members = snapShot.docs.map(doc => buildUser(doc.id, doc))
    return members
  } catch (e) {
    console.warn(e)
  }
}

export const createMembers = async (partyID: string, groupID: string, members: CreateUser[]) => {
  if (!members || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const membersRef = groupsRef.doc(groupID).collection('members')
  const batch = db.batch()
  try {
    members.map(member => {
      batch.set(membersRef.doc(), createDocument<CreateUser>(member), { merge: false })
    })
    await batch.commit()
    return { result: true, ids: members.map(member => member.uid) }
  } catch (e) {
    console.warn(e)
    return { result: false, ids: null }
  }
}
