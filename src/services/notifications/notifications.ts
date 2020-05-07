import { useState, useCallback, useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import Constants from 'expo-constants'
import { setPermission, getPermission } from '../../repositories/permission'
import { getPushTokens, createPushToken, deletePushToken } from '../../repositories/pushToken'
import { useAppAuthState } from '../../store/hooks'

/**
 * Appに通知権限をリクエストします。
 *
 * デバイストークンの保存、削除の処理は行われません。
 */
export const askNotificationsPermission = async () => {
  const settings = await messaging().requestPermission()

  if (settings === 1) {
    return { result: true }
  }

  return { result: false }
}

/**
 * ログインユーザーと紐付けてデバイストークンを保存します。
 *
 * Appに通知権限がなければ、処理はスキップされます。
 */
export const storeToken = async (uid: string) => {
  if (!Constants.isDevice) {
    return alert('エミュレーターでは、プッシュ通知のトークン制御を禁止しています。')
  }

  const status = await messaging().hasPermission()
  if (status !== 1) return

  const token = await messaging().getToken()
  const pushTokens = await getPushTokens(uid)
  const tokens = pushTokens.map(pushToken => pushToken.token)
  if (tokens.includes(token)) return

  const { result } = await createPushToken(uid, { token })
  if (!result) return

  await setPermission({ notifications: { isAlreadyInitialAsked: true, isEnabledNotifications: true } })
}

/**
 * ログインユーザーと紐付いたデバイストークンを削除します。
 *
 * Appに通知権限がなければ、処理はスキップされます。
 */
export const removeToken = async (uid: string) => {
  if (!Constants.isDevice) {
    return alert('エミュレーターでは、プッシュ通知のトークン制御を禁止しています。')
  }

  const status = await messaging().hasPermission()
  if (status !== 1) return

  const token = await messaging().getToken()
  const pushTokens = await getPushTokens(uid)
  const targetPushToken = pushTokens.find(pushToken => pushToken.token === token)
  if (!targetPushToken) return

  const { result } = await deletePushToken(uid, targetPushToken.id)
  if (!result) return

  await setPermission({ notifications: { isAlreadyInitialAsked: true, isEnabledNotifications: false } })
}

export const useNotificationsSetting = () => {
  const { uid } = useAppAuthState()
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
