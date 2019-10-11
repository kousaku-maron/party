export type PartyDetail = {
  uid: string
  name: string
  thumbnailURL?: string
  enabled: boolean
}

export const buildPartyDetail = (data: firebase.firestore.DocumentData) => {
  const newParty = {
    uid: data.uid,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    enabled: data.enabled
  }
  return newParty
}
