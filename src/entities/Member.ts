export type Member = {
  memberUID: string
  memberID: string
  enabled: boolean
  isAccepted: boolean
  isAnonymous: boolean
  name: string
  gender: string
  thumbnailURL: string
}

export const buildMember = (id: string, data: firebase.firestore.DocumentData) => {
  const newMember = {
    memberUID: id, //memberIDと見間違える可能性があるため，シンプルにuidに変更するか要相談
    memberID: data.userID,
    enabled: data.enabled,
    isAccepted: data.isAccepted,
    isAnonymous: data.isAnonymous,
    name: data.name,
    gender: data.gender,
    thumbnailURL: data.thumbnailURL
  }
  return newMember
}

export type UpdateMember = Pick<Member, 'memberUID' | 'name' | 'thumbnailURL'> & { memberID?: string }
export type CreateMember = Pick<
  Member,
  'memberUID' | 'thumbnailURL' | 'enabled' | 'isAccepted' | 'isAnonymous' | 'name' | 'gender' | 'thumbnailURL'
> & { memberID?: string }
