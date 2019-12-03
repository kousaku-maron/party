import React from 'react'
import {
  TextInput,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  StyleSheet,
  Platform
} from 'react-native'
import { useColors } from '../../services/design'

type AutoCapitalizeOptions = 'none' | 'sentences' | 'words' | 'characters'

type Props = {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
  onEndEditing?: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  color?: string
  backgroundColor?: string
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
  placeholder,
  value,
  onChangeText,
  onSubmitEditing,
  onEndEditing,
  onFocus,
  color,
  backgroundColor,
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

  return (
    <TextInput
      style={[
        styles.defaultInputStyle,
        {
          width: fullWidth ? '100%' : width,
          height: height,
          color: color ?? colors.foregrounds.primary,
          backgroundColor: backgroundColor ?? colors.system.gray
        }
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      onEndEditing={onEndEditing}
      onFocus={onFocus}
      maxLength={maxLength}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
    />
  )
}

const styles = StyleSheet.create({
  defaultInputStyle: {
    borderRadius: Platform.OS === 'ios' ? 12 : 0,
    fontSize: 18,
    padding: 12
  }
})

export default CustomTextInput
