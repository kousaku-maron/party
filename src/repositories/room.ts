import { db } from './firebase'
import { CreateRoom, createDocument } from '../entities'

const roomsRef = db.collection('rooms')

export const createRoom = async (room: CreateRoom) => {
  const batch = db.batch()

  const roomID = roomsRef.doc()

  batch.set(
    roomID,
    createDocument<CreateRoom>({
      enabled: room.enabled,
      roomHash: room.roomHash,
      thumbnailURL: room.thumbnailURL,
      entryUIDs: room.entryUIDs
    }),
    { merge: false }
  )

  await batch.commit()

  return { result: true, id: roomID.id }
}
