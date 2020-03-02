import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { MakeStyles, useStyles } from '../../services/design'

type Props = {
  intensity?: 1 | 2 | 3
}

const ShadowBase: React.FC<Props> = ({ intensity = 1, children }) => {
  const styles = useStyles(makeStyles)

  const shadowRadius = useMemo(() => {
    if (intensity === 1) {
      return 24
    }
    if (intensity === 2) {
      return 12
    }
    if (intensity === 3) {
      return 6
    }

    return 24
  }, [intensity])

  return <View style={[styles.withShadow, { shadowRadius, elevation: shadowRadius }]}>{children}</View>
}
const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    withShadow: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 3,
        height: 3
      },
      shadowOpacity: 0.16
    }
  })

export default ShadowBase
