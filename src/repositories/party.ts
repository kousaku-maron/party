import { db } from './firebase'
import { buildParty } from '../entities'
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
