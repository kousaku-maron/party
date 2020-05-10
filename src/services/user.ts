import { useEffect, useState, useCallback, useMemo } from 'react'
import { useDomainUserState, useDomainUserActions, useAppAuthState, useAppUserState } from '../store/hooks'
import { getSize } from '../services/image'
import { db } from '../repositories/firebase'
import { getUser } from '../repositories/user'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import * as Permissions from 'expo-permissions'
import { InteractionManager } from 'react-native'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { buildUser, User, updateDocument } from '../entities'

const usersRef = db.collection('users')

export const useUser = (uid: string) => {
  const domainUser = useDomainUserState()
  const { setUser: setDomainUser } = useDomainUserActions()
  const [fetching, setFetching] = useState<boolean>(true)
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (!uid) return
      const userRef = usersRef.doc(uid)
      const unsubscribe = userRef.onSnapshot(
        (doc: firebase.firestore.DocumentSnapshot) => {
          const user = buildUser(doc.id, doc.data())
          setDomainUser(user)
          setUser(user)
          setFetching(false)
        },
        error => {
          console.info('catch useUser error', error)
        }
      )
      return () => {
        unsubscribe()
      }
    })
  }, [setDomainUser, uid])

  const userFromDomain = useMemo(() => {
    if (user && domainUser[user.id]) {
      return domainUser[user.id]
    }

    return user
  }, [domainUser, user])

  return { fetching, user: userFromDomain }
}

export const useUserRelationship = (toUID: string) => {
  const { uid } = useAppAuthState()
  const domainUser = useDomainUserState()
  const { fetchingApplyFriendship, fetchingAcceptFriendship, fetchingRefuseFriendship } = useAppUserState()

  const user = useMemo(() => {
    return domainUser[toUID]
  }, [domainUser, toUID])

  const isBlocked = useMemo(() => {
    return user && user.blockUIDs && user.blockUIDs.includes(uid)
  }, [uid, user])

  const isFriend = useMemo(() => {
    const isFriendCache = fetchingAcceptFriendship.some(node => node.toUID === toUID)
    if (isFriendCache) {
      return true
    }

    return user && user.friendUIDs && user.friendUIDs.includes(uid)
  }, [fetchingAcceptFriendship, toUID, uid, user])

  const isApply = useMemo(() => {
    const isApplyCache = fetchingApplyFriendship.some(node => node.toUID === toUID)

    if (isApplyCache) {
      return true
    }

    return user && user.appliedFriendUIDs && user.appliedFriendUIDs.includes(uid)
  }, [fetchingApplyFriendship, toUID, uid, user])

  const isApplied = useMemo(() => {
    const isAppliedCache = fetchingRefuseFriendship.some(node => node.toUID === toUID)
    if (isAppliedCache) {
      return false
    }

    return user && user.applyFriendUIDs && user.applyFriendUIDs.includes(uid)
  }, [fetchingRefuseFriendship, toUID, uid, user])

  return { isBlocked, isFriend, isApply, isApplied }
}

type SearchUsersOption = {
  ignoreUserIDs?: string[]
}

export const useSearchUsers = (options?: SearchUsersOption) => {
  const domainUser = useDomainUserState()
  const { setUsers: setDomainUsers } = useDomainUserActions()
  const [fetching, setFetching] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])

  const search = useCallback(
    async (text: string) => {
      setFetching(true)

      const snapshot = await usersRef
        .orderBy('userID')
        .startAt(text)
        .endAt(`${text}\uf8ff`)
        .get()

      const users = snapshot.docs
        .map(doc => {
          const user = buildUser(doc.id, doc.data())
          return user
        })
        .filter(user => {
          if (options?.ignoreUserIDs) {
            return !options.ignoreUserIDs.includes(user.userID)
          }
          return true
        })

      setDomainUsers(users)
      setUsers(users)
      setFetching(false)
    },
    [options, setDomainUsers]
  )

  const usersFromDomain = useMemo(() => {
    return users.map(user => {
      if (domainUser[user.id]) {
        return domainUser[user.id]
      }

      return user
    })
  }, [domainUser, users])

  return { fetching, users: usersFromDomain, search }
}

export const useUserEditTools = (uid: string) => {
  const MAX_THUMBNAIL_WIDTH = 1080
  const [user, setUser] = useState<User | null>(null)
  const [fetching, setFetching] = useState<boolean>(true)

  useEffect(() => {
    const asyncEffect = async () => {
      const user = await getUser(uid)
      setUser(user)
      setFetching(false)
    }
    asyncEffect()
  }, [uid])

  const [name, setName] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!user) return
    setName(user.name)
  }, [user])

  const [userID, setUserID] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!user) return
    setUserID(user.userID)
  }, [user])

  const [introduction, setIntroduction] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!user) return
    if (!user.introduction) return
    setIntroduction(user.introduction)
  }, [user])

  const [thumbnailURL, setThumbnailURL] = useState<string | undefined>(undefined)

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

  const onChangeIntroduction = useCallback((text: string) => {
    setIntroduction(text)
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

  return {
    name,
    userID,
    thumbnailURL,
    introduction,
    onChangeName,
    onChangeUserID,
    onChangeIntroduction,
    onChangeThumbnailURL,
    fetching
  }
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
