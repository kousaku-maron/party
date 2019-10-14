export type User = {
  enabled: boolean
  isAccepted: boolean
  uid: string
  name?: string
  thumbnailURL?: string
  sex: string
}

export const buildUser = (data: firebase.firestore.DocumentData) => {
  const newUser = {
    enabled: data.enabled,
    isAccepted: data.isAccepted,
    uid: data.uid,
    name: data.name,
    thumbnailURL: data.thumbnailURL,
    sex: data.sex
  }

  return newUser
}

export type UpdateUser = Pick<User, 'uid' | 'name' | 'thumbnailURL'>
