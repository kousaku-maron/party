import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Send, SendProps } from 'react-native-gifted-chat'
import { useStyles, MakeStyles, useColors } from '../../../services/design'
import { RoundedButton } from '../../atoms'
import { FontAwesome } from '@expo/vector-icons'

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
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <RoundedButton
            onPress={() => props.onSend({ text: props.text }, true)}
            color={colors.tints.primary.main}
            fullWidth={true}
            padding={10}
          >
            <FontAwesome name="send" color={colors.foregrounds.onTintPrimary} size={14} />
          </RoundedButton>
        </View>
      </View>
    </Send>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      paddingTop: 5,
      paddingBottom: 5,
      paddingRight: 12,
      paddingLeft: 12
    },
    buttonWrapper: {
      width: 65,
      height: '100%'
    },
    text: {
      color: colors.foregrounds.onTintPrimary
    }
  })
