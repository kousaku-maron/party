import React from 'react'
import { SVGIcon } from '../SVGIcon'
import { IconProps, defaultSize, defaultColor, defaultWidth } from '../IconProps'

const getSvgXmlData = (color: string, width: number) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><line x1="257" y1="334.1" x2="348" y2="334.1" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="${width}"/><line x1="302.5" y1="288.6" x2="302.5" y2="379.6" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="${width}"/><path d="M71.91,303.11A30,30,0,0,1,60.5,279.6V48.6a30.09,30.09,0,0,1,30-30h140a30.09,30.09,0,0,1,30,30v5" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="${width}"/><path d="M244.11,375.86,123.62,353a30.09,30.09,0,0,1-23.89-35.07L142.77,91a30.09,30.09,0,0,1,35.07-23.88L315.38,93.19a30.09,30.09,0,0,1,23.89,35.07L316,251.22" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="${width}"/></svg>`
  return svgXmlData
}

export const CardPlusIcon = ({ size = defaultSize, color = defaultColor, width = defaultWidth }: IconProps) => {
  return <SVGIcon xml={getSvgXmlData(color, width)} size={size} />
}
