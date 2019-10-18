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

export const useParty = (pid: string) => {
  const [party, setParty] = useState<Party>(null)

  useEffect(() => {
    if (!pid) return
    const partyRef = partiesRef.doc(pid)
    const unsubscribe = partyRef.onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
      const party = buildParty(partyRef.id, doc.data())
      setParty(party)
    })
    return () => {
      unsubscribe()
    }
  }, [pid])

  return party
}

export const applyParty = async (uid: string, partyID: string) => {
  const user = await getUser(uid)
  if (!uid || !partyID) return
  const partyRef = partiesRef.doc(partyID)
  const groupsRef = partyRef.collection('groups')
  groupsRef.add({
    ourganizer: uid,
    gender: user.gender
  })
  //const memberRef = groupsRef.collection('memberID')
  // groupsRef.add({
  //   enabled: user.enabled,
  //   isAccepred: user.isAccepted,
  //   role: 'organizer',
  //   name: user.name,
  //   thumbnailURL: user.thumbnailURL,
  //   uid: user.uid,
  //   sex: user.gender
  // })
}
