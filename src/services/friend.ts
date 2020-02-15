import { functions } from '../repositories/firebase'
import { useAuthState } from '../store/hooks'
import { User, UpdateUser } from '../entities/User'
import { setUser } from '../repositories/user'
import { deleteAppliedFriendUser, getAppliedFriendUserUID } from '../repositories/appliedFriend'
import { createfriend } from '../repositories/friend'
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
  const applyFriend = async (appliedFriendUser: User) => {
    const appliedFriendUID = appliedFriendUser.uid
    try {
      if (appliedFriendUser.appliedFriendUIDs && appliedFriendUser.appliedFriendUIDs.includes(uid)) {
        showApplyFriendAlreadyappliedMessage()
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
  const { uid, user } = useAuthState()
  const acceptFriend = async (friend: User) => {
    const friendUID = friend.uid
    try {
      if (friend.friendUIDs && friend.friendUIDs.includes(uid)) {
        showAcceptFriendAlreadyacceptedMessage()
        return
      }
      const newUser: UpdateUser = {
        uid: user.uid,
        name: user.name,
        thumbnailURL: user.thumbnailURL,
        appliedFriendUIDs: _.without(user.appliedFriendUIDs, friendUID),
        friendUIDs: _.uniq(user.friendUIDs ? [friendUID, ...user.friendUIDs] : [friendUID])
      }
      const appliedFriendUserUID = await getAppliedFriendUserUID(uid, friendUID)
      createfriend(uid, friend)
      deleteAppliedFriendUser(uid, appliedFriendUserUID)
      setUser(uid, newUser)
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
  const { uid, user } = useAuthState()
  const refuseFriend = async (refusedFriend: User) => {
    const refusedFriendsUID = refusedFriend.uid
    try {
      const newUser: UpdateUser = {
        uid: user.uid,
        name: user.name,
        thumbnailURL: user.thumbnailURL,
        appliedFriendUIDs: _.without(user.appliedFriendUIDs, refusedFriendsUID)
      }
      const appliedFriendUserUID = await getAppliedFriendUserUID(uid, refusedFriendsUID)
      setUser(uid, newUser)
      deleteAppliedFriendUser(uid, appliedFriendUserUID)
      showRefuseFriendSunccessMessage()
    } catch (e) {
      showRefuseFriendFailurMessage()
      console.warn(e)
    }
  }
  return { refuseFriend }
}
