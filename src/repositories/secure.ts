import firebase from './firebase'

const storage = firebase.storage()
const storageRef = storage.ref('users')

const metadata = {
  contentType: 'image/png'
}

export const setCertificate = async (uid: string, url: string) => {
  const certificateRef = storageRef.child(`${uid}/secure/certificate.png`)
  const response = await fetch(url)
  const blob = await response.blob()
  const task = certificateRef.put(blob, metadata)

  return task
    .then(snapshop => snapshop.ref.getDownloadURL())
    .then(async url => {
      return { certificateURL: url }
    })
    .catch(e => {
      console.warn(e)
      return { certificateURL: null }
    })
}

export const getCertificate = async (uid: string) => {
  const certificateRef = storageRef.child(`${uid}/secure/certificate.png`)

  try {
    const url = await certificateRef.getDownloadURL()
    if (url) {
      return { certificateURL: url }
    }
    return { certificateURL: null }
  } catch (e) {
    // console.warn(e)
    return { certificateURL: null }
  }
}
