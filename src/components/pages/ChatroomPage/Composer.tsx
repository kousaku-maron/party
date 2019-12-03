import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useStyles, MakeStyles, useColors } from '../../../services/design'
import { Composer, ComposerProps } from 'react-native-gifted-chat'

export const CustomComposer = (
  props: Readonly<ComposerProps> &
    Readonly<{
      children?: React.ReactNode
    }>
) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  return (
    <View style={styles.container}>
      <Composer
        {...props}
        textInputStyle={{
          borderRadius: 12,
          paddingLeft: 12,
          paddingRight: 12,
          backgroundColor: colors.backgrounds.tertiary,
          color: colors.foregrounds.primary
        }}
        placeholderTextColor={colors.foregrounds.placeholder}
      />
    </View>
  )
}

const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    container: { flex: 1, flexDirection: 'row' }
  })
