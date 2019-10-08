import { useEffect, useState, useCallback } from 'react'
import firebase from '../repositories/firebase'
import { getUser } from '../repositories/user'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { buildUser, User } from '../entities'

const db = firebase.firestore()
const usersRef = db.collection('users')

export const useUser = (uid: string) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    if (!uid) return
    const userRef = usersRef.doc(uid)
    const unsubscribe = userRef.onSnapshot((doc: firebase.firestore.DocumentSnapshot) => {
      const user = buildUser(doc.data())
      setUser(user)
    })
    return () => {
      unsubscribe()
    }
  }, [uid])

  return user
}

export const useUserEditTools = (uid: string) => {
  const [user, setUser] = useState<User | null>(null)
  const [fetched, setFetched] = useState<boolean>(false)

  useEffect(() => {
    const asyncEffect = async () => {
      const _user = await getUser(uid)
      setUser(_user)
      setFetched(true)
    }
    asyncEffect()
  }, [uid])

  const [name, setName] = useState<string>('')

  useEffect(() => {
    if (!user) return
    setName(user.name)
  }, [user])

  const [thumbnailURL, setThumbnailURL] = useState<string>('')

  useEffect(() => {
    if (!user) return
    setThumbnailURL(user.thumbnailURL)
  }, [user])

  const onChangeName = useCallback((text: string) => {
    setName(text)
  }, [])

  const onChangeThumbnailURL = useCallback(async () => {
    const permissionResponse = await Permissions.getAsync(Permissions.CAMERA_ROLL)

    let finalStatus = permissionResponse.status
    if (permissionResponse.status !== 'granted') {
      const askPermissionResponse = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      finalStatus = askPermissionResponse.status
    }

    if (finalStatus !== 'granted') {
      return
    }

    // TODO: 画像を圧縮する(横1080px)
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    })

    if (result.cancelled) {
      return
    }

    const { uri } = (result as unknown) as ImagePicker.ImagePickerResult & ImageInfo // uriを読み込もうとすると型エラーが起きるので型再定義
    setThumbnailURL(uri)
  }, [])

  return { name, thumbnailURL, onChangeName, onChangeThumbnailURL, fetched }
}
