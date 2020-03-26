import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps, defaultSize, defaultColor, defaultWidth } from '../entities'

const getSvgXmlData = (color: string, width: number) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="200.5" cy="200.5" r="180" fill="none" stroke="${color}" stroke-miterlimit="10" stroke-width="${width}"/><path d="M265.32,263.6a93.33,93.33,0,0,1-129.55,0" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="${width}"/></svg>`
  return svgXmlData
}

export const UserIcon = ({ size = defaultSize, color = defaultColor, width = defaultWidth }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color, width)} width={size} height={size} />
    </View>
  )
}
