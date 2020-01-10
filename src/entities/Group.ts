export type Group = {
  id: string
  organizerUID: string
  organizerName: string
  organizerGender: string
  thumbnailURL?: string
  enabled: boolean
  appliedUIDs: string[]
}

export const buildGroup = (id: string, data: firebase.firestore.DocumentData) => {
  const newGroup = {
    id,
    organizerUID: data.organizerUID,
    organizerName: data.organizerName,
    organizerGender: data.organizerGender,
    thumbnailURL: data.thumbnailURL,
    enabled: data.enabled,
    appliedUIDs: data.appliedUIDs
  }
  return newGroup
}

export type UpdateGroup = Pick<Group, 'organizerUID' | 'organizerName' | 'thumbnailURL' | 'appliedUIDs'>
export type CreateGroup = Omit<Group, 'id'>
