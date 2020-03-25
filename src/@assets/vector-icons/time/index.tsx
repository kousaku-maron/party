import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps } from '../entities'

const getSvgXmlData = (color: string) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><circle cx="201.5" cy="200.6" r="180" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/><line x1="201.5" y1="49.6" x2="201.5" y2="200.6" fill="none" stroke="#${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/><line x1="201.5" y1="200.6" x2="95.11" y2="306.49" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/></svg>`
  return svgXmlData
}

export const TimeIcon = ({ size = 24, color = 'black' }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color)} width={size} height={size} />
    </View>
  )
}
