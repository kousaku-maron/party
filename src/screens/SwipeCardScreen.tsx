import React, { useCallback, useState, useMemo } from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RouteParams } from '../navigators/RouteProps'
import { Fab } from '../components/atoms'
import { SwipeCard } from '../components/organisms'
import { ApplyCard } from '../entities'
import { useStyles, MakeStyles, useColors } from '../services/design'
import { useAppliedCardsByType } from '../services/applyCard'
import { useLikeApplyCard } from '../services/likeApplyCard'

const SwipeCardScreen = () => {
  const inset = useSafeArea()
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const route = useRoute<RouteProp<RouteParams, 'SwipeCard'>>()
  const type = route.params.type as string

  const cards = useAppliedCardsByType(type)

  const [slideIndex, setSlideIndex] = useState<number>(0)

  const backgroundURL = useMemo(() => {
    if (cards.length === 0) {
      return undefined
    }

    return cards[slideIndex].party.thumbnailURL
  }, [cards, slideIndex])

  const title = useMemo(() => {
    if (cards.length === 0) {
      return undefined
    }

    return cards[slideIndex].party.name
  }, [cards, slideIndex])

  const { likeApplyCard } = useLikeApplyCard()
  const onPressGlass = useCallback(
    item => {
      likeApplyCard(item)
    },
    [likeApplyCard]
  )

  const renderItem = useCallback(
    ({ item }: { item: ApplyCard }) => {
      return (
        <View style={styles.cardContainer}>
          <View style={styles.withShadow}>
            <SwipeCard card={item} />
          </View>
          <View style={[styles.fabWrapper, styles.withBloom, { left: 320 / 2 - 40 }]}>
            <Fab
              size={80}
              onPress={() => {
                onPressGlass(item)
              }}
            >
              <MaterialCommunityIcons name="glass-wine" size={56} color={colors.foregrounds.onTintPrimary} />
            </Fab>
          </View>
        </View>
      )
    },
    [
      colors.foregrounds.onTintPrimary,
      onPressGlass,
      styles.cardContainer,
      styles.fabWrapper,
      styles.withBloom,
      styles.withShadow
    ]
  )

  const onSnapToItem = useCallback((slideIndex: number) => {
    setSlideIndex(slideIndex)
  }, [])

  return (
    <ImageBackground
      blurRadius={15}
      source={{ uri: backgroundURL }}
      style={[styles.container, { paddingTop: inset.top }]}
    >
      <View style={styles.inner}>
        <View style={styles.titleTextWrapper}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.areaText}>東京エリア</Text>
        </View>

        <Carousel
          data={cards}
          renderItem={renderItem}
          onSnapToItem={onSnapToItem}
          itemWidth={320}
          activeSlideAlignment={'center'}
          sliderWidth={Dimensions.get('window').width}
          slideStyle={{ marginTop: Dimensions.get('window').height * 0.3 }}
          inactiveSlideOpacity={0.6}
        />
      </View>
    </ImageBackground>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgrounds.primary,
      width: '100%',
      height: '100%'
    },
    inner: {},
    cardContainer: {
      position: 'relative',
      paddingBottom: 50 // fabが見切れるため、50px余白をもたせている。
    },
    fabWrapper: {
      position: 'absolute',
      bottom: 10
    },
    titleTextWrapper: {
      paddingTop: Dimensions.get('window').height * 0.2,
      display: 'flex',
      alignItems: 'center'
    },
    titleText: {
      fontSize: 24,
      color: colors.foregrounds.onTintPrimary
    },
    areaText: {
      fontSize: 20,
      color: colors.foregrounds.onTintPrimary
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
    },
    withBloom: {
      shadowColor: colors.tints.primary.main,
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowRadius: 8,
      shadowOpacity: 1,
      elevation: 8
    }
  })

export default SwipeCardScreen
