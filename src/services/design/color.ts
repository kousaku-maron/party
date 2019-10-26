import { useState, useEffect } from 'react'
import { Appearance, useColorScheme } from 'react-native-appearance'
import { gorgeousDark, gorgeousLight } from '../../themes'

export const getColors = () => {
  const colorScheme = Appearance.getColorScheme()
  if (!colorScheme) return
  if (colorScheme === 'dark') {
    return gorgeousDark
  }
  return gorgeousLight
}

export const useColors = () => {
  const colorScheme = useColorScheme()
  const [colors, setColors] = useState<typeof gorgeousLight>()

  useEffect(() => {
    if (!colorScheme) return
    if (colorScheme === 'dark') {
      setColors(gorgeousDark)
      return
    }
    setColors(gorgeousLight)
  }, [colorScheme])

  return colors
}
