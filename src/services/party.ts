import { useEffect, useState } from 'react'
import { InteractionManager } from 'react-native'
import { db } from '../repositories/firebase'
import { User, Party, buildParty } from '../entities'
import { useAuthState } from '../store/hooks'

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
