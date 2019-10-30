import { useEffect, useState, useCallback } from 'react'
import { getCertificate, setCertificate } from '../repositories/certificate'
import { getSecure, setSecure } from '../repositories/secure'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'

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

    const secure = await getSecure(uid)
    await setSecure(uid, { ...secure, certificateURL: url })
    setUploadCount(prev => prev + 1)
  }, [uid, uploadCertificateURL])

  return { currentCertificateURL, uploadCertificateURL, onChangeUpdateCertificateURL, upload }
}
