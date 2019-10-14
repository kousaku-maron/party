import React from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'

type Props = {
  color?: string
  disabled?: boolean
  fullWidth?: boolean
  width?: number
  height?: number
  onPress?: (event: GestureResponderEvent) => void
}

const RoundedButton: React.FC<Props> = ({
  color = '#ededed',
  disabled = false,
  fullWidth = false,
  width,
  height,
  onPress,
  children
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: color,
          width: fullWidth ? '100%' : width,
          height,
          borderRadius: height ? height / 2 : 25
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
    flexDirection: 'row',
    padding: 12
  }
})

export default RoundedButton
