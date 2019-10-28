import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useState, useEffect, useRef } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useColorScheme } from 'react-native-appearance'
import { getTheme } from '../../themes'

const theme = getTheme()

export const defaultColors = theme.light

export type Colors = typeof defaultColors
export type Styles = {
  [key: string]: StyleProp<ViewStyle> & StyleProp<TextStyle> & StyleProp<ImageStyle> // MEMO: これで正解なのかわからないので、注意。
}
export type StylesCallback = (colors: Colors) => Styles

export const useColors = () => {
  const navigation = useRef(useNavigation()).current
  const colorScheme = useColorScheme()
  const [colors, setColors] = useState<Colors>(defaultColors)

  useEffect(() => {
    if (!colorScheme) return
    if (colorScheme === 'dark') {
      setColors(theme.dark)
      navigation.setParams({ colors: theme.dark })
      return
    }
    setColors(theme.light)
    navigation.setParams({ colors: theme.light })
  }, [colorScheme, navigation])

  return colors
}

export const useStyles = (callback: StylesCallback) => {
  const colors = useColors()
  const [styles, setStyles] = useState<Styles>(callback(colors))

  useEffect(() => {
    setStyles(callback(colors))
  }, [callback, colors])

  return styles
}

export const colorsHandler = ({ navigation }: { navigation: NavigationStackProp }) => {
  if (!navigation.state.params || !navigation.state.params.colors) {
    return defaultColors
  }
  const colors: Colors = navigation.state.params.colors
  return colors
}
