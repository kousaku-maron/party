import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useStyles, MakeStyles } from '../../services/design'
import { Ionicons } from '@expo/vector-icons'

type AutoCapitalizeOptions = 'none' | 'sentences' | 'words' | 'characters'

type Props = {
  label?: string
  value?: string
  onPress?: () => void
  disabled?: boolean
  fullWidth?: boolean
  width?: number
  height?: number
}

const SelectField = ({ label, value, onPress, disabled = false, width = 250, height = 50, fullWidth }: Props) => {
  const styles = useStyles(makeStyles)

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, { width: fullWidth ? '100%' : width }]}
    >
      <View style={styles.head}>
        {label && (
          <View style={styles.labelTextWrapper}>
            <Text style={styles.labelText}>{label}</Text>
          </View>
        )}
        <View style={[styles.valueTextWrapper, { height }]}>
          <Text style={styles.valueText}>{value}</Text>
        </View>
      </View>

      <View style={[styles.tail, { height: 16 + height }]}>
        <Ionicons name="ios-arrow-forward" size={14} />
      </View>
    </TouchableOpacity>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    head: {
      display: 'flex',
      flexDirection: 'column'
    },
    tail: {
      display: 'flex',
      justifyContent: 'center'
    },
    labelTextWrapper: {},
    valueTextWrapper: {
      display: 'flex',
      justifyContent: 'center'
    },
    labelText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.foregrounds.primary
    },
    valueText: {
      fontSize: 14,
      color: colors.foregrounds.placeholder
    }
  })

export default SelectField
