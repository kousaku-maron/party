import { useEffect, useState, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import firebase, { functions } from '../repositories/firebase'
import { User, Party, buildParty } from '../entities'
import { useAuthState, useUIActions, useRoomActions } from '../store/hooks'

const db = firebase.firestore()
const usersRef = db.collection('users')
const partiesRef = db.collection('parties')

export const usePartiesByTags = (tags: string[]) => {
  const [parties, setParties] = useState<Party[]>([])
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!user) return
      const unsubscribe = partiesRef
        .where('enabled', '==', true)
        .where('tags', 'array-contains-any', tags)
        .onSnapshot(
          snapShot => {
            const newParty: Party[] = snapShot.docs.map(doc => {
              return buildParty(doc.id, doc.data())
            })
            setParties(newParty)
          },
          error => {
            console.info('catch usePartiesByTags error', error)
          }
        )

      return () => {
        unsubscribe()
      }
    })
  }, [tags, user])

  return parties
}

export const useParties = () => {
  const [parties, setParties] = useState<Party[]>()
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!user) return
      const unsubscribe = partiesRef.where('enabled', '==', true).onSnapshot(
        snapShot => {
          const newParty: Party[] = snapShot.docs.map(doc => {
            return buildParty(doc.id, doc.data())
          })
          setParties(newParty)
        },
        error => {
          console.info('catch useParties error', error)
        }
      )

      return () => {
        unsubscribe()
      }
    })
  }, [user])

  return parties
}

export const useParty = (partyID: string) => {
  const [party, setParty] = useState<Party>(null)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!partyID) return
      const partyRef = partiesRef.doc(partyID)
      const unsubscribe = partyRef.onSnapshot(
        (doc: firebase.firestore.DocumentSnapshot) => {
          const party = buildParty(doc.id, doc.data())
          setParty(party)
        },
        error => {
          console.info('catch useParty error', error)
        }
      )
      return () => {
        unsubscribe()
      }
    })
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

//MEMO: appliedParty.tsを作るかどうか...
export const useAppliedParties = (user: User) => {
  const [parties, setParties] = useState<Party[]>()

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!user || !user.appliedPartyUIDs) return
      const appliedPartiesRef = usersRef.doc(user.uid).collection('appliedParties')
      const unsubscribe = appliedPartiesRef.where('enabled', '==', true).onSnapshot(
        snapShot => {
          const newParty: Party[] = snapShot.docs.map(doc => {
            console.log(doc.data())

            return buildParty(doc.id, doc.data())
          })
          setParties(newParty)
        },
        error => {
          console.info('catch useAppliedParties error', error)
        }
      )

      return () => {
        unsubscribe()
      }
    })
  }, [user])

  return parties
}
