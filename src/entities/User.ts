export type User = {
  uid: string
  name?: string
  thumbnailURL?: string
}

export const buildUser = (data: firebase.firestore.DocumentData) => {
  const newUser = {
    uid: data.uid,
    name: data.name,
    thumbnailURL: data.thumbnailURL
  }

  return newUser
}
