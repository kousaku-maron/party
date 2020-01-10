import React, { useMemo } from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'
import { useColors } from '../../services/design'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  color?: string
  inactiveColor?: string
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
  padding?: number
}

const CirclePlusFab: React.FC<Props> = ({ color, inactiveColor, disabled = false, onPress, children }) => {
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
          shadowOffset: { width: 1, height: 1 },
          shadowColor: colors.foregrounds.primary,
          shadowOpacity: 0.3
        }
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <AntDesign name="plus" size={32} color={colors.tints.primary.light} style={{ justifyContent: 'center' }} />
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
  }
})

export default CirclePlusFab
