import React from 'react'
import {
  TextInput,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  StyleSheet,
  TextInputFocusEventData
} from 'react-native'
import { useColors, useStyles, MakeStyles } from '../../services/design'

type AutoCapitalizeOptions = 'none' | 'sentences' | 'words' | 'characters'

type Props = {
  value?: string
  placeholder?: string
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
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
}

const CustomTextInput: React.FC<Props> = ({
  value,
  placeholder,
  onFocus,
  onChangeText,
  onSubmitEditing,
  color,
  // disabled = false,
  fullWidth = false,
  width = 250,
  height = 50,
  maxLength = 524288, // MEMO: html input default max 524288
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  multiline = false
}) => {
  const colors = useColors()
  const styles = useStyles(makeStyles)

  return (
    <TextInput
      style={[
        styles.defaultInputStyle,
        {
          width: fullWidth ? '100%' : width,
          height,
          borderRadius: height / 2,
          color: color ?? colors.foregrounds.placeholder
        }
      ]}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={colors.foregrounds.placeholder}
      onFocus={onFocus}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      maxLength={maxLength}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
    />
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    defaultInputStyle: {
      fontSize: 14,
      backgroundColor: colors.system.gray6,
      padding: 10
    }
  })

export default CustomTextInput
