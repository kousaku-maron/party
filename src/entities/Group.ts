export type Group = {
  groupID: string
  organizerUID: string
  organizerName: string
  organizerGender: string
  thumbnailURL?: string
  enabled: boolean
  appliedUIDs: string[]
}

export const buildGroup = (groupID: string, data: firebase.firestore.DocumentData) => {
  const newGroup = {
    groupID,
    organizerUID: data.organizerID,
    organizerName: data.organizerName,
    organizerGender: data.gender,
    thumbnailURL: data.thumbnailURL,
    enabled: data.enabled,
    appliedUIDs: data.appliedUIDs
  }
  return newGroup
}

export type UpdateGroup = Pick<Group, 'organizerUID' | 'organizerName' | 'thumbnailURL' | 'appliedUIDs'>
export type CreateGroup = Omit<Group, 'groupID'>
