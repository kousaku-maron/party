export type User = {
  id: string
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  uid: string
  userID: string
  name: string
  thumbnailURL?: string
  introduction?: string
  gender?: string
  blockUIDs?: string[]
  blockedUIDs?: string[]
  applyFriendUIDs?: string[]
  appliedFriendUIDs?: string[]
  friendUIDs?: string[]
  reportUIDs?: string[]
  reportedUIDs?: string[]
  likeGroupAssetIDs?: string[]
  likedGroupAssetIDs?: string[]
  matchGroupAssetIDs?: string[]
  myGroupAssetIDs?: string[]
  appliedPartyUIDs?: string[]
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
    ...(data.introduction && { introduction: data.introduction }),
    ...(data.gender && { gender: data.gender }),
    ...(data.blockUIDs && { blockUIDs: data.blockUIDs }),
    ...(data.blockedUIDs && { blockedUIDs: data.blockedUIDs }),
    ...(data.applyFriendUIDs && { applyFriendUIDs: data.applyFriendUIDs }),
    ...(data.appliedFriendUIDs && { appliedFriendUIDs: data.appliedFriendUIDs }),
    ...(data.friendUIDs && { friendUIDs: data.friendUIDs }),
    ...(data.reportUIDs && { reportUIDs: data.reportUIDs }),
    ...(data.reportedUIDs && { reportedUIDs: data.reportedUIDs }),
    ...(data.likeGroupAssetIDs && { likeGroupAssetIDs: data.likeGroupAssetIDs }),
    ...(data.likedGroupAssetIDs && { likedGroupAssetIDs: data.likedGroupAssetIDs }),
    ...(data.matchGroupAssetIDs && { matchGroupAssetIDs: data.matchGroupAssetIDs }),
    ...(data.myGroupAssetAssetIDs && { myGroupAssetAssetIDs: data.myGroupAssetAssetIDs }),
    ...(data.appliedPartyUIDs && { appliedPartyUIDs: data.appliedPartyUIDs })
  }

  return newUser
}

export type UpdateUser = Pick<User, 'uid' | 'name' | 'thumbnailURL' | 'introduction'> & {
  gender?: string[]
  userID?: string
  blockUIDs?: string[]
  blockedUIDs?: string[]
  applyFriendUIDs?: string[]
  appliedFriendUIDs?: string[]
  friendUIDs?: string[]
  reportUIDs?: string[]
  reportedUIDs?: string[]
  likeGroupAssetIDs?: string[]
  likedGroupAssetIDs?: string[]
  matchGroupAssetIDs?: string[]
  myGroupAssetIDs?: string[]
  appliedPartyUIDs?: string[]
}
export type CreateUser = Omit<User, 'id'>
