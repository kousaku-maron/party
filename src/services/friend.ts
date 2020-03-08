import { useEffect, useState } from 'react'
import { InteractionManager } from 'react-native'
import firebase, { functions } from '../repositories/firebase'
import { useAuthState } from '../store/hooks'
import { User, buildUser } from '../entities/User'
import {
  showApplyFriendSunccessMessage,
  showApplyFriendFailurMessage,
  showApplyFriendAlreadyappliedMessage,
  showAcceptFriendSunccessMessage,
  showAcceptFriendFailurMessage,
  showAcceptFriendAlreadyacceptedMessage,
  showRefuseFriendSunccessMessage,
  showRefuseFriendFailurMessage
} from './flashCard'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const useFriends = (user: User) => {
  const [friends, setFriends] = useState<User[]>()
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!user) return
      const unsubscribe = usersRef
        .doc(user.uid)
        .collection('friends')
        .onSnapshot(snapShot => {
          const newFriend: User[] = snapShot.docs.map(doc => {
            return buildUser(doc.id, doc.data())
          })
          setFriends(newFriend)
        })

      return () => {
        unsubscribe()
      }
    })
  }, [user])

  return friends
}

export const useApplyFriend = () => {
  const { uid } = useAuthState()
  const applyFriend = async (appliedFriendUser: User) => {
    const appliedFriendUID = appliedFriendUser.uid
    try {
      if (appliedFriendUser.appliedFriendUIDs && appliedFriendUser.appliedFriendUIDs.includes(uid)) {
        showApplyFriendAlreadyappliedMessage()
        return
      }

      if (appliedFriendUser.friendUIDs && appliedFriendUser.friendUIDs.includes(uid)) {
        showAcceptFriendAlreadyacceptedMessage()
        return
      }

      await functions.httpsCallable('applyFriend')({ appliedFriendUID })
      showApplyFriendSunccessMessage()
    } catch (e) {
      showApplyFriendFailurMessage()
      console.warn(e)
    }
  }
  return { applyFriend }
}

export const useAcceptFriend = () => {
  const { uid } = useAuthState()
  const acceptFriend = async (friend: User) => {
    const friendUID = friend.uid
    try {
      if (friend.friendUIDs && friend.friendUIDs.includes(uid)) {
        showAcceptFriendAlreadyacceptedMessage()
        return
      }
      await functions.httpsCallable('acceptFriend')({ friendUID })
      showAcceptFriendSunccessMessage()
    } catch (e) {
      showAcceptFriendFailurMessage()
      console.warn(e)
    }
  }
  return { acceptFriend }
}

export const useRefuseFriend = () => {
  const { uid } = useAuthState()
  const refuseFriend = async (refusedFriend: User) => {
    const refusedFriendUID = refusedFriend.uid
    try {
      if (refusedFriend.applyFriendUIDs && refusedFriend.applyFriendUIDs.includes(uid)) {
        await functions.httpsCallable('refuseFriend')({ refusedFriendUID })
        showRefuseFriendSunccessMessage()
      }
    } catch (e) {
      showRefuseFriendFailurMessage()
      console.warn(e)
    }
  }
  return { refuseFriend }
}
