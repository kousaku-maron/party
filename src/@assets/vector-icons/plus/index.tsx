import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps } from '../entities'

const getSvgXmlData = (color: string) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><line x1="21" y1="200.1" x2="381" y2="200.1" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/><line x1="201" y1="20.1" x2="201" y2="380.1" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/></svg>`
  return svgXmlData
}

export const PlusIcon = ({ size = 24, color = 'black' }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color)} width={size} height={size} />
    </View>
  )
}
