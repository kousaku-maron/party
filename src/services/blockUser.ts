import { useState, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import { User, UpdateUser, buildUser } from '../entities/User'
import { useAuthState } from '../store/hooks'
import { createBlockUser } from '../repositories/blockUser'
import { setUser } from '../repositories/user'
import {
  showCreateBlockUserSunccessMessage,
  showCreateBlockUserFailurMessage,
  showCreateBlockUserAlreadyBlockedMessage
} from '../services/flashCard'
import _ from 'lodash'
import firebase from '../repositories/firebase'
const db = firebase.firestore()

export const useBlockUser = () => {
  const { user } = useAuthState()

  const blockUser = async (blockedUser: User) => {
    const blockUID = blockedUser.uid
    try {
      if (user.blockUIDs.includes(blockUID)) {
        showCreateBlockUserAlreadyBlockedMessage()
        return
      }

      const updateUser: UpdateUser = {
        uid: user.uid,
        name: user.name,
        ...(user.thumbnailURL && { thumbnailURL: user.thumbnailURL }),
        userID: user.userID,
        blockUIDs: _.uniq(user.blockUIDs ? [...user.blockUIDs, blockUID] : [blockUID])
      }
      setUser(user.uid, updateUser)

      createBlockUser(user.uid, blockedUser)

      showCreateBlockUserSunccessMessage()
    } catch (e) {
      console.warn(e)
      showCreateBlockUserFailurMessage()
    }
  }
  return { blockUser }
}

export const useBlockUsers = () => {
  const [blockUsers, setblockUsers] = useState<User[]>()
  const auth = useAuthState()
  const { uid } = auth

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!uid) return
      const blockUsersRef = db
        .collection('users')
        .doc(uid)
        .collection('blockUsers')
      const unsubscribe = blockUsersRef.onSnapshot(snapShot => {
        const newBlockUsers: User[] = snapShot.docs.map(doc => {
          return buildUser(doc.id, doc.data())
        })
        setblockUsers(newBlockUsers)
      })

      return () => {
        unsubscribe()
      }
    })
  }, [uid])

  return blockUsers
}
