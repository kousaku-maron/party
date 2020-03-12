import React from 'react'
import {
  View,
  Text,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  StyleSheet
} from 'react-native'
import { TextInput } from '../atoms'
import { useStyles, MakeStyles } from '../../services/design'

type AutoCapitalizeOptions = 'none' | 'sentences' | 'words' | 'characters'

type Props = {
  label?: string
  value?: string
  onChangeText?: (text: string) => void
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
  color?: string
  // disabled?: boolean
  fullWidth?: boolean
  width?: number
  height?: number
  maxLength?: number
  keyboardType?: KeyboardTypeOptions
  secureTextEntry?: boolean
  autoCapitalize?: AutoCapitalizeOptions
  multiline?: boolean
  numberOfLines?: number
}

const TextField = ({ label, width = 250, fullWidth, ...others }: Props) => {
  const styles = useStyles(makeStyles)

  return (
    <View style={[styles.container, { width: fullWidth ? '100%' : width }]}>
      {label && (
        <View style={styles.labelTextWrapper}>
          <Text style={styles.labelText}>{label}</Text>
        </View>
      )}
      <TextInput {...others} fullWidth={true} />
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    labelTextWrapper: {
      paddingBottom: 10
    },
    labelText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.foregrounds.primary
    }
  })

export default TextField
