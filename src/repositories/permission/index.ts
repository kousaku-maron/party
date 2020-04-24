import { Permission } from '../../entities'
import { getNotifications, setNotifications } from './notifications'

export const getPermission = async () => {
  const notifications = await getNotifications()

  const permission = { notifications }

  return permission
}

export const setPermission = async (permission: Permission) => {
  try {
    const { notifications } = permission
    const { result } = await setNotifications(notifications)
    if (!result) {
      throw 'set notifications permission failure.'
    }

    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
