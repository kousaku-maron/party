import React, { useCallback } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
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

const SwipeCardScreen = () => {
  const inset = useSafeArea()
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const route = useRoute<RouteProp<RouteParams, 'SwipeCard'>>()
  const type = route.params.type as string

  const cards = useAppliedCardsByType(type)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onPressGlass = useCallback(() => {
    console.info('push glass button!')
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: ApplyCard }) => {
      return (
        <View style={styles.cardContainer}>
          <View style={styles.withShadow}>
            <SwipeCard card={item} />
          </View>
          <View style={[styles.fabWrapper, styles.withBloom, { left: 320 / 2 - 40 }]}>
            <Fab size={80}>
              <MaterialCommunityIcons name="glass-wine" size={56} color={colors.foregrounds.onTintPrimary} />
            </Fab>
          </View>
        </View>
      )
    },
    [colors.foregrounds.onTintPrimary, styles.cardContainer, styles.fabWrapper, styles.withBloom, styles.withShadow]
  )

  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      <View style={styles.inner}>
        <Carousel
          data={cards}
          renderItem={renderItem}
          itemWidth={320}
          activeSlideAlignment={'center'}
          sliderWidth={Dimensions.get('window').width}
          slideStyle={{ marginTop: Dimensions.get('window').height * 0.5 }}
          inactiveSlideOpacity={0.4}
        />
      </View>
    </View>
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
