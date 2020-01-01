import { useEffect, useState, useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import firebase, { functions } from '../repositories/firebase'
import { Party, buildParty } from '../entities'
import { useAuthState, useUIActions, useRoomActions } from '../store/hooks'
import { getParty } from '../repositories/party'

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
  }, [user])

  return parties
}

export const useParty = (partyID: string) => {
  const [party, setParty] = useState<Party>(null)
  useEffect(() => {
    const asyncEffect = async () => {
      if (!partyID) return
      const party = await getParty(partyID)
      setParty(party)
    }
    asyncEffect()
    return
  }, [partyID])

  return party
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
