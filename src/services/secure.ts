import { useEffect, useState, useCallback } from 'react'
import { db } from '../repositories/firebase'
import { getCertificate, setCertificate } from '../repositories/certificate'
import { updateSecure } from '../repositories/secure'
import { Notifications } from 'expo'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
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
    if (!uid) return
    const secureRef = getSecureRef(uid)
    const unsubscribe = secureRef.onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
      const secure = buildSecure(doc.data())
      setSecure(secure)
    })
    return () => {
      unsubscribe()
    }
  }, [uid])

  return secure
}

export const useCertificateEditTools = (uid: string) => {
  const [currentCertificateURL, setCurrentCertificateURL] = useState<string | null>(null)
  const [uploadCertificateURL, setUploadCertificateURL] = useState<string | null>(null)
  const [uploadCount, setUploadCount] = useState<number>(0)

  useEffect(() => {
    const asyncEffect = async () => {
      const url = await getCertificate(uid)
      setCurrentCertificateURL(null) // 一旦初期化させることで、再描写をさせている。
      setCurrentCertificateURL(url)
    }
    asyncEffect()
  }, [uid, uploadCount])

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
    const { result, url } = await setCertificate(uid, uploadCertificateURL)
    if (!result || !url) return

    await updateSecure(uid, { certificateURL: url })
    setUploadCount(prev => prev + 1)
  }, [uid, uploadCertificateURL])

  return { currentCertificateURL, uploadCertificateURL, onChangeUpdateCertificateURL, upload }
}

export const usePushNotifications = (uid: string) => {
  const onAccept = useCallback(async () => {
    if (!Constants.isDevice) {
      return alert('エミュレーターでは、プッシュ通知を許可できません。')
    }

    const permissionResponse = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = permissionResponse.status

    if (permissionResponse.status !== 'granted') {
      const askPermissionResponse = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = askPermissionResponse.status
    }

    if (finalStatus !== 'granted') return

    const token = await Notifications.getExpoPushTokenAsync()
    const secure: Secure = { pushToken: token }

    const { result } = await updateSecure(uid, secure)

    // TODO: FlashMessage発行

    return { result }
  }, [uid])

  const onReject = useCallback(async () => {
    const secure: Secure = { pushToken: null }

    const { result } = await updateSecure(uid, secure)

    // TODO: FlashMessage発行

    return { result }
  }, [uid])

  return { onAccept, onReject }
}
