import { db } from './firebase'
import { buildGroup, UpdateGroup, updateDocument, User, createDocument, CreateGroup } from '../entities'
import { getRandomID } from '../services/util'

const partiesRef = db.collection('parties')
export const getGroup = async (partyID: string, groupID: string) => {
  try {
    const snapShot = await partiesRef
      .doc(partyID)
      .collection('groups')
      .doc(groupID)
      .get()
    const group = buildGroup(groupID, snapShot.data())
    return group
  } catch (e) {
    console.warn(e)
    return null
  }
}
export const updateGroup = async (partyID: string, groupID: string, group: UpdateGroup) => {
  try {
    const batch = db.batch()

    batch.set(
      partiesRef
        .doc(partyID)
        .collection('groups')
        .doc(groupID),
      updateDocument<UpdateGroup>(group),
      { merge: true }
    )

    await batch.commit()
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}

export const setGroupMembers = async (partyID: string, groupID: string, members: User[]) => {
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

export const createGroupMembers = async (partyID: string, groupID: string, members: User[]) => {
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

export const createGroup = async (partyID: string, group: CreateGroup) => {
  const groupID = getRandomID()
  if (!partyID || !groupID || !group) return

  try {
    const partyDoc = partiesRef.doc(partyID)
    const groupsRef = partyDoc.collection('groups')
    const batch = db.batch()

    batch.set(groupsRef.doc(groupID), createDocument<CreateGroup>(group), { merge: false })
    await batch.commit()
    return { result: true, groupID }
  } catch (e) {
    console.warn(e)
    return { result: false, groupID: null }
  }
}
