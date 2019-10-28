import React from 'react'
import {
  TextInput,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  StyleSheet
} from 'react-native'
import { useColors } from '../../services/design'

type AutoCapitalizeOptions = 'none' | 'sentences' | 'words' | 'characters'

type Props = {
  value?: string
  onChangeText?: (text: string) => void
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
  color?: string
  borderColor?: string
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
  onChangeText,
  onSubmitEditing,
  color,
  borderColor,
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
          borderColor: borderColor ? borderColor : colors.foregrounds.primary,
          color: color ? color : colors.foregrounds.primary
        }
      ]}
      value={value}
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

const styles = StyleSheet.create({
  defaultInputStyle: {
    borderBottomWidth: 1,
    fontSize: 18
  }
})

export default CustomTextInput
