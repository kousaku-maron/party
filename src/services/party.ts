import { useEffect, useState } from 'react'
import firebase from '../repositories/firebase'
import { buildParty, Party } from '../entities'
import { getUser } from '../repositories/user'
import { User, createDocument } from '../entities'
import { useAuthState } from '../store/hooks'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

export const useParties = () => {
  const [parties, setParties] = useState<Party[]>()
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    const fetchData = () => {
      if (!user) return
      partiesRef.where('enabled', '==', true).onSnapshot(snapShot => {
        const _parties: Party[] = []
        snapShot.docs.map(doc => {
          const party = buildParty(doc.id, doc.data())
          _parties.push(party)
        })
        setParties(_parties)
      })
    }
    fetchData()
  }, [parties, user])
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

export const entryParty = async (uid: string, partyID: string) => {
  const batch = db.batch()
  const user = await getUser(uid)
  if (!uid || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')

  // TODO: repository層に退避
  batch.set(
    groupsRef.doc(),
    createDocument({
      organizer: uid,
      gender: user.gender
    })
  )

  const snapShot = await groupsRef.where('organizer', '==', uid).get()

  snapShot.docs.map(groupDoc => {
    const membersRef = groupsRef.doc(groupDoc.id).collection('members')

    // TODO: repository層に退避
    batch.set(
      membersRef.doc(),
      createDocument({
        memberID: uid
      })
    )
  })

  await batch.commit()
}

export const entryPartyMembers = async (organizer, members: User[], partyID: string) => {
  const batch = db.batch()
  if (!members || !partyID) return
  const partyDoc = partiesRef.doc(partyID)
  const groupsRef = partyDoc.collection('groups')
  const groupID = groupsRef.doc().id

  // TODO: repository層に退避
  batch.set(
    groupsRef.doc(groupID),
    createDocument({
      organizer: organizer.userID,
      gender: organizer.gender
    })
  )

  const membersRef = groupsRef.doc(groupID).collection('members')

  // TODO: repository層に退避
  members.map(member => {
    batch.set(
      membersRef.doc(),
      createDocument({
        memberID: member.userID
      })
    )
  })

  await batch.commit()
}
