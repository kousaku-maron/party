import { functions } from '../repositories/firebase'
import { User } from '../entities/User'
import { useAppAuthState } from '../store/hooks'
import {
  showCreateBlockUserSunccessMessage,
  showCreateBlockUserFailurMessage,
  showCreateBlockUserAlreadyBlockedMessage
} from '../services/flashCard'

export const useBlockUser = () => {
  const { uid } = useAppAuthState()

  const blockUser = async (blockUser: User) => {
    const blockUID = blockUser.uid

    try {
      if (blockUser.blockUIDs && blockUser.blockUIDs.includes(uid)) {
        showCreateBlockUserAlreadyBlockedMessage()
        return
      }

      await functions.httpsCallable('blockUser')({ blockUID })
      showCreateBlockUserSunccessMessage()
    } catch (e) {
      console.warn(e)
      showCreateBlockUserFailurMessage()
    }
  }
  return { blockUser }
}
