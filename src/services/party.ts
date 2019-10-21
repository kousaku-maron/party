import { useEffect, useState } from 'react'
import firebase from '../repositories/firebase'
import { buildParty, Party } from '../entities'
import { getUser } from '../repositories/user'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

export const useParties = () => {
  const [parties, setParties] = useState<Party[]>()

  useEffect(() => {
    const fetchData = async () => {
      const snapShot = await partiesRef.orderBy('date').get()
      const parties = snapShot.docs.map(doc => {
        const party = buildParty(doc.id, doc.data())
        return party
      })
      setParties(parties)
    }
    fetchData()
  }, [])
  return parties
}

export const useParty = (partyID: string) => {
  const [party, setParty] = useState<Party>(null)
  useEffect(() => {
    if (!partyID) return
    const partyRef = partiesRef.doc(partyID)
    const unsubscribe = partyRef.onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
      const party = buildParty(partyRef.id, doc.data())
      setParty(party)
    })
    return () => {
      unsubscribe()
    }
  }, [partyID])

  return party
}

export const applyParty = async (uid: string, partyID: string) => {
  const batch = db.batch()
  const user = await getUser(uid)
  if (!uid || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  batch.set(groupsRef.doc(), {
    organizer: uid,
    gender: user.gender,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  })

  const snapShot = await groupsRef.where('organizer', '==', uid).get()

  snapShot.docs.map(groupDoc => {
    const membersRef = groupsRef.doc(groupDoc.id).collection('members')
    batch.set(membersRef.doc(), {
      memberID: uid
    })
  })

  await batch.commit()
}
