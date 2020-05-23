import React from 'react'
import { SVGIcon } from '../SVGIcon'
import { IconProps, defaultSize, defaultColor, defaultWidth } from '../IconProps'

const getSvgXmlData = (color: string, width: number) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="M71.91,303.11A30,30,0,0,1,60.5,279.6V48.6a30.09,30.09,0,0,1,30-30h140a30.09,30.09,0,0,1,30,30v5" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="${width}"/><rect x="119.5" y="77.6" width="200" height="291" rx="30" stroke-width="${width}" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" transform="translate(45.41 -36.99) rotate(10.74)"/></svg>`
  return svgXmlData
}

export const CardIcon = ({ size = defaultSize, color = defaultColor, width = defaultWidth }: IconProps) => {
  return <SVGIcon xml={getSvgXmlData(color, width)} size={size} />
}
