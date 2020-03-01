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
//MEMO: Partyのtypeに何入れるか決めていないからとりあえず？にしている
type Party = {
  id: string
  type?: string
  name: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
  entryUIDs?: string[] // 一時的にパラメーター設置。
}

export type ApplyCard = {
  id: string
  type: string
  groupID: string
  organizerUID: string
  users: User[]
  party: Party
}

export const buildApplyCard = (id: string, data: firebase.firestore.DocumentData) => {
  const newApplyCard: ApplyCard = {
    id,
    type: data.type,
    groupID: data.groupID,
    organizerUID: data.organizerUID,
    users: data.users,
    party: data.party
  }

  return newApplyCard
}
