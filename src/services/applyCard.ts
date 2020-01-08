import { useEffect, useState } from 'react'
import { InteractionManager } from 'react-native'
import firebase from '../repositories/firebase'
import { ApplyCard, buildApplyCard } from '../entities'
import { useAuthState } from '../store/hooks'

const db = firebase.firestore()

const getApplyCardsRef = (uid: string) => {
  const applyCardsRef = db
    .collection('users')
    .doc(uid)
    .collection('appliedCards')

  return applyCardsRef
}

export const useApplyCards = () => {
  const [cards, setCards] = useState<ApplyCard[]>()
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!user) return
      const applyCardsRef = getApplyCardsRef(user.uid)
      const unsubscribe = applyCardsRef.onSnapshot(snapShot => {
        const newApplyCards: ApplyCard[] = snapShot.docs.map(doc => {
          return buildApplyCard(doc.data())
        })
        setCards(newApplyCards)
      })

      return () => {
        unsubscribe()
      }
    })
  }, [user])

  return cards
}
