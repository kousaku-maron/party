import { useEffect, useState } from 'react'
import firebase from '../repositories/firebase'
import { buildRoom, Room, User } from '../entities'
import { useAuthState } from '../store/hooks'
import { getUser } from '../repositories/user'

const db = firebase.firestore()
const roomsRef = db.collection('rooms')

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>()
  const auth = useAuthState()
  const { user } = auth

  useEffect(() => {
    if (!user) return
    const unsubscribe = roomsRef
      .where('enabled', '==', true)
      .where('entryUIDs', 'array-contains', user.uid)
      .onSnapshot(
        snapShot => {
          const newRoom: Room[] = snapShot.docs.map(doc => {
            return buildRoom(doc.id, doc.data())
          })
          setRooms(newRoom)
        },
        error => {
          console.info('catch useRooms error', error)
        }
      )

    return () => {
      unsubscribe()
    }
  }, [user])

  return rooms
}

export const useRoomsWithUser = () => {
  const [roomsWithUser, setRoomWithUser] = useState<(Room & { users: User[] })[]>([])
  const rooms = useRooms()

  useEffect(() => {
    if (!rooms) return

    const asyncTask = async () => {
      const task = rooms.map(async room => {
        if (!room.entryUIDs) {
          return { ...room, users: [] }
        }

        const childTask = room.entryUIDs.map(async uid => {
          const user = await getUser(uid)
          return user
        })

        const users = await Promise.all(childTask)

        return { ...room, users }
      })

      const newRoomsWithUser = await Promise.all(task)

      setRoomWithUser(newRoomsWithUser)
    }

    asyncTask()
  }, [rooms])

  return roomsWithUser
}
