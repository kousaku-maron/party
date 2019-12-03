import React from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'
import { useColors } from '../../services/design'

type Props = {
  color?: string
  disabled?: boolean
  fullWidth?: boolean
  width?: number
  height?: number
  onPress?: (event: GestureResponderEvent) => void
  padding?: number
}

const AngularedButton: React.FC<Props> = ({
  color,
  disabled = false,
  fullWidth = false,
  width,
  height,
  onPress,
  children,
  padding = 12
}) => {
  const colors = useColors()

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: color ?? colors.tints.primary.main,
          width: fullWidth ? '100%' : width,
          height,
          padding
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

export default AngularedButton
