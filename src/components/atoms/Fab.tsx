import React from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'
import { useColors } from '../../services/design'

type Props = {
  color?: string
  disabled?: boolean
  size?: number
  onPress?: (event: GestureResponderEvent) => void
}

const Fab: React.FC<Props> = ({ color, disabled = false, size = 48, onPress, children }) => {
  const colors = useColors()
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: color ?? colors.tints.primary.main,
          width: size,
          height: size,
          borderRadius: size / 2
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
    alignItems: 'center'
  }
})

export default Fab
