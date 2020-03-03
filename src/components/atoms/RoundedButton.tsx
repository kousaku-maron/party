import React, { useMemo } from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'
import { useColors } from '../../services/design'

type Props = {
  color?: string
  inactiveColor?: string
  disabled?: boolean
  fullWidth?: boolean
  width?: number
  height?: number
  onPress?: (event: GestureResponderEvent) => void
  padding?: number
  outlined?: boolean
}

const RoundedButton: React.FC<Props> = ({
  color,
  inactiveColor,
  disabled = false,
  fullWidth = false,
  width,
  height,
  onPress,
  children,
  padding = 12,
  outlined = false
}) => {
  const colors = useColors()

  const _color = useMemo(() => {
    if (color) {
      return color
    }
    return colors.tints.primary.main
  }, [color, colors.tints.primary.main])

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
          ...(!outlined && { backgroundColor: disabled ? _inactiveColor : _color }),
          ...(outlined && { borderColor: disabled ? _inactiveColor : _color, borderWidth: 1 }),
          width: fullWidth ? '100%' : width,
          height,
          borderRadius: height ? height / 2 : 25,
          padding: padding
        }
      ]}
      disabled={disabled}
      onPress={onPress}
    >
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

export default RoundedButton
