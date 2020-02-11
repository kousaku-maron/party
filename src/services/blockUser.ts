import { User, UpdateUser } from '../entities/User'
import { useAuthState } from '../store/hooks'
import { createBlockUser } from '../repositories/blockUser'
import { setUser } from '../repositories/user'
import {
  showCreateBlockUserSunccessMessage,
  showCreateBlockUserFailurMessage,
  showCreateBlockUserAlreadyBlockedMessage
} from '../services/flashCard'
import _ from 'lodash'

export const useBlockUser = () => {
  const { user } = useAuthState()

  const blockUser = async (blockedUser: User) => {
    const blockUID = blockedUser.uid
    try {
      if (user.blockUIDs.includes(blockUID)) {
        showCreateBlockUserAlreadyBlockedMessage()
        return
      }

      const updateUser: UpdateUser = {
        uid: user.uid,
        name: user.name,
        ...(user.thumbnailURL && { thumbnailURL: user.thumbnailURL }),
        userID: user.userID,
        blockUIDs: _.uniq(user.blockUIDs ? [...user.blockUIDs, blockUID] : [blockUID])
      }
      setUser(user.uid, updateUser)

      createBlockUser(user.uid, blockedUser)

      showCreateBlockUserSunccessMessage()
    } catch (e) {
      console.warn(e)
      showCreateBlockUserFailurMessage()
    }
  }
  return { blockUser }
}
