import { db, storage } from './firebase'
import { Secure } from '../entities'
import { updateDocument } from '../entities'

const storageRef = storage.ref('users')
const usersRef = db.collection('users')
const getSecureRef = (uid: string) => {
  return usersRef
    .doc(uid)
    .collection('options')
    .doc('secure')
}

const metadata = {
  contentType: 'image/png'
}

// TODO: exportしない設計にする, 画像アップロードの箇所をサービスに移管し、純粋にURL保存のみに機能を制限する。
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

// TODO: exportしない設計にする
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

export const setSecure = async (uid: string, secure: Secure) => {
  const secureRef = getSecureRef(uid)

  if (secure.certificateURL) {
    await setCertificate(uid, secure.certificateURL)
  }

  if (secure.pushToken) {
    await secureRef.set(updateDocument({ pushToken: secure.pushToken }), { merge: true })
  }

  return { result: true }
}
