import Constants from 'expo-constants'

type NotificationsService = {
  askNotificationsPermission: () => Promise<{ result: boolean }>
  storeToken: (uid: string) => Promise<void>
  removeToken: (uid: string) => Promise<void>
  useNotificationsSetting: () => {
    enabled: boolean
    onAccept: () => Promise<void>
    onReject: () => Promise<void>
  }
}

let notifications: NotificationsService

if (Constants.appOwnership === 'expo') {
  notifications = require('./notifications.expo')
}

if (Constants.appOwnership !== 'expo') {
  notifications = require('./notifications')
}

export default notifications
