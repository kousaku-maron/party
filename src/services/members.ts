import { useEffect, useState } from 'react'
import { InteractionManager } from 'react-native'
import firebase from '../repositories/firebase'
import { useAppAuthState } from '../store/hooks'
import { User, buildUser } from '../entities/User'

const db = firebase.firestore()
const partiesRef = db.collection('parties')

export const useMembers = (partyID: string, groupID: string) => {
  const [members, setMembers] = useState<User[]>()
  const auth = useAppAuthState()
  const { user } = auth

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const membersRef = partiesRef
        .doc(partyID)
        .collection('groups')
        .doc(groupID)
        .collection('members')
      if (!user) return
      const unsubscribe = membersRef.onSnapshot(
        snapShot => {
          const newMembers: User[] = snapShot.docs.map(doc => {
            return buildUser(doc.id, doc.data())
          })

          setMembers(newMembers)
        },
        error => {
          console.info('catch useMembers error', error)
        }
      )

      return () => {
        unsubscribe()
      }
    })
  }, [partyID, groupID, user])

  return members
}
