import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { useColors, MakeStyles, useStyles } from '../../services/design'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  color?: string
  inactiveColor?: string
  disabled?: boolean
  onPress?: () => void
  padding?: number
  size: number
}

const AddFab: React.FC<Props> = ({ color, disabled = false, onPress, children, size = 56 }) => {
  const colors = useColors()
  const styles = useStyles(makeStyles)

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
      <AntDesign name="plus" size={size - 16} style={[styles.antDesign]} />
      {children}
    </TouchableOpacity>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    antDesign: {
      color: colors.foregrounds.onTintPrimary,
      justifyContent: 'center'
    }
  })

export default AddFab
