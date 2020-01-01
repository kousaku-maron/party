import { db } from './firebase'
import { buildGroup, UpdateGroup, updateDocument, User, createDocument } from '../entities'
const partiesRef = db.collection('parties')

export const getGroup = async (partyID: string, groupID: string) => {
  try {
    const snapShot = await partiesRef
      .doc(partyID)
      .collection('groups')
      .doc(groupID)
      .get()
    const group = buildGroup(snapShot.id, snapShot.data())
    return group
  } catch (e) {
    console.warn(e)
    return null
  }
}

export const setGroup = async (partyID: string, group: UpdateGroup) => {
  try {
    const batch = db.batch()
    batch.set(
      partiesRef
        .doc(partyID)
        .collection('groups')
        .doc(group.uid),
      updateDocument<UpdateGroup>({
        uid: group.uid,
        organizerID: group.organizerID,
        organizerName: group.organizerName,
        thumbnailURL: group.thumbnailURL,
        appliedUIDs: group.appliedUIDs
      }),
      { merge: true }
    )
    await batch.commit()
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}

export const setGroupMembers = async (
  organizer: User,
  members: User[],
  partyID: string,
  batch: firebase.firestore.WriteBatch
) => {
  if (!members || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const group = await getGroup(partyID, organizer.uid)
  const groupID = group.uid
  const membersRef = groupsRef.doc(groupID).collection('members')

  members.map(member => {
    batch.set(
      membersRef.doc(),
      createDocument({
        memberID: member.userID,
        gender: member.gender
      })
    )
  })
  return batch
}

export const setGroupOrganizer = async (organizer: User, partyID: string, batch: firebase.firestore.WriteBatch) => {
  if (!organizer || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const group = await getGroup(partyID, organizer.uid)
  const groupID = group.uid

  batch.set(
    groupsRef.doc(groupID),
    createDocument({
      organizerID: organizer.userID,
      gender: organizer.gender
    })
  )

  return batch
}
