import { Message, buildMessage } from './Message'

// TODO: Roomに"users: User[]"を保存させるようにする。
export type Room = {
  id: string
  enabled: boolean
  thumbnailURL?: string
  entryUIDs?: string[]
  newMessage?: Message
  users?: {
    uid: string
    name: string
    thumbnailURL?: string
  }[]
}

export const buildRoom = (id: string, data: firebase.firestore.DocumentData) => {
  const newRoom: Room = {
    id,
    enabled: data.enabled,
    ...(data.thumbnailURL && { thumbnailURL: data.thumbnailURL }),
    ...(data.entryUIDs && { entryUIDs: data.entryUIDs }),
    ...(data.newMessage && { newMessage: buildMessage(data.newMessage.id, data.newMessage) }),
    ...(data.users && { users: data.users })
  }
  return newRoom
}

export type CreateRoom = Omit<Room, 'id'>
