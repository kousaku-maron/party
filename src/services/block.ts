import { functions } from '../repositories/firebase'
import { User } from '../entities/User'
import { useAppAuthState, useAppUserActions, useDomainUserActions } from '../store/hooks'
import { showCreateBlockUserSunccessMessage, showCreateBlockUserFailurMessage } from '../services/flashCard'

export const useBlockUser = () => {
  const { uid } = useAppAuthState()
  const { addFetchingBlockUser, removeFetchingBlockUser } = useAppUserActions()
  const { blockUser } = useDomainUserActions()

  const onBlockUser = async (user: User) => {
    const node = { fromUID: uid, toUID: user.uid }

    try {
      showCreateBlockUserSunccessMessage()
      addFetchingBlockUser(node)
      await functions.httpsCallable('blockUser')({ blockUID: user.uid })
      blockUser(node)
      removeFetchingBlockUser(node)
    } catch (e) {
      showCreateBlockUserFailurMessage()
      removeFetchingBlockUser(node)
      console.warn(e)
    }
  }
  return { onBlockUser }
}
