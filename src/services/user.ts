import { useEffect, useState, useCallback } from 'react'
import firebase from '../repositories/firebase'
import { setThumbnail, setName } from '../repositories/user'
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

export const useUserEditTools = () => {
  const [_name, _setName] = useState<string>('') // TODO: firestoreからUserデータ取得して初期値を入れる。(onSnapShotは使わないこと)
  const [editing, setEditing] = useState<boolean>(false)

  const onChangeName = useCallback(
    (text: string) => {
      _setName(text)
    },
    [_setName]
  )

  const onPressNameEdit = useCallback(() => {
    setEditing(true)
  }, [setEditing])

  const onSubmitNameEditing = useCallback(
    (uid: string) => {
      setEditing(false)
      setName(uid, _name)
    },
    [_name, setEditing]
  )

  const pickThumbnailImage = useCallback(async (uid: string) => {
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

    await setThumbnail(uid, uri)
  }, [])

  return { pickThumbnailImage, name: _name, onChangeName, editing, onPressNameEdit, onSubmitNameEditing }
}
