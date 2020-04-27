import React from 'react'
import { SVGIcon } from '../SVGIcon'
import { IconProps, defaultSize, defaultColor, defaultWidth } from '../IconProps'

const getSvgXmlData = (color: string, width: number) => {
  const svgXmlData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="M94.7,327.6h38.41a31.31,31.31,0,0,0,22.12-9.16L337.14,136.52a31.26,31.26,0,0,0,0-44.23L298.29,53.44a31.26,31.26,0,0,0-44.23,0L71,236.55A31.3,31.3,0,0,0,61.81,260l1.64,37.65A31.28,31.28,0,0,0,94.7,327.6Z" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="${width}"/><line x1="248.6" y1="58.9" x2="315.07" y2="125.37" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="${width}"/><line x1="91.5" y1="359.6" x2="346.5" y2="359.6" fill="none" stroke="${color}" stroke-linecap="round" stroke-miterlimit="10" stroke-width="${width}"/><circle cx="62" cy="360.1" r="11" fill="${color}"/></svg>`
  return svgXmlData
}

export const EditIcon = ({ size = defaultSize, color = defaultColor, width = defaultWidth }: IconProps) => {
  return <SVGIcon xml={getSvgXmlData(color, width)} size={size} />
}
