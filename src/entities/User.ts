export type User = {
  enabled: boolean
  isAccepted: boolean
  uid: string
  userID: string
  name: string
  thumbnailURL?: string
}

export const buildUser = (data: firebase.firestore.DocumentData) => {
  const newUser = {
    enabled: data.enabled,
    isAccepted: data.isAccepted,
    uid: data.uid,
    userID: data.userID,
    name: data.name,
    thumbnailURL: data.thumbnailURL
  }

  return newUser
}

export type UpdateUser = Pick<User, 'uid' | 'name' | 'thumbnailURL'> & { userID?: string }
