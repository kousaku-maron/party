import React from 'react'
import { View, Text, Animated, StyleSheet, Dimensions } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStyles, MakeStyles } from '../../../services/design'
import { useSwipeApplyCard } from '../../../services/applyCard'
import { useAuthState } from '../../../store/hooks'
import { Thumbnail } from '../../atoms'
import { ApplyCard } from '../../../entities'

const showAvatarCount = 3

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const TOP_SPACE = 60
const BOTTOM_SPACE = 120
const HORIZON_SPACE = 24

type Props = {
  card: ApplyCard
  swipeable?: boolean
}

export const SwipeCardSection = ({ card, swipeable = false }: Props) => {
  const { uid } = useAuthState()
  const styles = useStyles(makeStyles)
  const insets = useSafeArea()
  const { panHandlers, targetStyle } = useSwipeApplyCard(uid, card)

  if (swipeable) {
    return (
      <Animated.View
        {...panHandlers}
        style={[targetStyle, styles.cardWrapper, { height: SCREEN_HEIGHT - 98 - insets.top }]}
      >
        <View style={[styles.card, { height: SCREEN_HEIGHT - TOP_SPACE - BOTTOM_SPACE - 98 - insets.top }]}>
          <View style={styles.cardHeader}>
            <View style={styles.thumnails}>
              {card.members.slice(0, showAvatarCount).map((user, index) => (
                <View key={user.uid} style={index === 0 ? styles.thumbnailWrapper : styles.subThumbnailWrapper}>
                  <Thumbnail size={96} uri={user.thumbnailURL} />
                </View>
              ))}

              {card.members.length > showAvatarCount && (
                <View style={styles.hiddenAvatarCountWrapper}>
                  <View style={styles.hiddenAvatarCount}>
                    <Text style={styles.hiddenAvatarCountText}>+{card.members.length - showAvatarCount}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.cardBody}>
            {/* TODO: partyの情報を`ApplyCard`作成時に保存、もしくはfetchしてパーティー情報を載せる */}
            <View style={styles.bodyTitleTextWrapper}>
              <Text style={styles.bodyTitleText}>パーティー[{card.partyID}]</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    )
  }

  return (
    <Animated.View style={[styles.cardWrapper, { height: SCREEN_HEIGHT - 98 - insets.top }]}>
      <View style={[styles.card, { height: SCREEN_HEIGHT - TOP_SPACE - BOTTOM_SPACE - 98 - insets.top }]}>
        <View style={styles.cardHeader}>
          <View style={styles.thumnails}>
            {card.members.slice(0, showAvatarCount).map((user, index) => (
              <View key={user.uid} style={index === 0 ? styles.thumbnailWrapper : styles.subThumbnailWrapper}>
                <Thumbnail size={96} uri={user.thumbnailURL} />
              </View>
            ))}

            {card.members.length > showAvatarCount && (
              <View style={styles.hiddenAvatarCountWrapper}>
                <View style={styles.hiddenAvatarCount}>
                  <Text style={styles.hiddenAvatarCountText}>+{card.members.length - showAvatarCount}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
        <View style={styles.cardBody}>
          {/* TODO: partyの情報を`ApplyCard`作成時に保存、もしくはfetchしてパーティー情報を載せる */}
          <View style={styles.bodyTitleTextWrapper}>
            <Text style={styles.bodyTitleText}>パーティー[{card.partyID}]</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    cardWrapper: {
      position: 'absolute',
      display: 'flex',
      paddingTop: TOP_SPACE,
      paddingBottom: BOTTOM_SPACE,
      paddingHorizontal: HORIZON_SPACE
    },
    card: {
      width: SCREEN_WIDTH - HORIZON_SPACE * 2,
      borderRadius: 20,
      backgroundColor: colors.backgrounds.secondary
    },
    cardHeader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    cardBody: {
      height: 100,
      alignItems: 'center'
    },
    thumnails: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    thumbnailWrapper: {},
    subThumbnailWrapper: {
      marginLeft: -16
    },
    bodyTitleTextWrapper: {
      paddingBottom: 16
    },
    hiddenAvatarCountWrapper: {
      marginLeft: -96
    },
    hiddenAvatarCount: {
      display: 'flex',
      width: 96,
      height: 96,
      borderRadius: 48,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.foregrounds.placeholder
    },
    hiddenAvatarCountText: {
      fontSize: 24,
      color: colors.foregrounds.primary
    },
    bodyTitleText: {
      fontSize: 18,
      color: colors.foregrounds.primary
    },
    bodyText: {
      fontSize: 14,
      color: colors.foregrounds.primary
    }
  })
