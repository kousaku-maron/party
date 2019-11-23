import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native'
import { useState, useEffect } from 'react'
import { useColorScheme } from 'react-native-appearance'
import { getTheme } from '../../themes'

const palette = getTheme()

export const defaultColors = palette.light

export type Colors = typeof defaultColors
export type Styles = {
  [key: string]: StyleProp<ViewStyle> & StyleProp<TextStyle> & StyleProp<ImageStyle> // MEMO: これで正解なのかわからないので、注意。
}
export type MakeStyles = (colors: Colors) => Styles

export const useColors = () => {
  const colorScheme = useColorScheme()
  const [colors, setColors] = useState<Colors>(defaultColors)

  useEffect(() => {
    if (colorScheme === 'dark') {
      setColors(palette.dark)
      return
    }
    setColors(palette.light)
  }, [colorScheme])

  return colors
}

export const useStyles = (callback: MakeStyles) => {
  const colors = useColors()
  const [styles, setStyles] = useState<Styles>(callback(colors))

  useEffect(() => {
    setStyles(callback(colors))
  }, [callback, colors])

  return styles
}
