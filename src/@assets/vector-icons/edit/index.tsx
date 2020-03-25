import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps } from '../entities'

const getSvgXmlData = (color: string) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="M75,327.6h66.61a10.73,10.73,0,0,0,7.58-3.14L351.68,122a10.71,10.71,0,0,0,0-15.16L283.76,38.9a10.73,10.73,0,0,0-15.16,0l-204,204a10.72,10.72,0,0,0-3.13,8l2.89,66.35A10.72,10.72,0,0,0,75,327.6Z" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/><line x1="248.6" y1="58.9" x2="315.07" y2="125.37" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/><line x1="61.5" y1="359.6" x2="350.5" y2="359.6" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="17.01"/></svg>`
  return svgXmlData
}

export const EditIcon = ({ size = 24, color = 'black' }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color)} width={size} height={size} />
    </View>
  )
}
