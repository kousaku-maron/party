import React from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'
import { getColors } from '../../services/design'

const colors = getColors()

type Props = {
  color?: string
  disabled?: boolean
  size?: number
  onPress?: (event: GestureResponderEvent) => void
}

const Fab: React.FC<Props> = ({
  color = colors.tints.primary.main,
  disabled = false,
  size = 48,
  onPress,
  children
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color, width: size, height: size, borderRadius: size / 2 }]}
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
    alignItems: 'center'
  }
})

export default Fab
