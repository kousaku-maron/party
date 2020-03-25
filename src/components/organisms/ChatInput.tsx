import React, { useState, useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { MakeStyles, useStyles, useColors } from '../../services/design'
import { TextInput, Fab, ShadowBase } from '../atoms'
// import { FontAwesome } from '@expo/vector-icons'
import { Icons } from '../../@assets/vector-icons'

type Props = {
  width?: number
  height?: number
  fullWidth?: boolean
  onSend?: (text: string) => void
}

const tabHeight = 70

const ChatInput: React.FC<Props> = ({ width = 350, height = tabHeight, fullWidth = false, onSend }) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const [text, setText] = useState<string>('')

  const onSubmit = useCallback(() => {
    if (!onSend) return
    onSend(text)
    setText('')
  }, [onSend, text])

  return (
    <View
      style={[
        styles.container,
        {
          width: fullWidth ? '100%' : width,
          height,
          borderRadius: height / 2
        }
      ]}
    >
      <View style={styles.textInputWrapper}>
        <TextInput placeholder="Aa" value={text} onChangeText={text => setText(text)} fullWidth={true} />
      </View>
      <ShadowBase>
        <Fab onPress={onSubmit}>
          <Icons name="send-fill" size={25} color={colors.foregrounds.onTintPrimary} />
        </Fab>
      </ShadowBase>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.backgrounds.tertiary,
      padding: 10
    },
    textInputWrapper: {
      flex: 1,
      paddingRight: 10
    }
  })

export default ChatInput
