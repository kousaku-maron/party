import { useEffect, useState, useCallback } from 'react'
import { InteractionManager } from 'react-native'
import { db } from '../repositories/firebase'
import { setCertificateImage } from '../repositories/certificate'
import { updateSecure } from '../repositories/secure'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { Secure, buildSecure } from '../entities'

const usersRef = db.collection('users')
const getSecureRef = (uid: string) => {
  return usersRef
    .doc(uid)
    .collection('options')
    .doc('secure')
}

export const useSecure = (uid: string) => {
  const [secure, setSecure] = useState<Secure>()

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!uid) return
      const secureRef = getSecureRef(uid)
      const unsubscribe = secureRef.onSnapshot(
        (doc: firebase.firestore.DocumentSnapshot) => {
          const secure = buildSecure(doc.data())
          setSecure(secure)
        },
        error => {
          console.info('catch useSecure error', error)
        }
      )
      return () => {
        unsubscribe()
      }
    })
  }, [uid])

  return secure
}

export const useCertificateEditTools = (uid: string) => {
  const secure = useSecure(uid)
  const [currentCertificateURL, setCurrentCertificateURL] = useState<string | null>(null)
  const [uploadCertificateURL, setUploadCertificateURL] = useState<string | null>(null)
  const [uploadCount, setUploadCount] = useState<number>(0)

  useEffect(() => {
    if (!secure?.certificateURL) return
    setCurrentCertificateURL(null) // 一旦初期化させることで、再描写をさせている。
    setCurrentCertificateURL(secure.certificateURL)
  }, [secure, uid, uploadCount])

  const onChangeUpdateCertificateURL = useCallback(async () => {
    const permissionResponse = await Permissions.getAsync(Permissions.CAMERA_ROLL)

    let finalStatus = permissionResponse.status
    if (permissionResponse.status !== 'granted') {
      const askPermissionResponse = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      finalStatus = askPermissionResponse.status
    }

    if (finalStatus !== 'granted') {
      return { cancelled: true }
    }

    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: false })

    if (result.cancelled) {
      return { cancelled: true }
    }

    const { uri } = (result as unknown) as ImagePicker.ImagePickerResult & ImageInfo // uriを読み込もうとすると型エラーが起きるので型再定義
    setUploadCertificateURL(uri)
    return { cancelled: false, uri }
  }, [])

  const upload = useCallback(async () => {
    const { result, url } = await setCertificateImage(uid, uploadCertificateURL)
    if (!result || !url) return

    await updateSecure(uid, { certificateURL: url })
    setUploadCount(prev => prev + 1)
  }, [uid, uploadCertificateURL])

  return { currentCertificateURL, uploadCertificateURL, onChangeUpdateCertificateURL, upload }
}
