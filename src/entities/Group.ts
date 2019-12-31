export type Group = {
  uid: string
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
    uid: id,
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
export type UpdateGroup = Pick<Group, 'uid' | 'organizerID' | 'organizerName' | 'thumbnailURL' | 'appliedUIDs'>
