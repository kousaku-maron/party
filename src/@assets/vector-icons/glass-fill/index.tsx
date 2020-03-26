import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps, defaultSize, defaultColor, defaultWidth } from '../entities'

const getSvgXmlData = (color: string, width: number) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><line x1="113.76" y1="216.07" x2="113.76" y2="279.24" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-width="${width}"/><line x1="76.37" y1="279.24" x2="152.48" y2="279.24" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-width="${width}"/><path d="M50.58,133.12c0,45.81,28.29,82.95,63.18,82.95s63.18-37.14,63.18-82.95c0-23.58-7.53-44.81-19.56-59.91H70.14C58.11,88.31,50.58,109.54,50.58,133.12Z" fill="${color}"/><line x1="292.51" y1="254.97" x2="312.73" y2="314.82" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-width="${width}"/><line x1="277.31" y1="326.79" x2="349.42" y2="302.43" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-width="${width}"/><path d="M206.11,196.61c14.66,43.4,53.34,69.53,86.4,58.36s48-55.41,33.3-98.81c-7.54-22.33-21.47-40-37.7-50.49l-82.65,27.92C198.9,151.75,198.56,174.27,206.11,196.61Z" fill="${color}"/></svg>`

  return svgXmlData
}

export const GlassFillIcon = ({ size = defaultSize, color = defaultColor, width = defaultWidth }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color, width)} width={size} height={size} />
    </View>
  )
}
