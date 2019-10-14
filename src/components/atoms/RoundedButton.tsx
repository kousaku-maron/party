import React from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'

type Props = {
  color?: string
  disabled?: boolean
  fullWidth?: boolean
  width?: number
  height?: number
  onPress?: (event: GestureResponderEvent) => void
  padding?: number
  margin?: number
}

const RoundedButton: React.FC<Props> = ({
  color = '#ededed',
  disabled = false,
  fullWidth = false,
  width,
  height,
  onPress,
  children,
  padding = 12,
  margin = 0
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: color,
          width: fullWidth ? '100%' : width,
          height,
          borderRadius: height ? height / 2 : 25,
          padding: padding,
          margin: margin
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
