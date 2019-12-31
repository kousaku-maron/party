import { db } from './firebase'
import { buildParty, UpdateParty, updateDocument, createDocument, User } from '../entities'
import { getGroup } from './groups'
const partiesRef = db.collection('parties')

export const getParty = async (partyID: string) => {
  try {
    const snapshot = await partiesRef.doc(partyID).get()
    const party = buildParty(partyID, snapshot.data())
    return party
  } catch (e) {
    console.warn(e)
    return null
  }
}

export const setParty = async (partyID: string, user: User) => {
  const partyDoc = partiesRef.doc(partyID)
  const party = await getParty(partyID)
  try {
    const batch = db.batch()

    batch.set(
      partiesRef.doc(partyID),
      updateDocument<UpdateParty>({
        name: party.name
      }),
      { merge: true }
    )
    const groupsRef = partyDoc.collection('groups')
    batch.set(
      groupsRef.doc(),
      createDocument({
        organizerID: user.uid,
        gender: user.gender
      })
    )

    const snapShot = await groupsRef.where('organizer', '==', user.uid).get()
    snapShot.docs.map(groupDoc => {
      const membersRef = groupsRef.doc(groupDoc.id).collection('members')
      batch.set(
        membersRef.doc(),
        createDocument({
          memberID: user.uid,
          gender: user.gender
        })
      )
    })

    await batch.commit()
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}

//TODO: 名前を変えてgroupsに入れたほうが良いか相談
export const setPartyOrganizer = async (organizer: User, partyID: string, batch: firebase.firestore.WriteBatch) => {
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

//TODO: 名前を変えてgroupsに入れたほうが良いか相談
export const setPartyMembers = async (
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
