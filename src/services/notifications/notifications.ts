import { useState, useCallback, useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import Constants from 'expo-constants'
import _ from 'lodash'
import { Secure } from '../../entities'
import { setPermission, getPermission } from '../../repositories/permission'
import { updateSecure, getSecure } from '../../repositories/secure'
import { useAuthState } from '../../store/auth'

export const askNotificationsPermission = async (uid: string) => {
  const settings = await messaging().requestPermission()
  if (settings !== 1) {
    return await removeToken(uid)
  }

  return await storeToken(uid)
}

const storeToken = async (uid: string) => {
  if (!Constants.isDevice) {
    return alert('エミュレーターでは、プッシュ通知のトークン制御を禁止しています。')
  }

  const status = await messaging().hasPermission()
  if (status !== 1) {
    const settings = await messaging().requestPermission()
    if (settings !== 1) return
  }

  const token = await messaging().getToken()

  const currentSecure = await getSecure(uid)
  const secure: Secure = {
    pushTokens: !_.isEmpty(currentSecure.pushTokens) ? _.uniq([...currentSecure.pushTokens, token]) : [token]
  }

  const { result } = await updateSecure(uid, secure)
  if (!result) return

  await setPermission({ notifications: { isAlreadyInitialAsked: true, isEnabledNotifications: true } })
}

const removeToken = async (uid: string) => {
  if (!Constants.isDevice) {
    return alert('エミュレーターでは、プッシュ通知のトークン制御を禁止しています。')
  }

  const status = await messaging().hasPermission()
  if (status !== 1) return

  const token = await messaging().getToken()

  const currentSecure = await getSecure(uid)
  const secure: Secure = {
    pushTokens: !_.isEmpty(currentSecure.pushTokens) ? _.pull(currentSecure.pushTokens, token) : []
  }

  const { result } = await updateSecure(uid, secure)
  if (!result) return

  await setPermission({ notifications: { isAlreadyInitialAsked: true, isEnabledNotifications: false } })
}

export const useNotificationsSetting = () => {
  const { uid } = useAuthState()
  const [enabled, setEnabled] = useState<boolean | null>(null)

  const onUpdateEnabledState = useCallback(async () => {
    try {
      const {
        notifications: { isEnabledNotifications }
      } = await getPermission()

      setEnabled(isEnabledNotifications)
    } catch (e) {
      setEnabled(null)
    }
  }, [])

  useEffect(() => {
    onUpdateEnabledState()
  }, [onUpdateEnabledState])

  const onAccept = useCallback(async () => {
    await storeToken(uid)
    await onUpdateEnabledState()
  }, [onUpdateEnabledState, uid])

  const onReject = useCallback(async () => {
    await removeToken(uid)
    await onUpdateEnabledState()
  }, [onUpdateEnabledState, uid])

  return { enabled, onAccept, onReject }
}
