import { Appearance } from 'react-native-appearance'
import { gorgeousDark, gorgeousLight } from '../../themes'

export const getColors = () => {
  const colorScheme = Appearance.getColorScheme()
  if (!colorScheme) return
  if (colorScheme === 'dark') {
    return gorgeousDark
  }
  return gorgeousLight
}
