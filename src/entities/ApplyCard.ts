// same origin User type
type User = {
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

//same as Party type
type Party = {
  id: string
  type: string
  name: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
  entryUIDs?: string[] // 一時的にパラメーター設置。
}

export type ApplyCard = {
  id: string
  type: string
  partyID: string
  groupID: string
  organizerUID: string
  members: User[]
  party: Party
}

export const buildApplyCard = (id: string, data: firebase.firestore.DocumentData) => {
  const newApplyCard: ApplyCard = {
    id,
    type: data.type,
    partyID: data.partyID,
    groupID: data.groupID,
    organizerUID: data.organizerUID,
    members: data.members,
    party: data.party
  }

  return newApplyCard
}
