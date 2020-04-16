import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground, ActivityIndicator } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel'
import { RouteParams } from '../navigators/RouteProps'
import { Fab, ShadowBase, BloomBase } from '../components/atoms'
import { SwipeCard, Header } from '../components/organisms'
import { ApplyCard } from '../entities'
import { useAuthState } from '../store/hooks'
import { getAppliedCardsByType } from '../repositories/appliedCard'
import { useStyles, MakeStyles, useColors } from '../services/design'
import { useLikeApplyCard } from '../services/likeApplyCard'
import { Icons } from './../@assets/vector-icons'

const SwipeCardScreen = () => {
  const inset = useSafeArea()
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const { uid } = useAuthState()
  const route = useRoute<RouteProp<RouteParams, 'SwipeCard'>>()
  const type = route.params.type as string

  const [cards, setCards] = useState<ApplyCard[]>([])
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  useEffect(() => {
    const asyncTask = async () => {
      const cards = await getAppliedCardsByType(uid, type)

      if (!cards) {
        setIsError(true)
      }

      if (cards) {
        setCards(cards)
      }

      setIsFetched(true)
    }

    asyncTask()
  }, [type, uid])

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
    async (item: ApplyCard, index: number) => {
      setCards(prev => [...prev.slice(0, index), ...prev.slice(index + 1, prev.length)]) // 押したカードを除外する。
      await likeApplyCard(item)
    },
    [likeApplyCard]
  )

  const renderItem = useCallback(
    ({ item, index }: { item: ApplyCard; index: number }) => {
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
                  onPressGlass(item, index)
                }}
              >
                <Icons name="glass-fill" size={56} color={colors.foregrounds.onTintPrimary} />
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

  if (isError) {
    return (
      <View style={[styles.container, { paddingTop: inset.top + 36 }]}>
        <View style={styles.headerContainer}>
          <Header fullWidth={true} tintColor={colors.foregrounds.onTintPrimary} />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>カードの取得に失敗しました</Text>
        </View>
      </View>
    )
  }

  if (!isFetched) {
    return (
      <View style={[styles.container, { paddingTop: inset.top + 36 }]}>
        <View style={styles.headerContainer}>
          <Header fullWidth={true} tintColor={colors.foregrounds.onTintPrimary} />
        </View>
        <View style={styles.messageContainer}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    )
  }

  if (isFetched && cards.length === 0) {
    return (
      <View style={[styles.container, { paddingTop: inset.top + 36 }]}>
        <View style={styles.headerContainer}>
          <Header fullWidth={true} tintColor={colors.foregrounds.onTintPrimary} />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>カードがありません</Text>
        </View>
      </View>
    )
  }

  return (
    <ImageBackground
      blurRadius={15}
      source={{ uri: backgroundURL }}
      style={[styles.container, { paddingTop: inset.top + 36 }]}
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
    messageContainer: {
      backgroundColor: colors.backgrounds.primary,
      width: '100%',
      height: 400,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
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
    },
    messageText: {
      fontSize: 16,
      color: colors.foregrounds.primary
    }
  })

export default SwipeCardScreen
