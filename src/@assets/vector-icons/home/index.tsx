import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps, defaultSize, defaultColor, defaultWidth } from '../entities'

const getSvgXmlData = (color: string, width: number) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="M381,162.58V351.11c0,16-14.16,29-31.62,29H52.62c-17.46,0-31.62-13-31.62-29V162.58a27.86,27.86,0,0,1,9.67-20.87L179.05,28.22a33.72,33.72,0,0,1,43.9,0L371.33,141.71A27.86,27.86,0,0,1,381,162.58Z" fill="none" stroke="${color}" stroke-miterlimit="10" stroke-width="${width}"/><line x1="201" y1="262.23" x2="201" y2="327.06" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="${width}"/></svg>`
  return svgXmlData
}

export const HomeIcon = ({ size = defaultSize, color = defaultColor, width = defaultWidth }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color, width)} width={size} height={size} />
    </View>
  )
}
