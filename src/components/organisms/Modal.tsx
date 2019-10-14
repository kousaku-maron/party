import { Platform } from 'react-native'
import FlatDesignModal from './FlatDesignModal'
import MaterialDesignModal from './MaterialDesignModal'

const Modal = Platform.select({
  ios: FlatDesignModal,
  android: MaterialDesignModal,
  default: MaterialDesignModal
})

export default Modal
