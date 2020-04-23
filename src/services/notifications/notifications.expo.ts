import { useCallback, useState } from 'react'

export const usePushNotifications = (_uid: string) => {
  const [deviceToken] = useState<string | null>(null)

  const onAccept = useCallback(() => {
    return alert('Expoアプリでは、プッシュ通知機能を操作できません。')
  }, [])

  const onReject = useCallback(() => {
    return alert('Expoアプリでは、プッシュ通知機能を操作できません。')
  }, [])

  return { onAccept, onReject, deviceToken }
}
