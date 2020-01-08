import { useEffect, useState } from 'react'
import { InteractionManager } from 'react-native'
import { Group, buildGroup } from '../entities'
import { useAuthState } from '../store/hooks'
import firebase from '../repositories/firebase'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

export const useGroups = (partyID: string) => {
  const [groups, setGroups] = useState<Group[]>()
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const groupsRef = partiesRef.doc(partyID).collection('groups')
      if (!user) return
      const unsubscribe = groupsRef.where('enabled', '==', true).onSnapshot(snapShot => {
        const newGroups: Group[] = snapShot.docs.map(doc => {
          return buildGroup(doc.id, doc.data())
        })

        setGroups(newGroups)
      })

      return () => {
        unsubscribe()
      }
    })
  }, [partyID, user])

  return groups
}
