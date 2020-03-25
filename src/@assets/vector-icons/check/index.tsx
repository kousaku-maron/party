import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps } from '../entities'

const getSvgXmlData = (color: string) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="M19.25,177.24,128.24,279a38,38,0,0,0,50.37,1.27L380,110.43" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-width="17.01"/></svg>`
  return svgXmlData
}

export const CheckIcon = ({ size = 24, color = 'black' }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color)} width={size} height={size} />
    </View>
  )
}
