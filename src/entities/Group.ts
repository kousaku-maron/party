export type Group = {
  organizerUID: string
  organizerName: string
  organizerGender: string
  thumbnailURL?: string
  enabled: boolean
  appliedUIDs: string[]
}

export const buildGroup = (data: firebase.firestore.DocumentData) => {
  const newGroup = {
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
