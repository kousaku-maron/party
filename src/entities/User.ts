export type User = {
  id: string
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name: string
  thumbnailURL?: string
  gender?: string
  blockUIDs?: string[]
  appliedFriendUIDs?: string[]
  friendUIDs?: string[]
}

export const buildUser = (id: string, data: firebase.firestore.DocumentData) => {
  const newUser = {
    id: data.id,
    enabled: data.enabled,
    isAccepted: data.isAccepted,
    isAnonymous: data.isAnonymous,
    uid: data.uid,
    userID: data.userID,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    gender: data.gender,
    blockUIDs: data.blockUIDs,
    appliedFriendUIDs: data.appliedFriendUIDs,
    friendUIDs: data.friendUIDs
  }

  return newUser
}

export type UpdateUser = Pick<User, 'uid' | 'name' | 'thumbnailURL'> & {
  userID?: string
  blockUIDs?: string[]
  appliedFriendUIDs?: string[]
  friendUIDs?: string[]
}
