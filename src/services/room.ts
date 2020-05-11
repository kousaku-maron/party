import { useEffect, useState, useCallback } from 'react'
import firebase from '../repositories/firebase'
import { buildRoom, Room, User } from '../entities'
import { useAppAuthState } from '../store/hooks'
import { createRoom } from '../repositories/room'
import { showCreateRoomFailureMessage } from './flashCard'
import { uniq, uniqBy, pullAllBy } from 'lodash'

const db = firebase.firestore()
const roomsRef = db.collection('rooms')

export const useRooms = () => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [rooms, setRooms] = useState<Room[]>([])
  const auth = useAppAuthState()
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
          setFetching(false)
        },
        error => {
          console.info('catch useRooms error', error)
        }
      )

    return () => {
      unsubscribe()
    }
  }, [user])

  return { fetching, rooms }
}

export const useCreateRoomTools = () => {
  const [users, setUsers] = useState<User[]>([])
  const { user } = useAppAuthState()

  const onAppendUser = useCallback((user: User) => {
    setUsers(prev => uniqBy([...prev, user], 'uid'))
  }, [])

  const onRemoveUser = useCallback((user: User) => {
    setUsers(prev => [...pullAllBy(prev, [user], 'uid')])
  }, [])

  const onSwitchUser = useCallback(
    (user: User) => {
      if (users.find(_user => _user.uid === user.uid)) {
        console.info('remove')
        onRemoveUser(user)
        return
      }

      console.info('append')
      onAppendUser(user)
    },
    [onAppendUser, onRemoveUser, users]
  )

  const onCreateRoom = useCallback(async () => {
    try {
      await createRoom({
        enabled: true,
        roomHash: 'tempRoomHash',
        entryUIDs: uniq([...users.map(user => user.uid), user.uid]),
        users: uniqBy([...users, user], 'uid')
      })
    } catch (e) {
      showCreateRoomFailureMessage()
      console.warn(e)
    }
  }, [user, users])

  return { selectedUsers: users, onSwitchUser, onCreateRoom }
}
