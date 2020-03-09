import React from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet, View } from 'react-native'
import { useColors, useStyles, MakeStyles } from '../../services/design'

type Props = {
  color?: string
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
  position?: 'right' | 'left'
}

const Bubble: React.FC<Props> = ({ color, disabled = false, onPress, position = 'right', children }) => {
  const colors = useColors()
  const styles = useStyles(makeStyles)

  if (disabled || !onPress) {
    return (
      <View
        style={[
          position === 'right' ? styles.rightContainer : styles.leftContainer,
          { backgroundColor: color ?? colors.tints.primary.main }
        ]}
      >
        {children}
      </View>
    )
  }

  return (
    <TouchableOpacity
      style={[
        position === 'right' ? styles.rightContainer : styles.leftContainer,
        { backgroundColor: color ?? colors.tints.primary.main }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  )
}

const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    rightContainer: {
      padding: 20,
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20
    },
    leftContainer: {
      padding: 20,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20
    }
  })

export default Bubble
