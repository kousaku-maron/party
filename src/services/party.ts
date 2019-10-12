import { useEffect, useState } from 'react'
import firebase from '../repositories/firebase'
import { buildParty, Party } from '../entities'
import moment from 'moment'
import { getUser } from '../repositories/user'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

export const useParties = () => {
  const [parties, setParties] = useState<Party[]>()

  useEffect(() => {
    const parties = []
    const fetchData = async () => {
      await partiesRef
        .orderBy('date')
        .get()
        .then(snapshot => {
          snapshot.forEach(partyRef => {
            const party = buildParty(partyRef.data())
            parties.push(party)
          })
          setParties(parties)
        })
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
      const party = buildParty(doc.data())
      setParty(party)
    })
    return () => {
      unsubscribe()
    }
  }, [pid])

  return party
}

export const applyParty = async (pid: string, uid: string) => {
  const user = await getUser(uid)
  if (!uid || !pid) return
  const partyRef = partiesRef
    .doc('4Q0SSM6SVWRc50VUgBRh')
    .collection('joinUsers')
    .doc('ofReLZxSY9jG3cjud8Xh')
    .collection('applicant')

  partyRef.add({
    enabled: user.enabled,
    isAccepred: user.isAccepted,
    role: 'organizer',
    name: user.name,
    thumbnailURL: user.thumbnailURL,
    uid: user.uid,
    ppid: String(pid) + 'a'
  })
}
export const formatedDate = fetchDate => {
  return String(moment(fetchDate).format('YYYY年MM月DD日HH:MM'))
}
