import { functions } from '../repositories/firebase'
import { User } from '../entities/User'
import { useAppAuthState, useAppUserActions, useDomainUserActions } from '../store/hooks'
import { showBlockUserSunccessMessage, showBlockUserFailurMessage } from '../services/flashCard'

export const useBlockUser = () => {
  const { uid } = useAppAuthState()
  const { addFetchingBlockUserRelationship, removeFetchingBlockUserRelationship } = useAppUserActions()
  const { blockUser } = useDomainUserActions()

  const onBlockUser = async (user: User) => {
    const node = { fromUID: uid, toUID: user.uid }

    try {
      showBlockUserSunccessMessage()
      addFetchingBlockUserRelationship(node)
      await functions.httpsCallable('blockUser')({ blockUID: user.uid })
      blockUser(node)
      removeFetchingBlockUserRelationship(node)
    } catch (e) {
      showBlockUserFailurMessage()
      removeFetchingBlockUserRelationship(node)
      console.warn(e)
    }
  }
  return { onBlockUser }
}
