import { db } from './firebase'
import { CreateMessage, UpdateMessage } from '../entities'
import { createDocument, updateDocument } from '../entities'

const roomsRef = db.collection('rooms')
const getMessagesRef = (roomID: string) => {
  return roomsRef.doc(roomID).collection('messages')
}

export const setMessage = async (roomID: string, message: CreateMessage) => {
  const messagesRef = getMessagesRef(roomID)

  try {
    await messagesRef.doc().set(createDocument<CreateMessage>(message))
    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}

export const updateMessage = async (roomID: string, messageID: string, message: UpdateMessage) => {
  const messagesRef = getMessagesRef(roomID)

  try {
    await messagesRef.doc(messageID).set(updateDocument<UpdateMessage>(message), { merge: true })
    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
