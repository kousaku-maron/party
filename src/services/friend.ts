import { functions } from '../repositories/firebase'
import { useAuthState } from '../store/hooks'
import { User, UpdateUser } from '../entities/User'
import { setUser } from '../repositories/user'
import { deleteAppliedFriend, getAppliedFriendUID } from '../repositories/appliedFriend'
import { createAcceptedUser } from '../repositories/acceptedFriend'
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

import _ from 'lodash'

export const useApplyFriend = () => {
  const { uid } = useAuthState()
  const applyFriend = async (appliedFriend: User) => {
    const appliedFriendsUID = appliedFriend.uid
    try {
      if (appliedFriend.appliedFriendsUIDs && appliedFriend.appliedFriendsUIDs.includes(uid)) {
        showApplyFriendAlreadyappliedMessage()
        return
      }
      await functions.httpsCallable('applyFriend')({ appliedFriendsUID })
      showApplyFriendSunccessMessage()
    } catch (e) {
      showApplyFriendFailurMessage()
      console.warn(e)
    }
  }
  return { applyFriend }
}

export const useAcceptFriend = () => {
  const { uid, user } = useAuthState()
  const acceptFriend = async (acceptedFriend: User) => {
    const acceptedFriendsUID = acceptedFriend.uid
    try {
      if (acceptedFriend.acceptedFriendsUIDs && acceptedFriend.acceptedFriendsUIDs.includes(uid)) {
        showAcceptFriendAlreadyacceptedMessage()
        return
      }
      const newUser: UpdateUser = {
        uid: user.uid,
        name: user.name,
        thumbnailURL: user.thumbnailURL,
        appliedFriendsUIDs: _.without(user.appliedFriendsUIDs, acceptedFriendsUID),
        acceptedFriendsUIDs: _.uniq(
          user.acceptedFriendsUIDs ? [acceptedFriendsUID, ...user.acceptedFriendsUIDs] : [acceptedFriendsUID]
        )
      }
      const appliedUserUID = await getAppliedFriendUID(uid, acceptedFriendsUID)
      createAcceptedUser(uid, acceptedFriend)
      deleteAppliedFriend(uid, appliedUserUID)
      setUser(uid, newUser)
      showAcceptFriendSunccessMessage()
    } catch (e) {
      showAcceptFriendFailurMessage()
      console.warn(e)
    }
  }
  return { acceptFriend }
}

export const useRefuseFriend = () => {
  const { uid, user } = useAuthState()
  const refuseFriend = async (refusedFriend: User) => {
    const refusedFriendsUID = refusedFriend.uid
    try {
      const newUser: UpdateUser = {
        uid: user.uid,
        name: user.name,
        thumbnailURL: user.thumbnailURL,
        appliedFriendsUIDs: _.without(user.appliedFriendsUIDs, refusedFriendsUID)
      }
      const appliedUserUID = await getAppliedFriendUID(uid, refusedFriendsUID)
      setUser(uid, newUser)
      deleteAppliedFriend(uid, appliedUserUID)
      showRefuseFriendSunccessMessage()
    } catch (e) {
      showRefuseFriendFailurMessage()
      console.warn(e)
    }
  }
  return { refuseFriend }
}
