import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps, defaultSize, defaultColor, defaultWidth } from '../entities'

const getSvgXmlData = (color: string, width: number) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="M19.25,177.24,128.24,279a38,38,0,0,0,50.37,1.27L380,110.43" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-width="${width}"/></svg>`
  return svgXmlData
}

export const CheckIcon = ({ size = defaultSize, color = defaultColor, width = defaultWidth }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color, width)} width={size} height={size} />
    </View>
  )
}
