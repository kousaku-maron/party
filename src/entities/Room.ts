import { Message, buildMessage } from './Message'

// TODO: Roomに"users: User[]"を保存させるようにする。
export type Room = {
  id: string
  enabled: boolean
  roomHash: string
  thumbnailURL?: string
  entryUIDs?: string[]
  newMessage?: Message
}

export const buildRoom = (id: string, data: firebase.firestore.DocumentData) => {
  const newRoom: Room = {
    id,
    enabled: data.enabled,
    roomHash: data.roomHash,
    ...(data.thumbnailURL && { thumbnailURL: data.thumbnailURL }),
    ...(data.entryUIDs && { entryUIDs: data.entryUIDs }),
    ...(data.newMessage && { newMessage: buildMessage(data.newMessage.id, data.newMessage) })
  }
  return newRoom
}

export type CreateRoom = Omit<Room, 'id'>
