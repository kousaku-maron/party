export type Venue = {
  vid: string
  name?: string
  thumbnailURL?: string
}

export const buildVenue = (data: firebase.firestore.DocumentData) => {
  const newVenue = {
    uid: data.uid,
    name: data.name,
    thumbnailURL: data.thumbnailURL
  }

  return newVenue
}
