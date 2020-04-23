import Notifications from 'expo-notifications'
import { useEffect, useState, useCallback } from 'react'
import { updateSecure, getSecure } from '../../repositories/secure'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import { Secure } from '../../entities'
import _ from 'lodash'

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

    const pushNotification = await Notifications.getExpoPushTokenAsync({
      experienceId: process.env.EXPO_EXPERIENCE_ID
    })

    return pushNotification.data
  }, [])

  // MEMO: effect内では、Permissionの許可申請を行わない。
  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        if (response.status !== 'granted') return

        const pushNotification = await Notifications.getExpoPushTokenAsync({
          experienceId: process.env.EXPO_EXPERIENCE_ID
        })
        const token = pushNotification.data
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
