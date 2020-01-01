import { db } from './firebase'
import { buildParty, UpdateParty, updateDocument, createDocument, User } from '../entities'
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
