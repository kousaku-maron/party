import { useEffect, useState, useMemo } from 'react'
import { InteractionManager } from 'react-native'
import { useAppAuthState, useAppUserActions, useDomainUserState, useDomainUserActions } from '../store/hooks'
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

export const useFriends = (uid: string) => {
  const domainUser = useDomainUserState()
  const { setUsers: setDomainUsers } = useDomainUserActions()
  const [fetching, setFetching] = useState<boolean>(true)
  const [friends, setFriends] = useState<User[]>([])

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!uid) return

      const unsubscribe = usersRef
        .doc(uid)
        .collection('friends')
        .onSnapshot(
          snapShot => {
            const newFriends: User[] = snapShot.docs.map(doc => {
              return buildUser(doc.id, doc.data())
            })
            setDomainUsers(newFriends)
            setFriends(newFriends)
            setFetching(false)
          },
          error => {
            console.info('catch useFriends error', error)
          }
        )

      return () => {
        unsubscribe()
      }
    })
  }, [setDomainUsers, uid])

  const friendsFromDomain = useMemo(() => {
    return friends.map(friend => {
      if (domainUser[friend.id]) {
        return domainUser[friend.id]
      }

      return friend
    })
  }, [domainUser, friends])

  return { fetching, friends: friendsFromDomain }
}

export const useApplyFriend = () => {
  const { uid } = useAppAuthState()
  const { addFetchingApplyFriendship, removeFetchingApplyFriendship } = useAppUserActions()
  const { applyFriendship } = useDomainUserActions()

  const onApplyFriend = async (user: User) => {
    const node = { fromUID: uid, toUID: user.uid }

    try {
      showApplyFriendRequestMessage()
      addFetchingApplyFriendship(node)
      await functions.httpsCallable('applyFriend')({ applyFriendUID: user.uid }) // TODO: nodeを引数にそして保存するようにする
      applyFriendship(node)
      removeFetchingApplyFriendship(node)
    } catch (e) {
      showApplyFriendFailureMessage()
      removeFetchingApplyFriendship(node)
      console.warn(e)
    }
  }
  return { onApplyFriend }
}

export const useAcceptFriend = () => {
  const { uid } = useAppAuthState()
  const { addFetchingAcceptFriendship, removeFetchingAcceptFriendship } = useAppUserActions()
  const { acceptFriendship } = useDomainUserActions()

  const onAcceptFriend = async (user: User) => {
    const node = { fromUID: uid, toUID: user.uid }

    try {
      showAcceptFriendRequestMessage()
      addFetchingAcceptFriendship(node)
      await functions.httpsCallable('acceptFriend')({ acceptFriendUID: user.uid }) // TODO: nodeを引数にそして保存するようにする
      acceptFriendship(node)
      removeFetchingAcceptFriendship(node)
    } catch (e) {
      showAcceptFriendFailureMessage()
      removeFetchingAcceptFriendship(node)
      console.warn(e)
    }
  }
  return { onAcceptFriend }
}

export const useRefuseFriend = () => {
  const { uid } = useAppAuthState()
  const { addFetchingRefuseFriendship, removeFetchingRefuseFriendship } = useAppUserActions()
  const { refuseFriendship } = useDomainUserActions()

  const onRefuseFriend = async (user: User) => {
    const node = { fromUID: uid, toUID: user.uid }

    try {
      showRefuseFriendRequestMessage()
      addFetchingRefuseFriendship(node)
      await functions.httpsCallable('refuseFriend')({ refuseFriendUID: user.uid }) // TODO: nodeを引数にそして保存するようにする
      refuseFriendship(node)
      removeFetchingRefuseFriendship(node)
    } catch (e) {
      showRefuseFriendFailureMessage()
      removeFetchingRefuseFriendship(node)
      console.warn(e)
    }
  }
  return { onRefuseFriend }
}
