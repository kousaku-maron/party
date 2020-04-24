export type NotificationsPermission = {
  isEnabledNotifications: boolean
  isAlreadyInitialAsked: boolean
}

export type Permission = {
  notifications: NotificationsPermission
}
