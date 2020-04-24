import { useCallback } from 'react'

export const askNotificationsPermission = async (_uid: string) => {
  console.info('skip ask notifications permission process.')
}

export const useNotificationsSetting = (_uid: string) => {
  const onAccept = useCallback(() => {
    return alert('Expoアプリでは、プッシュ通知機能を操作できません。')
  }, [])

  const onReject = useCallback(() => {
    return alert('Expoアプリでは、プッシュ通知機能を操作できません。')
  }, [])

  return { enabled: false, onAccept, onReject }
}
