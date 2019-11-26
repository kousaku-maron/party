import { db } from './firebase'
import { CreateMessage } from '../entities'
import { createDocument } from '../entities'

const partiesRef = db.collection('parties')
const getMessagesRef = (partyID: string) => {
  return partiesRef.doc(partyID).collection('messages')
}

export const createMessage = async (partyID: string, message: CreateMessage) => {
  const messagesRef = getMessagesRef(partyID)

  try {
    await messagesRef.doc().set(createDocument<CreateMessage>(message))
    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
