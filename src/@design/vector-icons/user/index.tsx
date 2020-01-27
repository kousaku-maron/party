import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps } from '../entities'

const getSvgXmlData = (color: string) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><title>アートボード 2 のコピー 10</title><circle cx="200.5" cy="200.5" r="180" fill="none" stroke="${color}" stroke-miterlimit="10" stroke-width="10"/><path d="M265.32,263.6a93.33,93.33,0,0,1-129.55,0" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="10"/></svg>`
  return svgXmlData
}

export const User = ({ size = 24, color = 'black' }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color)} width={size} height={size} />
    </View>
  )
}
