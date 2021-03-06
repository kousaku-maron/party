import React, { useCallback } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useStackNavigation } from '../../services/route'
import { Thumbnail } from '../atoms'
import { useStyles, MakeStyles } from '../../services/design'
import { ApplyCard } from '../../entities'

type Props = {
  card: ApplyCard
  height?: number
  width?: number
}

const SwipeCard: React.FC<Props> = ({ card, width = 320, height = 280 }) => {
  const styles = useStyles(makeStyles)
  const navigation = useStackNavigation()

  const onPressAvatar = useCallback(() => {
    navigation.push('User', { userID: card.organizerUID })
  }, [card.organizerUID, navigation])

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={[styles.avatarWrapper, { left: width / 2 - 42 }, styles.withShadow]}>
        <Thumbnail uri={card.members[0].thumbnailURL} size={82} onPress={onPressAvatar} />
      </View>

      <View style={styles.nameWrapper}>
        <Text style={styles.nameText}>{card.members[0].name}</Text>
      </View>

      <View style={styles.idWrapper}>
        <Text style={styles.idText}>@{card.members[0].userID}</Text>
      </View>

      <View style={styles.introWrapper}>
        <Text style={styles.introText}>
          自己紹介分、サンプル。私の趣味はボルダリングです！運動も飲みも好きなので、あそびましょー。
        </Text>
      </View>

      <View style={styles.numberWrapper}>
        <Text style={styles.numberText}>2〜3人で参加したい</Text>
      </View>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      borderRadius: 20,
      paddingTop: 70,
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: colors.backgrounds.secondary
    },
    avatarWrapper: {
      position: 'absolute',
      top: -42
    },
    nameWrapper: {
      paddingBottom: 3
    },
    idWrapper: {
      paddingBottom: 24
    },
    introWrapper: {
      width: '60%',
      paddingBottom: 24
    },
    numberWrapper: {
      paddingBottom: 56
    },
    nameText: {
      fontSize: 18,
      color: colors.foregrounds.primary
    },
    idText: {
      fontSize: 12,
      color: colors.foregrounds.secondary
    },
    introText: {
      fontSize: 14,
      color: colors.foregrounds.secondary,
      textAlign: 'center'
    },
    numberText: {
      fontSize: 20,
      color: colors.tints.primary.main
    },
    withShadow: {
      shadowColor: 'black', // どうしよう
      shadowOffset: {
        width: 2,
        height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      elevation: 4
    }
  })

export default SwipeCard
