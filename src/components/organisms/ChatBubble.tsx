import React, { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useStyles, MakeStyles, useColors } from '../../services/design'
import { Bubble, Thumbnail } from '../atoms'
import { Message, User } from '../../entities'

type Props = {
  message: Message
  isMy?: boolean
  onPressAvatar?: (user: User) => void
}

const ChatBubble = ({ message, isMy = true, onPressAvatar }: Props) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const onPressCustomAvatar = useCallback(() => {
    if (onPressAvatar && message.user) {
      onPressAvatar(message.user)
    }
  }, [message.user, onPressAvatar])

  return (
    <View style={styles.column}>
      {!isMy && (
        <View style={styles.thumbnailWrapper}>
          <Thumbnail size={55} uri={message.user?.thumbnailURL} onPress={onPressCustomAvatar} />
        </View>
      )}
      <View style={styles.bubbleContainer}>
        {!isMy && (
          <View style={styles.nameWrapper}>
            <Text style={styles.nameText}>{message.user?.name}</Text>
          </View>
        )}
        <Bubble
          position={isMy ? 'right' : 'left'}
          color={isMy ? colors.tints.primary.main : colors.backgrounds.secondary}
        >
          <Text
            style={[
              styles.messageText,
              { color: isMy ? colors.foregrounds.onTintPrimary : colors.foregrounds.primary }
            ]}
          >
            {message.text}
          </Text>
        </Bubble>
      </View>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    column: {
      display: 'flex',
      flexDirection: 'row'
    },
    bubbleContainer: {
      maxWidth: 280
    },
    thumbnailWrapper: {
      paddingRight: 10
    },
    nameWrapper: {
      paddingBottom: 10
    },
    nameText: {
      fontSize: 16,
      color: colors.foregrounds.primary
    },
    messageText: {
      fontSize: 12
    }
  })

export default ChatBubble
