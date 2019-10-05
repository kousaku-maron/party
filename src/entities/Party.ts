export type Party = {
  uid: string
  name?: string
  thumbnailURL?: string
}

export const buildParty = (data: firebase.firestore.DocumentData) => {
  const newParty = {
    uid: data.uid,
    name: data.name,
    thumbnailURL: data.thumbnailURL
  }

  return newParty
}
