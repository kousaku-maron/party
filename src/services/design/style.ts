import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native'
import { useState, useEffect } from 'react'
// import { useColorScheme } from 'react-native-appearance'
import { useUIState } from '../../store/hooks'
import { getTheme } from '../../themes'

const palette = getTheme()

export const defaultColors = palette.dark

export type Colors = typeof defaultColors
export type Styles = {
  [key: string]: StyleProp<ViewStyle> & StyleProp<TextStyle> & StyleProp<ImageStyle> // MEMO: これで正解なのかわからないので、注意。
}
export type MakeStyles = (colors: Colors) => Styles

export const useColors = () => {
  const { theme } = useUIState()
  return theme === 'dark' ? palette.dark : palette.light
}

export const useStyles = (callback: MakeStyles) => {
  const colors = useColors()
  const [styles, setStyles] = useState<Styles>(callback(colors))

  useEffect(() => {
    setStyles(callback(colors))
  }, [callback, colors])

  return styles
}
