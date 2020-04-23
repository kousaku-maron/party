import { useState, useCallback, useEffect } from 'react'
import { AsyncStorage } from 'react-native'
import messaging from '@react-native-firebase/messaging'
import Constants from 'expo-constants'
import _ from 'lodash'
import { Secure } from '../../entities'
import { updateSecure, getSecure } from '../../repositories/secure'

const isEnabledNotificationsCharKey = 'isEnabledNotificationsChar'

// TODO: レポジトリ層にした方がいいかもしれない。
const useIsEnabledNotifications = () => {
  const [isEnabledNotifications, setIsEnabledNotifications] = useState<boolean | null>(null)

  useEffect(() => {
    const asyncTask = async () => {
      const isEnabledNotificationsChar = await AsyncStorage.getItem(isEnabledNotificationsCharKey)
      if (isEnabledNotificationsChar === '0') {
        setIsEnabledNotifications(false)
        return
      }
      if (isEnabledNotificationsChar === '1') {
        setIsEnabledNotifications(true)
        return
      }

      setIsEnabledNotifications(false) // 初期値
    }

    asyncTask()
  }, [])

  const onEnabled = useCallback(async () => {
    await AsyncStorage.setItem(isEnabledNotificationsCharKey, '1')
    setIsEnabledNotifications(true)
  }, [])

  const onDisabled = useCallback(async () => {
    await AsyncStorage.setItem(isEnabledNotificationsCharKey, '0')
    setIsEnabledNotifications(false)
  }, [])

  return { isEnabledNotifications, onEnabled, onDisabled }
}

export const usePushNotifications = (uid: string) => {
  const { isEnabledNotifications, onEnabled, onDisabled } = useIsEnabledNotifications()
  const [deviceToken, setDeviceToken] = useState<string | null>(null)

  const getTokenWithAsk = useCallback(async () => {
    const status = await messaging().hasPermission()

    if (status !== 1) {
      const settings = await messaging().requestPermission()
      if (settings !== 1) return
    }

    const token = await messaging().getToken()
    return token
  }, [])

  useEffect(() => {
    const getToken = async () => {
      try {
        const status = await messaging().hasPermission()
        if (status !== 1) return

        const token = await messaging().getToken()
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

    const token = await getTokenWithAsk()
    if (!token) return

    const currentSecure = await getSecure(uid)
    const secure: Secure = {
      pushTokens: !_.isEmpty(currentSecure.pushTokens) ? _.uniq([...currentSecure.pushTokens, token]) : [token]
    }
    const { result } = await updateSecure(uid, secure)
    await onEnabled()

    return { result }
  }, [getTokenWithAsk, onEnabled, uid])

  const onReject = useCallback(async () => {
    if (!Constants.isDevice) {
      return alert('エミュレーターでは、プッシュ通知を許可できません。')
    }

    if (!deviceToken) return

    const currentSecure = await getSecure(uid)
    const secure: Secure = {
      pushTokens: !_.isEmpty(currentSecure.pushTokens) ? _.pull(currentSecure.pushTokens, deviceToken) : []
    }
    const { result } = await updateSecure(uid, secure)

    await messaging().deleteToken()
    await onDisabled()

    return { result }
  }, [deviceToken, onDisabled, uid])

  return { onAccept, onReject, isEnabledNotifications }
}
