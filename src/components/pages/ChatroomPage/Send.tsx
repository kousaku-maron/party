import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Send, SendProps } from 'react-native-gifted-chat'
import { useStyles, MakeStyles, useColors } from '../../../services/design'
import { RoundedButton } from '../../atoms'

export const CustomSend = (
  props: Readonly<SendProps> &
    Readonly<{
      children?: React.ReactNode
    }>
) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  return (
    <Send {...props}>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          onPress={() => props.onSend({ text: props.text }, true)}
          color={colors.tints.primary.main}
          fullWidth={true}
        >
          <Text style={styles.text}>送る</Text>
        </RoundedButton>
      </View>
    </Send>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    buttonWrapper: {
      width: 90,
      height: '100%',
      paddingTop: 3,
      paddingBottom: 3,
      paddingRight: 12,
      paddingLeft: 12
    },
    text: {
      color: colors.foregrounds.onTintPrimary
    }
  })
