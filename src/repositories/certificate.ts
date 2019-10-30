import { storage } from './firebase'

const storageRef = storage.ref('users')

const metadata = {
  contentType: 'image/png'
}

// TODO: binaryを引数に渡す仕様に変えたい。
export const setCertificate = async (uid: string, url: string) => {
  const certificateRef = storageRef.child(`${uid}/secure/certificate.png`)
  const response = await fetch(url)
  const blob = await response.blob()
  const task = certificateRef.put(blob, metadata)

  return task
    .then(snapshop => snapshop.ref.getDownloadURL())
    .then(async url => {
      return { result: true, url }
    })
    .catch(e => {
      console.warn(e)
      return { result: false, url: null }
    })
}

export const getCertificate = async (uid: string) => {
  const certificateRef = storageRef.child(`${uid}/secure/certificate.png`)

  try {
    const url = await certificateRef.getDownloadURL()
    if (url) {
      return url
    }
    return null
  } catch (e) {
    console.warn(e)
    return null
  }
}
