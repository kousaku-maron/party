import React from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'
import { useColors } from '../../services/design'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  color?: string
  inactiveColor?: string
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
  padding?: number
  size: number
}

const AddFab: React.FC<Props> = ({ color, disabled = false, onPress, children, size = 56 }) => {
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
      <AntDesign
        style={[
          {
            name: 'plus',
            size: size - 16,
            color: colors.foregrounds.onTintPrimary,
            style: { justifyContent: 'center' }
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
    alignItems: 'center'
  }
})

export default AddFab
