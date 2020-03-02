import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { MakeStyles, useStyles, useColors } from '../../services/design'

type Props = {
  color?: string
  intensity?: 1 | 2 | 3
}

const BloomBase: React.FC<Props> = ({ intensity = 3, color, children }) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const shadowRadius = useMemo(() => {
    if (intensity === 1) {
      return 6
    }
    if (intensity === 2) {
      return 12
    }
    if (intensity === 3) {
      return 24
    }

    return 24
  }, [intensity])

  return (
    <View
      style={
        (styles.withShadow, { shadowColor: color ?? colors.tints.primary.main, shadowRadius, elevation: shadowRadius })
      }
    >
      {children}
    </View>
  )
}
const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    withBloom: {
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 1
    }
  })

export default BloomBase
