export type Group = {
  id: string
  organizerID: string
  organizerName: string
  thumbnailURL?: string
  enabled: boolean
  gender: string
  uri: string
  date: Date
  appliedUIDs: string[]
}

export const buildGroup = (id: string, data: firebase.firestore.DocumentData) => {
  const newGroup = {
    id,
    organizerID: data.organizerID,
    organizerName: data.organizerName,
    thumbnailURL: data.thumbnailURL,
    enabled: data.enabled,
    gender: data.gender,
    uri: data.uri,
    date: data.date.toDate(),
    appliedUIDs: data.appliedUIDs
  }
  return newGroup
}
export type UpdateGroup = Pick<Group, 'organizerID' | 'organizerName' | 'thumbnailURL' | 'appliedUIDs'> & {
  groupID?: string
}
