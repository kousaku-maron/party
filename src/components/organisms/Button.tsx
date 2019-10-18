import { Platform } from 'react-native'
import RoundedButton from '../atoms/RoundedButton'
import AngularedButton from '../atoms/AngularedButton'

const Button = Platform.select({
  ios: RoundedButton,
  android: AngularedButton,
  default: AngularedButton
})

export default Button
