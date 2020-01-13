import { useEffect, useState, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import firebase from '../repositories/firebase'
import { ApplyCard, buildApplyCard, CreateRoom } from '../entities'
import { useAuthState } from '../store/hooks'
import { useTinderSwipeAnimation } from '../services/swipeAnimation'
import { deleteAppliedCard } from '../repositories/appliedCard'
import { createRoom } from '../repositories/room'
import * as Crypto from 'expo-crypto'
import _ from 'lodash'

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
          return buildApplyCard(doc.id, doc.data())
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
  const onApprove = useCallback(async (uid: string, card: ApplyCard) => {
    deleteAppliedCard(uid, card.id)

    const entryUIDs = _.uniq([uid, ...card.users.map(user => user.uid)])

    const baseStr = entryUIDs
      .slice()
      .sort()
      .join('')

    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, baseStr, {
      encoding: Crypto.CryptoEncoding.HEX
    })

    const room: CreateRoom = {
      enabled: true,
      roomHash: digest,
      entryUIDs
    }

    createRoom(room)
  }, [])

  const onReject = useCallback((uid: string, card: ApplyCard) => {
    deleteAppliedCard(uid, card.id)
  }, [])

  return { onApprove, onReject }
}

// MEMO: hooks利用時の引数に変化が生まれないようにするために、uidを引数にとるようにしている。
//       スワイプ設計を見直す。
export const useSwipeApplyCard = (uid: string, card: ApplyCard) => {
  const { onApprove, onReject } = useReplyToAppliedCard()
  const { panHandlers, targetStyle } = useTinderSwipeAnimation({
    onSwipeLeft: () => onReject(uid, card),
    onSwipeRight: () => onApprove(uid, card)
  })

  return { panHandlers, targetStyle }
}
