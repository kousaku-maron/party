import React, { useCallback, useState, useMemo } from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RouteParams } from '../navigators/RouteProps'
import { Fab, ShadowBase, BloomBase } from '../components/atoms'
import { SwipeCard, Header } from '../components/organisms'
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
          <ShadowBase>
            <SwipeCard card={item} />
          </ShadowBase>
          <View style={[styles.fabWrapper, { left: 320 / 2 - 40 }]}>
            <BloomBase>
              <Fab
                size={80}
                onPress={() => {
                  onPressGlass(item)
                }}
              >
                <MaterialCommunityIcons name="glass-wine" size={56} color={colors.foregrounds.onTintPrimary} />
              </Fab>
            </BloomBase>
          </View>
        </View>
      )
    },
    [colors.foregrounds.onTintPrimary, onPressGlass, styles.cardContainer, styles.fabWrapper]
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
      <View style={styles.headerContainer}>
        <Header fullWidth={true} tintColor={colors.foregrounds.onTintPrimary} />
      </View>

      <View style={styles.inner}>
        <View style={styles.titleTextWrapper}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.areaText}>東京エリア</Text>
        </View>

        <View style={[styles.swipeArea, { paddingBottom: inset.bottom + 48 }]}>
          <Carousel
            data={cards}
            renderItem={renderItem}
            onSnapToItem={onSnapToItem}
            itemWidth={320}
            activeSlideAlignment={'center'}
            sliderWidth={Dimensions.get('window').width}
            inactiveSlideOpacity={0.6}
          />
        </View>
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
    headerContainer: {
      width: '100%',
      paddingHorizontal: 24
    },
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      height: '100%'
    },
    swipeArea: {},
    cardContainer: {
      position: 'relative',
      paddingTop: 50, // thumbnailが見切れるため、50px余白をもたせている。
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
    }
  })

export default SwipeCardScreen
