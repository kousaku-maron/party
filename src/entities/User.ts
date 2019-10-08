export type User = {
  enabled: boolean
  isAccepted: boolean
  uid: string
  name?: string
  thumbnailURL?: string
}

export const buildUser = (data: firebase.firestore.DocumentData) => {
  const newUser = {
    enabled: data.enabled,
    isAccepted: data.isAccepted,
    uid: data.uid,
    name: data.name,
    thumbnailURL: data.thumbnailURL
  }

  return newUser
}

export type UpdateUser = Pick<User, 'uid' | 'name' | 'thumbnailURL'>
