import React from 'react'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'

type SVGIconProps = {
  xml: string
  size: number
}

export const SVGIcon = ({ xml, size }: SVGIconProps) => {
  return (
    <View>
      <SvgXml xml={xml} width={size} height={size} />
    </View>
  )
}
