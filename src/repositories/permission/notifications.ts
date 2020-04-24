import { AsyncStorage } from 'react-native'
import { NotificationsPermission } from '../../entities'

const isEnabledNotificationsCharKey = 'isEnabledNotificationsChar'

export const getNotifications = async () => {
  const isEnabledNotificationsChar = await AsyncStorage.getItem(isEnabledNotificationsCharKey)

  if (isEnabledNotificationsChar === '0') {
    return {
      isEnabledNotifications: false,
      isAlreadyInitialAsked: true
    }
  }
  if (isEnabledNotificationsChar === '1') {
    return {
      isEnabledNotifications: true,
      isAlreadyInitialAsked: true
    }
  }

  // 初期値
  return {
    isEnabledNotifications: false,
    isAlreadyInitialAsked: false
  }
}

export const setNotifications = async (settings: NotificationsPermission) => {
  try {
    const { isEnabledNotifications, isAlreadyInitialAsked } = settings

    if (!isAlreadyInitialAsked) {
      throw 'not set isAlreadyInitialAsked false'
    }

    if (isEnabledNotifications) {
      await AsyncStorage.setItem(isEnabledNotificationsCharKey, '1')
    }

    if (!isEnabledNotifications) {
      await AsyncStorage.setItem(isEnabledNotificationsCharKey, '0')
    }

    return { result: true }
  } catch (e) {
    console.warn(e)
    return { result: false }
  }
}
