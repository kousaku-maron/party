import React from 'react'
import { View } from 'react-native'
import SvgUri from 'react-native-svg-uri'
import { IconProps } from '../entities'

const getSvgXmlData = (color: string) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="M359.37,78.12l-318.29,30a11.47,11.47,0,0,0-5.69,20.67l107.88,78.9a11.47,11.47,0,0,1,4.66,8.26l11.62,132.9a11.46,11.46,0,0,0,20.66,5.78L369.69,96.31A11.46,11.46,0,0,0,359.37,78.12Z" fill="none" stroke="${color}" stroke-miterlimit="10" stroke-width="17.01"/></svg>`
  return svgXmlData
}

export const SendIcon = ({ size = 24, color = 'black' }: IconProps) => {
  return (
    <View>
      <SvgUri svgXmlData={getSvgXmlData(color)} width={size} height={size} />
    </View>
  )
}
