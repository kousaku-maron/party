export type Party = {
  uid: string
  name: string
  thumbnailURL?: string
  enabled: boolean
  date: Date
}

export const buildParty = (data: firebase.firestore.DocumentData) => {
  const newParty = {
    uid: data.uid,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    enabled: data.enabled,
    date: data.date
  }
  return newParty
}
