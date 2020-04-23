import { useState, useCallback, useEffect } from 'react'
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import Constants from 'expo-constants'
import _ from 'lodash'
import { Secure } from '../../entities'
import { updateSecure, getSecure } from '../../repositories/secure'

export const usePushNotifications = (uid: string) => {
  const [deviceToken, setDeviceToken] = useState<string | null>(null)

  const getTokenWithAsk = useCallback(async () => {
    const status = await messaging().hasPermission()

    if (status !== FirebaseMessagingTypes.AuthorizationStatus.AUTHORIZED) {
      const settings = await messaging().requestPermission()
      if (settings !== FirebaseMessagingTypes.AuthorizationStatus.AUTHORIZED) return
    }

    const token = await messaging().getToken()
    return token
  }, [])

  // MEMO: effect内では、Permissionの許可申請を行わない。
  useEffect(() => {
    const getToken = async () => {
      try {
        const status = await messaging().hasPermission()
        if (status !== FirebaseMessagingTypes.AuthorizationStatus.AUTHORIZED) return

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

    let updateToken = deviceToken
    if (!updateToken) {
      const token = await getTokenWithAsk()
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
