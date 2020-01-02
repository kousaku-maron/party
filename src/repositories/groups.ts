import { db } from './firebase'
import { buildGroup, UpdateGroup, updateDocument, User, createDocument, UpdateMember, CreateGroup } from '../entities'
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

export const updateGroup = async (partyID: string, groupID: string, group: UpdateGroup) => {
  try {
    const batch = db.batch()

    batch.set(
      partiesRef
        .doc(partyID)
        .collection('groups')
        .doc(groupID),
      updateDocument<UpdateGroup>({
        organizerUID: group.organizerUID,
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

export const setGroupMembers = async (members: User[], partyID: string, groupID: string) => {
  if (!members || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const membersRef = groupsRef.doc(groupID).collection('members')
  const batch = db.batch()

  members.map(member => {
    batch.set(
      membersRef.doc(),
      updateDocument<UpdateMember>({
        memberUID: member.uid,
        name: member.name,
        thumbnailURL: member.thumbnailURL
      }),
      { merge: true }
    )
  })
  return batch
}

export const createGroupMembers = async (members: User[], partyID: string, groupID: string) => {
  if (!members || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const membersRef = groupsRef.doc(groupID).collection('members')
  const batch = db.batch()

  try {
    members.map(member => {
      batch.set(
        membersRef.doc(),
        createDocument({
          memberID: member.userID,
          gender: member.gender
        }),
        { merge: false }
      )
    })
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}

export const createGroup = async (organizer: User, partyID: string, groupID: string) => {
  if (!organizer || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const membersRef = groupsRef.doc(groupID).collection('members')
  const batch = db.batch()

  batch.set(
    membersRef.doc(),
    createDocument<CreateGroup>({
      organizerUID: organizer.uid,
      organizerName: organizer.name,
      organizerGender: organizer.gender,
      thumbnailURL: organizer.thumbnailURL,
      enabled: true,
      appliedUIDs: []
    }),
    { merge: false }
  )
  return batch
}
