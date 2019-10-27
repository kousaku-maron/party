import { useEffect, useState, useCallback } from 'react'
import { getSize } from '../services/image'
import { db } from '../repositories/firebase'
import { getUser } from '../repositories/user'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import * as Permissions from 'expo-permissions'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { buildUser, User, updateDocument } from '../entities'

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

type SearchUsersOption = {
  ignoreUserIDs?: string[]
}

export const useSearchUsers = (options?: SearchUsersOption) => {
  const [users, setUsers] = useState<User[]>([])

  const search = useCallback(
    async (text: string) => {
      const snapshot = await usersRef
        .orderBy('userID')
        .startAt(text)
        .endAt(`${text}\uf8ff`)
        .get()

      const users = snapshot.docs
        .map(doc => {
          const user = buildUser(doc.data())
          return user
        })
        .filter(user => {
          if (options && options.ignoreUserIDs) {
            return !options.ignoreUserIDs.includes(user.userID)
          }
          return true
        })

      setUsers(users)
    },
    [options]
  )

  return { users, search }
}

export const useUserEditTools = (uid: string) => {
  const MAX_THUMBNAIL_WIDTH = 1080
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

  const [userID, setUserID] = useState<string>('')

  useEffect(() => {
    if (!user) return
    setUserID(user.userID)
  }, [user])

  const [thumbnailURL, setThumbnailURL] = useState<string>('')

  useEffect(() => {
    if (!user) return
    setThumbnailURL(user.thumbnailURL)
  }, [user])

  const onChangeName = useCallback((text: string) => {
    setName(text)
  }, [])

  const onChangeUserID = useCallback((text: string) => {
    setUserID(text)
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

    const pickResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    })

    if (pickResult.cancelled) {
      return
    }

    const { uri } = (pickResult as unknown) as ImagePicker.ImagePickerResult & ImageInfo // uriを読み込もうとすると型エラーが起きるので型再定義

    const { width, height, error } = await getSize(uri)

    if (error) {
      return
    }

    if (width <= MAX_THUMBNAIL_WIDTH) {
      setThumbnailURL(uri)
      return
    }

    const resizeWidth = MAX_THUMBNAIL_WIDTH
    const resizeHeight = (height * resizeWidth) / MAX_THUMBNAIL_WIDTH
    const resizeResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: resizeWidth, height: resizeHeight } }],
      {
        base64: false,
        compress: 1,
        format: ImageManipulator.SaveFormat.PNG
      }
    )

    setThumbnailURL(resizeResult.uri)
  }, [])

  return { name, userID, thumbnailURL, onChangeName, onChangeUserID, onChangeThumbnailURL, fetched }
}

export const checkGender = async (uid: string) => {
  const user = await getUser(uid)
  if (!user) return null
  return user.gender
}

export const setGender = async (uid: string, gender: string) => {
  const useDoc = usersRef.doc(uid)

  // TODO: repository層に退避
  useDoc.update(
    updateDocument({
      gender: gender
    })
  )
}
