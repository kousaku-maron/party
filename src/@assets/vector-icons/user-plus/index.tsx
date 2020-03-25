import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps } from '../entities'

const getSvgXmlData = (color: string) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><line x1="290" y1="334" x2="381" y2="334" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/><line x1="335.5" y1="288.5" x2="335.5" y2="379.5" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/><path d="M286.3,358.77a179.88,179.88,0,1,1,73.12-73.67" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/><path d="M265.32,263.6a93.33,93.33,0,0,1-129.55,0" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/></svg>`
  return svgXmlData
}

export const UserPlusIcon = ({ size = 24, color = 'black' }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color)} width={size} height={size} />
    </View>
  )
}
