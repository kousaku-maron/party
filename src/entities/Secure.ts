export type Secure = {
  certificateURL?: string
}

export const buildSecure = (data: firebase.firestore.DocumentData) => {
  const newSecure = {
    certificateURL: data.certificateURL
  }

  return newSecure
}
