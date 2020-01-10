import { db } from './firebase'
import { buildGroup, UpdateGroup, updateDocument, User, createDocument, CreateGroup } from '../entities'
const partiesRef = db.collection('parties')
import { getRandomID } from '../services/util'
const noUserThumbnail =
  'https://firebasestorage.googleapis.com/v0/b/insta-693eb.appspot.com/o/users%2Fno_ser%2Fno_user.png?alt=media&token=e12d3a21-fd74-460d-bbf3-ea8175a7f50d'
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
    return { result: true, memberIDs: members.map(member => member.uid) }
  } catch (e) {
    console.warn(e)
    return { result: false, memberIDs: null }
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
      batch.set(
        membersRef.doc(),
        createDocument<User>({
          uid: member.uid,
          userID: member.userID,
          enabled: member.enabled,
          isAccepted: member.isAccepted,
          isAnonymous: member.isAnonymous,
          name: member.name,
          gender: member.gender,
          thumbnailURL: member.thumbnailURL ?? noUserThumbnail
        }),
        { merge: false }
      )
    })
    await batch.commit()
    return { resultCreateGroupMembers: true, memberIDs: members.map(member => member.uid) }
  } catch (e) {
    console.warn(e)
    return { resultCreateGroupMembers: false, memberIDs: null }
  }
}

export const createGroup = async (partyID: string, group: CreateGroup) => {
  const groupID = getRandomID()
  if (!partyID || !groupID || !group) return

  try {
    const partyDoc = partiesRef.doc(partyID)
    const groupsRef = partyDoc.collection('groups')
    const batch = db.batch()

    batch.set(
      groupsRef.doc(groupID),
      createDocument<CreateGroup>({
        organizerUID: group.organizerUID,
        organizerName: group.organizerName,
        organizerGender: group.organizerGender,
        thumbnailURL: group.thumbnailURL ?? noUserThumbnail,
        enabled: true,
        appliedUIDs: []
      }),
      { merge: false }
    )
    await batch.commit()
    return { resultCreateGroup: true, groupID }
  } catch (e) {
    console.warn(e)
    return { resultCreateGroup: false, groupID: null }
  }
}
