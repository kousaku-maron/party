import { useEffect, useState, useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import firebase, { functions } from '../repositories/firebase'
import { buildParty, Party } from '../entities'
import { getUser } from '../repositories/user'
import { User, createDocument } from '../entities'
import { showEntryPartyApplySunccessMessage, showEntryPartyApplyFailurMessage } from '../services/flashCard'
import { useAuthState, useUIActions, useRoomActions } from '../store/hooks'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

export const useParties = () => {
  const [parties, setParties] = useState<Party[]>()
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    if (!user) return
    const unsubscribe = partiesRef.where('enabled', '==', true).onSnapshot(snapShot => {
      const newParty: Party[] = snapShot.docs.map(doc => {
        return buildParty(doc.id, doc.data())
      })
      setParties(newParty)
    })

    return () => {
      unsubscribe()
    }
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

export const useEntryDemoRoom = () => {
  const { user } = useAuthState()
  const { openLoadingModal, closeLoadingModal } = useUIActions()
  const { entryDemoRoom } = useRoomActions()
  const navigation = useNavigation()

  const onPressEntryDemoRoom = useCallback(
    (party: Party) => {
      if (!user || !user.gender) return

      if (!party.entryUIDs?.includes(user.uid)) {
        openLoadingModal()

        const onSuccess = () => {
          closeLoadingModal()
          navigation.navigate('Chat', { roomID: party.id })
        }

        const onFailure = () => {
          closeLoadingModal()
        }

        entryDemoRoom({ roomID: party.id, onSuccess, onFailure })
        return
      }

      navigation.navigate('Chat', { roomID: party.id })
    },
    [closeLoadingModal, entryDemoRoom, navigation, openLoadingModal, user]
  )

  return { onPressEntryDemoRoom }
}

export const entryDemoParty = async (partyID: string) => {
  try {
    await functions.httpsCallable('entryParty')({ partyID })
    return { success: true }
  } catch (e) {
    console.warn(e)
    return { success: false, error: e }
  }
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

  try {
    await batch.commit()
    showEntryPartyApplySunccessMessage()
  } catch (e) {
    showEntryPartyApplyFailurMessage()
    console.warn(e)
  }
}
