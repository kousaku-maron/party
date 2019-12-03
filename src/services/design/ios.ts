import { Dimensions, Platform } from 'react-native'

const X_ABOVE_WIDTH = 414
const X_ABOVE_HEIGHT = 896
const X_WIDTH = 375
const X_HEIGHT = 812

export const IOS_STATUS_BAR_HEIGHT = 20
export const X_ABOVE_HEADER_NOTCH_HEIGHT = 44
export const X_ABOVE_TAB_NOTCH_HEIGHT = 34

export const isIPhoneXAbove = () => {
  const { width, height } = Dimensions.get('window')
  return Platform.OS === 'ios' && width === X_ABOVE_WIDTH && height === X_ABOVE_HEIGHT
}

export const isIPhoneX = () => {
  const { width, height } = Dimensions.get('window')
  return Platform.OS === 'ios' && width === X_WIDTH && height === X_HEIGHT
}
