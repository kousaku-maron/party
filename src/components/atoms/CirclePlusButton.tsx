import React, { useMemo } from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet, View } from 'react-native'
import { useColors } from '../../services/design'

type Props = {
  color?: string
  inactiveColor?: string
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
  padding?: number
}

const CirclePlusButton: React.FC<Props> = ({
  color,
  inactiveColor,
  disabled = false,
  onPress,
  children,
  padding = 12
}) => {
  const colors = useColors()

  const _color = useMemo(() => {
    if (color) {
      return color
    }
    return colors.backgrounds.tertiary
  }, [color, colors.backgrounds.tertiary])

  const _inactiveColor = useMemo(() => {
    if (inactiveColor) {
      return inactiveColor
    }
    return colors.system.gray
  }, [colors.system.gray, inactiveColor])

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: disabled ? _inactiveColor : _color,
          width: 48,
          height: 48,
          borderRadius: 24,
          padding: padding,
          shadowOffset: { width: 1, height: 1 },
          shadowColor: colors.foregrounds.primary,
          shadowOpacity: 0.3
        }
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <View
        style={[
          styles.verticalLine,
          {
            backgroundColor: colors.tints.primary.light
          }
        ]}
      />
      <View
        style={[
          styles.horizontalLine,
          {
            backgroundColor: colors.tints.primary.light
          }
        ]}
      />
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  verticalLine: {
    height: 6,
    width: 32
  },
  horizontalLine: {
    height: 32,
    width: 6,
    position: 'absolute'
  }
})

export default CirclePlusButton
