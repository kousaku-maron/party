export type User = {
  uid: string
  name?: string
  thumbnailURL?: string
}

export const buildUser = (user: User) => {
  const newUser = {
    uid: user.uid,
    name: user.name,
    thumbnailURL: user.thumbnailURL
  }

  return newUser
}
