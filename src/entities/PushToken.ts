export type PushToken = {
  id: string
  token: string
}

export const buildPushToken = (id: string, data: firebase.firestore.DocumentData) => {
  const newPushToken: PushToken = {
    id,
    token: data.token
  }

  return newPushToken
}

export type CreatePushToken = Omit<PushToken, 'id'>
