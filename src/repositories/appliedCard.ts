import { db } from './firebase'
import { buildApplyCard } from '../entities'

const getAppliedCardRef = (uid: string, appliedCardID: string) => {
  return db
    .collection('users')
    .doc(uid)
    .collection('appliedCards')
    .doc(appliedCardID)
}

const getAppliedCardsRef = (uid: string, type: string) => {
  return db
    .collection('users')
    .doc(uid)
    .collection('appliedCards')
    .where('type', '==', type)
}

export const getAppliedCard = async (uid: string, appliedCardID: string) => {
  try {
    const cardRef = getAppliedCardRef(uid, appliedCardID)
    const snapShot = await cardRef.get()
    const card = buildApplyCard(cardRef.id, snapShot.data())
    return card
  } catch (e) {
    console.warn(e)
    return null
  }
}

export const getAppliedCardsByType = async (uid: string, type: string) => {
  try {
    const cardsRef = getAppliedCardsRef(uid, type)
    const snapshots = await cardsRef.get()
    const cards = snapshots.docs.map(doc => buildApplyCard(doc.id, doc.data()))
    return cards
  } catch (e) {
    console.warn(e)
    return null
  }
}

export const deleteAppliedCard = async (uid: string, appliedCardID: string) => {
  try {
    const cardRef = getAppliedCardRef(uid, appliedCardID)

    const batch = db.batch()
    batch.delete(cardRef)
    await batch.commit()

    return { result: true, id: cardRef.id }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
