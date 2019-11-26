import { db } from './firebase'
import { CreateMessage, UpdateMessage } from '../entities'
import { createDocument, updateDocument } from '../entities'

// MEMO: messagesの保存場所を一時的にparty直下にしている。
const roomsRef = db.collection('parties')
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

export const updateMessage = async (roomID: string, message: UpdateMessage) => {
  const messagesRef = getMessagesRef(roomID)

  try {
    await messagesRef.doc().set(updateDocument<UpdateMessage>(message), { merge: true })
    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
