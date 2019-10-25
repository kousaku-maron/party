import React from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'
import { colors } from '../../themes'

type Props = {
  color?: string
  inactiveColor?: string
  disabled?: boolean
  fullWidth?: boolean
  width?: number
  height?: number
  onPress?: (event: GestureResponderEvent) => void
  padding?: number
}

const RoundedButton: React.FC<Props> = ({
  color = colors.tints.primary.main,
  inactiveColor = colors.system.gray,
  disabled = false,
  fullWidth = false,
  width,
  height,
  onPress,
  children,
  padding = 12
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: disabled ? inactiveColor : color,
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
