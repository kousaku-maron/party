import { useEffect, useState } from 'react'
import { InteractionManager } from 'react-native'
// import { useAppAuthState } from '../store/hooks'
import { db, functions } from '../repositories/firebase'
import { User, buildUser } from '../entities/User'
import {
  showApplyFriendRequestMessage,
  showApplyFriendFailureMessage,
  showAcceptFriendRequestMessage,
  showAcceptFriendFailureMessage,
  showRefuseFriendRequestMessage,
  showRefuseFriendFailureMessage
} from './flashCard'

const usersRef = db.collection('users')

export const useFriends = (user: User) => {
  const [friends, setFriends] = useState<User[]>()
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!user || !user.friendUIDs) return

      const unsubscribe = usersRef
        .doc(user.uid)
        .collection('friends')
        .onSnapshot(
          snapShot => {
            const newFriend: User[] = snapShot.docs.map(doc => {
              return buildUser(doc.id, doc.data())
            })
            setFriends(newFriend)
          },
          error => {
            console.info('catch useFriends error', error)
          }
        )

      return () => {
        unsubscribe()
      }
    })
  }, [user])

  return friends
}

export const useApplyFriend = () => {
  // const { uid } = useAppAuthState()

  const onApplyFriend = async (user: User) => {
    try {
      showApplyFriendRequestMessage()
      await functions.httpsCallable('applyFriend')({ applyFriendUID: user.uid })
    } catch (e) {
      showApplyFriendFailureMessage()
      console.warn(e)
    }
  }
  return { onApplyFriend }
}

export const useAcceptFriend = () => {
  // const { uid } = useAppAuthState()

  const onAcceptFriend = async (user: User) => {
    try {
      showAcceptFriendRequestMessage()
      await functions.httpsCallable('acceptFriend')({ acceptFriendUID: user.uid })
    } catch (e) {
      showAcceptFriendFailureMessage()
      console.warn(e)
    }
  }
  return { onAcceptFriend }
}

export const useRefuseFriend = () => {
  // const { uid } = useAppAuthState()

  const onRefuseFriend = async (user: User) => {
    try {
      showRefuseFriendRequestMessage()
      await functions.httpsCallable('refuseFriend')({ refuseFriendUID: user.uid })
    } catch (e) {
      showRefuseFriendFailureMessage()
      console.warn(e)
    }
  }
  return { onRefuseFriend }
}
