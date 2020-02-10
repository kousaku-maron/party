import { User, UpdateUser } from '../entities/User'
import { createBlockUser } from '../repositories/blockUser'
import { setUser, getUser } from '../repositories/user'
import {
  showCreateBlockUserSunccessMessage,
  showCreateBlockUserFailurMessage,
  showCreateBlockUserAlreadyBlockedMessage
} from '../services/flashCard'
import _ from 'lodash'

export const blockUser = async (user: User, blockUID: string) => {
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
      blockUIDs: _.uniq([...(user.blockUIDs ?? []), blockUID])
    }
    setUser(user.uid, updateUser)

    const blockUser = await getUser(blockUID)
    const newBlockUser: User = {
      enabled: blockUser.enabled,
      isAccepted: blockUser.isAccepted,
      isAnonymous: blockUser.isAnonymous,
      uid: blockUser.uid,
      userID: blockUser.userID,
      name: blockUser.name,
      ...(user.thumbnailURL && { thumbnailURL: user.thumbnailURL }),
      gender: blockUser.gender,
      ...(user.blockUIDs && { blockUIDs: user.blockUIDs })
    }
    createBlockUser(user.uid, newBlockUser)

    showCreateBlockUserSunccessMessage()
  } catch (e) {
    console.warn(e)
    showCreateBlockUserFailurMessage()
  }
}
