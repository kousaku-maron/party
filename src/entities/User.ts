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
    id,
    enabled: data.enabled,
    isAccepted: data.isAccepted,
    isAnonymous: data.isAnonymous,
    uid: data.uid,
    userID: data.userID,
    name: data.name,
    ...(data.thumbnailURL && { thumbnailURL: data.thumbnailURL }),
    ...(data.gender && { gender: data.gender }),
    ...(data.blockUIDs && { blockUIDs: data.blockUIDs }),
    ...(data.appliedFriendUIDs && { appliedFriendUIDs: data.appliedFriendUIDs }),
    ...(data.friendUIDs && { friendUIDs: data.friendUIDs })
  }

  return newUser
}

export type UpdateUser = Pick<User, 'uid' | 'name' | 'thumbnailURL'> & {
  gender?: string[]
  userID?: string
  blockUIDs?: string[]
  appliedFriendUIDs?: string[]
  friendUIDs?: string[]
}
export type CreateUser = Omit<User, 'id'>
