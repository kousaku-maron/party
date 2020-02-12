import { functions } from '../repositories/firebase'
import { useAuthState } from '../store/hooks'
import { User } from '../entities/User'
import {
  showApplyFriendSunccessMessage,
  showApplyFriendFailurMessage,
  showApplyFriendAlreadyappliedMessage
} from '../services/flashCard'

export const useApplyFriend = (appliedFriendUID: string, appliedFriend: User) => {
  const { uid } = useAuthState()
  const applyFriend = async () => {
    try {
      if (appliedFriend.appliedFriendsUIDs.includes(uid)) {
        showApplyFriendAlreadyappliedMessage()
        return
      }

      await functions.httpsCallable('applyFriend')({ appliedFriendUID, appliedFriend })
      showApplyFriendSunccessMessage()
    } catch (e) {
      showApplyFriendFailurMessage()
      console.warn(e)
    }
  }
  return { applyFriend }
}
