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
  blockedUIDs?: string[]
  applyFriendUIDs?: string[]
  appliedFriendUIDs?: string[]
  friendUIDs?: string[]
  reportUIDs?: string[]
  reportedUIDs?: string[]
}

// same origin Party type
type Party = {
  id: string
  name: string
  type: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
  entryUIDs?: string[]
}

export type ApplyCard = {
  id: string
  type: string // ex. "demo" "today" ...
  partyID: string
  groupID: string
  organizerUID: string
  party: Party
  users: User[]
}

export const buildApplyCard = (id: string, data: firebase.firestore.DocumentData) => {
  const newApplyCard: ApplyCard = {
    id,
    type: data.type,
    partyID: data.partyID,
    groupID: data.groupID,
    organizerUID: data.organizerUID,
    party: data.party,
    users: data.users
  }

  return newApplyCard
}
