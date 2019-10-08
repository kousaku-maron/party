import { useEffect, useState } from 'react'
import firebase from '../repositories/firebase'
import { buildParty, Party } from '../entities'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

export const useParties = () => {
  const [parties, setParties] = useState<Party[]>()

  useEffect(() => {
    const parties = []
    const fetchData = async () => {
      await partiesRef.get().then(snapshot => {
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
