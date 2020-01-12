import { useEffect, useState, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import firebase from '../repositories/firebase'
import { ApplyCard, buildApplyCard } from '../entities'
import { useAuthState } from '../store/hooks'
import { useTinderSwipeAnimation } from '../services/swipeAnimation'

const db = firebase.firestore()

const getApplyCardsRef = (uid: string) => {
  const applyCardsRef = db
    .collection('users')
    .doc(uid)
    .collection('appliedCards')

  return applyCardsRef
}

export const useAppliedCards = () => {
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

export const useReplyToAppliedCard = () => {
  const onApprove = useCallback(() => {
    // delete card
    // create room
    console.info('delete card, create room')
  }, [])

  const onReject = useCallback(() => {
    // delete card
    console.info('delete card')
  }, [])

  return { onApprove, onReject }
}

export const useSwipeApplyCard = () => {
  const { onApprove, onReject } = useReplyToAppliedCard()
  const { panHandlers, targetStyle } = useTinderSwipeAnimation({
    onSwipeLeft: onApprove,
    onSwipeRight: onReject
  })

  return { panHandlers, targetStyle }
}
