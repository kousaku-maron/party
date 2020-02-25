import { functions } from '../repositories/firebase'
import { User } from '../entities/User'
import { useAuthState } from '../store/hooks'
import {
  showCreateBlockUserSunccessMessage,
  showCreateBlockUserFailurMessage,
  showCreateBlockUserAlreadyBlockedMessage
} from '../services/flashCard'

export const useBlockUser = () => {
  const { uid } = useAuthState()

  const blockUser = async (blockedUser: User) => {
    const blockedUID = blockedUser.uid

    try {
      if (blockedUser.blockUIDs && blockedUser.blockUIDs.includes(uid)) {
        showCreateBlockUserAlreadyBlockedMessage()
        return
      }

      await functions.httpsCallable('blockUser')({ blockedUID })
      showCreateBlockUserSunccessMessage()
    } catch (e) {
      console.warn(e)
      showCreateBlockUserFailurMessage()
    }
  }
  return { blockUser }
}
