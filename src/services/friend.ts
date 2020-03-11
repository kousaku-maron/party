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
      if (!user || !user.friendUIDs) return

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
  const applyFriend = async (applyFriendUser: User) => {
    const applyFriendUID = applyFriendUser.uid

    try {
      if (applyFriendUser.appliedFriendUIDs && applyFriendUser.appliedFriendUIDs.includes(uid)) {
        showApplyFriendAlreadyappliedMessage()
        return
      }

      if (applyFriendUser.friendUIDs && applyFriendUser.friendUIDs.includes(uid)) {
        showAcceptFriendAlreadyacceptedMessage()
        return
      }

      await functions.httpsCallable('applyFriend')({ applyFriendUID })
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
  const acceptFriend = async (acceptFriendUser: User) => {
    const acceptFriendUID = acceptFriendUser.uid

    try {
      if (acceptFriendUser.friendUIDs && acceptFriendUser.friendUIDs.includes(uid)) {
        showAcceptFriendAlreadyacceptedMessage()
        return
      }
      await functions.httpsCallable('acceptFriend')({ acceptFriendUID })
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
  const refuseFriend = async (refuseFriend: User) => {
    const refuseFriendUID = refuseFriend.uid
    try {
      if (refuseFriend.applyFriendUIDs && refuseFriend.applyFriendUIDs.includes(uid)) {
        await functions.httpsCallable('refuseFriend')({ refuseFriendUID })
        showRefuseFriendSunccessMessage()
      }
    } catch (e) {
      showRefuseFriendFailurMessage()
      console.warn(e)
    }
  }
  return { refuseFriend }
}
