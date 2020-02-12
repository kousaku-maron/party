export type User = {
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name: string
  thumbnailURL?: string
  gender?: string
  blockUIDs?: string[]
  appliedFriendsUIDs?: string[]
  acceptedFriendsUIDs?: string[]
}

export const buildUser = (data: firebase.firestore.DocumentData) => {
  const newUser = {
    enabled: data.enabled,
    isAccepted: data.isAccepted,
    isAnonymous: data.isAnonymous,
    uid: data.uid,
    userID: data.userID,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    gender: data.gender,
    blockUIDs: data.blockUIDs,
    appliedFriendsUIDs: data.appliedFriendsUIDs,
    acceptedFriendsUIDs: data.acceptedFriendsUIDs
  }

  return newUser
}

export type UpdateUser = Pick<User, 'uid' | 'name' | 'thumbnailURL'> & {
  userID?: string
  blockUIDs?: string[]
  appliedFriendsUIDs?: string[]
  acceptedFriendsUIDs?: string[]
}
