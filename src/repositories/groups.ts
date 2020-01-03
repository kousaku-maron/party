import { db } from './firebase'
import { buildGroup, UpdateGroup, updateDocument, Member, createDocument, UpdateMember, Group } from '../entities'
const partiesRef = db.collection('parties')
import { getRandomID } from '../services/util'

export const getGroup = async (partyID: string, groupID: string) => {
  try {
    const snapShot = await partiesRef
      .doc(partyID)
      .collection('groups')
      .doc(groupID)
      .get()
    const group = buildGroup(snapShot.data())
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

export const setGroupMembers = async (partyID: string, groupID: string, members: Member[]) => {
  if (!members || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const membersRef = groupsRef.doc(groupID).collection('members')
  const batch = db.batch()

  members.map(member => {
    batch.set(
      membersRef.doc(),
      updateDocument<UpdateMember>({
        memberUID: member.memberUID,
        name: member.name,
        thumbnailURL: member.thumbnailURL
      }),
      { merge: true }
    )
  })
  return batch
}

export const createGroupMembers = async (partyID: string, groupID: string, members: Member[]) => {
  if (!members || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const membersRef = groupsRef.doc(groupID).collection('members')
  const batch = db.batch()

  try {
    members.map(member => {
      batch.set(
        membersRef.doc(),
        createDocument<Member>({
          memberUID: member.memberUID,
          memberID: member.memberID,
          enabled: member.enabled,
          isAccepted: member.isAccepted,
          isAnonymous: member.isAnonymous,
          name: member.name,
          gender: member.gender,
          thumbnailURL: member.thumbnailURL
        }),
        { merge: false }
      )
    })
    await batch.commit()
  } catch (e) {
    console.warn(e)
  }
}

export const createGroup = async (partyID: string, group: Group) => {
  const groupID = getRandomID()
  if (!partyID || !groupID || group) return
  try {
    const partyDoc = partiesRef.doc(partyID)
    const groupsRef = partyDoc.collection('groups')
    const membersRef = groupsRef.doc(groupID).collection('members')
    const batch = db.batch()

    batch.set(
      membersRef.doc(),
      createDocument<Group>({
        organizerUID: group.organizerUID,
        organizerName: group.organizerName,
        organizerGender: group.organizerGender,
        thumbnailURL: group.thumbnailURL,
        enabled: true,
        appliedUIDs: []
      }),
      { merge: false }
    )
    await batch.commit()
    return { result: true, groupID }
  } catch (e) {
    console.warn(e)
    return { result: false, groupID: null }
  }
}
