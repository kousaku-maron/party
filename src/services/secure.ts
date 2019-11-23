import { useEffect, useState, useCallback } from 'react'
import { db } from '../repositories/firebase'
import { getCertificateImage, setCertificateImage } from '../repositories/certificate'
import { updateSecure, getSecure } from '../repositories/secure'
import { Notifications } from 'expo'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { Secure, buildSecure } from '../entities'
import _ from 'lodash'

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
      const url = await getCertificateImage(uid)
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
    const { result, url } = await setCertificateImage(uid, uploadCertificateURL)
    if (!result || !url) return

    await updateSecure(uid, { certificateURL: url })
    setUploadCount(prev => prev + 1)
  }, [uid, uploadCertificateURL])

  return { currentCertificateURL, uploadCertificateURL, onChangeUpdateCertificateURL, upload }
}

export const usePushNotifications = (uid: string) => {
  const [deviceToken, setDeviceToken] = useState<string | null>(null)

  const getTokenWithAsk = useCallback(async () => {
    const permissionResponse = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = permissionResponse.status

    if (permissionResponse.status !== 'granted') {
      const askPermissionResponse = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = askPermissionResponse.status
    }

    if (finalStatus !== 'granted') {
      return null
    }

    const token = await Notifications.getExpoPushTokenAsync()
    return token
  }, [])

  // MEMO: effect内では、Permissionの許可申請を行わない。
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await Notifications.getExpoPushTokenAsync()
        if (!token) return
        setDeviceToken(token)
      } catch (e) {
        console.warn(e)
      }
    }
    getToken()
  }, [])

  const onAccept = useCallback(async () => {
    if (!Constants.isDevice) {
      return alert('エミュレーターでは、プッシュ通知を許可できません。')
    }

    let updateToken = deviceToken
    if (!updateToken) {
      const token = await getTokenWithAsk()
      if (!token) return
      updateToken = token
    }

    const currentSecure = await getSecure(uid)
    const secure: Secure = {
      pushTokens: !_.isEmpty(currentSecure.pushTokens)
        ? _.uniq([...currentSecure.pushTokens, updateToken])
        : [updateToken]
    }
    const { result } = await updateSecure(uid, secure)
    return { result }
  }, [deviceToken, getTokenWithAsk, uid])

  const onReject = useCallback(async () => {
    const currentSecure = await getSecure(uid)
    const secure: Secure = {
      pushTokens: !_.isEmpty(currentSecure.pushTokens) ? _.pull(currentSecure.pushTokens, deviceToken) : []
    }
    const { result } = await updateSecure(uid, secure)

    return { result }
  }, [deviceToken, uid])

  return { onAccept, onReject, deviceToken }
}
