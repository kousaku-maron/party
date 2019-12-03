import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Bubble, BubbleProps, IMessage } from 'react-native-gifted-chat'
import { useStyles, MakeStyles } from '../../../services/design'
import { useColors } from '../../../services/design'
import { formattedDateForMessageCreatedAt } from '../../../services/formatedDate'

type CustomBubbleProps = { customParameter: { uid: string } }

export const CustomBubble = (
  props: Readonly<BubbleProps<IMessage>> &
    Readonly<{
      children?: React.ReactNode
    }> &
    CustomBubbleProps
) => {
  const { uid } = props.customParameter
  const styles = useStyles(makeStyles)
  const colors = useColors()

  return (
    <View style={props.currentMessage.user._id === uid ? styles.bubbleRightWrapper : styles.bubbleLeftWrapper}>
      {props.currentMessage.user._id !== uid && <Text style={styles.username}>{props.currentMessage.user.name}</Text>}
      <Bubble
        {...props}
        containerStyle={{
          left: { paddingTop: 3 },
          right: { paddingTop: 3 }
        }}
        containerToPreviousStyle={{ left: { borderTopLeftRadius: 15 }, right: { borderTopRightRadius: 15 } }}
        containerToNextStyle={{ left: { borderBottomLeftRadius: 15 }, right: { borderBottomRightRadius: 15 } }}
        wrapperStyle={{
          left: { backgroundColor: colors.backgrounds.secondary, padding: 3 },
          right: { backgroundColor: colors.tints.primary.light, padding: 3 }
        }}
        textStyle={{
          left: { color: colors.foregrounds.primary },
          right: { color: colors.foregrounds.onTintPrimary }
        }}
        renderTime={() => {
          return null
        }}
      />

      {/* 吹き出しの三角を表現 */}
      {props.currentMessage.user._id === uid ? (
        <View style={styles.rightTriangle} />
      ) : (
        <View style={styles.leftTriangle} />
      )}

      <View style={props.currentMessage.user._id !== uid ? styles.pinnedRight : styles.pinnedLeft}>
        <Text style={styles.createdAt}>{formattedDateForMessageCreatedAt(props.currentMessage.createdAt as Date)}</Text>
      </View>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    flex: {
      flex: 1
    },
    bubbleRightWrapper: {
      position: 'relative',
      maxWidth: '80%',
      paddingBottom: 6,
      paddingRight: 6
    },
    bubbleLeftWrapper: {
      position: 'relative',
      maxWidth: '80%',
      paddingBottom: 6
    },
    pinnedRight: {
      position: 'absolute',
      bottom: 12,
      right: 32
    },
    pinnedLeft: {
      position: 'absolute',
      bottom: 12,
      left: 32
    },
    username: {
      fontSize: 10.5,
      backgroundColor: 'transparent',
      color: colors.foregrounds.secondary
    },
    createdAt: {
      fontSize: 8,
      backgroundColor: 'transparent',
      color: colors.foregrounds.secondary
    },
    rightTriangle: {
      position: 'absolute',
      top: 12,
      right: -10 + 6,
      width: 0,
      height: 0,
      borderTopColor: colors.tints.primary.light,
      borderTopWidth: 16,
      borderBottomColor: 'transparent',
      borderBottomWidth: 16,
      borderRightColor: 'transparent',
      borderRightWidth: 16
    },
    leftTriangle: {
      position: 'absolute',
      top: 24,
      left: -10,
      width: 0,
      height: 0,
      borderTopColor: colors.backgrounds.secondary,
      borderTopWidth: 16,
      borderBottomColor: 'transparent',
      borderBottomWidth: 16,
      borderLeftColor: 'transparent',
      borderLeftWidth: 16
    }
  })
