import { useEffect, useState } from 'react'
import firebase from '../repositories/firebase'
import { buildParty, Party } from '../entities'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

export const useParty = () => {
  const [party, setParty] = useState<Party>(null)
  const array: Party[] = []
  useEffect(() => {
    partiesRef.get().then(snapshot => {
      snapshot.forEach(partyRef => {
        const party = buildParty(partyRef.data())
        setParty(party)

        array.push(party)
      })
    })
  }, [array])
  return party
}
