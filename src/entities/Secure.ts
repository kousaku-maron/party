export type Secure = {
  certificateURL?: string
  pushToken?: string
}

export const buildSecure = (data: firebase.firestore.DocumentData) => {
  const newSecure = {
    certificateURL: data.certificateURL,
    pushToken: data.pushToken
  }

  return newSecure
}
