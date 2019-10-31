export type Secure = {
  certificateURL?: string
  pushTokens?: string[]
}

export const buildSecure = (data: firebase.firestore.DocumentData) => {
  const newSecure = {
    certificateURL: data.certificateURL,
    pushTokens: data.pushTokens
  }

  return newSecure
}
