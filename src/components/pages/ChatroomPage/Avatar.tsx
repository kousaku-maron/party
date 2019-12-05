import React, { useCallback } from 'react'
import { Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Image as CacheImage } from 'react-native-expo-image-cache'
import { Avatar, AvatarProps, IMessage } from 'react-native-gifted-chat'
import { useStyles, MakeStyles } from '../../../services/design'

type RenderAvatarProps = Pick<
  AvatarProps<IMessage>,
  | 'renderAvatarOnTop'
  | 'showAvatarForEveryMessage'
  | 'position'
  | 'currentMessage'
  | 'previousMessage'
  | 'nextMessage'
  | 'onPressAvatar'
  | 'onLongPressAvatar'
  | 'containerStyle'
  | 'imageStyle'
>

export const CustomAvatar = (
  props: Readonly<AvatarProps<IMessage>> &
    Readonly<{
      children?: React.ReactNode
    }>
) => {
  const styles = useStyles(makeStyles)

  const renderAvatar = useCallback(
    (props: RenderAvatarProps) => {
      const {
        currentMessage: { user, system },
        onPressAvatar
      } = props

      if (user?.avatar && typeof user.avatar === 'string') {
        return (
          <TouchableOpacity
            onPress={() => {
              if (onPressAvatar && !system) {
                onPressAvatar(user)
              }
            }}
          >
            <CacheImage style={styles.avatar} {...{ uri: user.avatar }} />
          </TouchableOpacity>
        )
      }

      if (user?.avatar && typeof user.avatar === 'function') {
        return user.avatar([styles.avatar])
      }

      if (user?.avatar && typeof user.avatar === 'number') {
        return (
          <TouchableOpacity
            onPress={() => {
              if (onPressAvatar && !system) {
                onPressAvatar(user)
              }
            }}
          >
            <Image source={user.avatar} style={styles.avatar} />
          </TouchableOpacity>
        )
      }

      return null
    },
    [styles.avatar]
  )

  return <Avatar {...props} renderAvatar={renderAvatar} />
}

const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    avatar: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 40,
      height: 40,
      borderRadius: 20
    }
  })
