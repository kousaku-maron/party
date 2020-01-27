import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps } from '../entities'

const getSvgXmlData = (color: string) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><title>アートボード 2 のコピー 2</title><path d="M170.68,39.1h60.39A149.93,149.93,0,0,1,381,189v20.14A149.93,149.93,0,0,1,231.07,359.1H20.75a0,0,0,0,1,0,0V189A149.93,149.93,0,0,1,170.68,39.1Z" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="10"/><line x1="118.02" y1="166.28" x2="283.73" y2="166.28" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="10"/><line x1="118.02" y1="231.92" x2="197.27" y2="231.92" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="10"/></svg>`
  return svgXmlData
}

export const Chat = ({ size = 24, color = 'black' }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color)} width={size} height={size} />
    </View>
  )
}
