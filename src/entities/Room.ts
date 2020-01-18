export type Room = {
  id: string
  enabled: boolean
  roomHash: string
  thumbnailURL?: string
  entryUIDs?: string[]
}

export const buildRoom = (id: string, data: firebase.firestore.DocumentData) => {
  const newRoom: Room = {
    id,
    enabled: data.enabled,
    roomHash: data.roomHash,
    thumbnailURL: data.thumbnailURL,
    entryUIDs: data.entryUIDs
  }
  return newRoom
}

export type CreateRoom = Omit<Room, 'id'>
