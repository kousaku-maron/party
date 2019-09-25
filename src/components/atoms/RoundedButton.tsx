import React from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'

type Props = {
  color?: string
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
}

const RoundedButton: React.FC<Props> = ({ color = '#ededed', disabled = false, onPress, children }) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: color }]} disabled={disabled} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 25
  }
})

export default RoundedButton
