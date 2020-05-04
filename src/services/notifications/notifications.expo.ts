import { useCallback } from 'react'

export const askNotificationsPermission = async () => {
  console.info('skip ask notifications permission process.')

  return { result: false }
}

export const storeToken = (_uid: string) => {
  console.info('skip store token process.')
}

export const removeToken = (_uid: string) => {
  console.info('skip remove token process.')
}

export const useNotificationsSetting = () => {
  const onAccept = useCallback(() => {
    return alert('Expoアプリでは、プッシュ通知機能を操作できません。')
  }, [])

  const onReject = useCallback(() => {
    return alert('Expoアプリでは、プッシュ通知機能を操作できません。')
  }, [])

  return { enabled: false, onAccept, onReject }
}
