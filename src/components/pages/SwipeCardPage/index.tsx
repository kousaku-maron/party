import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useStyles, MakeStyles } from '../../../services/design'
import { useAppliedCards } from '../../../services/applyCard'
import { SwipeCardSection } from './SwipeCardSection'

const SwipeCardPage = () => {
  const cards = useAppliedCards()
  const styles = useStyles(makeStyles)

  const [cardIndex] = useState<number>(0)

  return (
    <View style={styles.container}>
      {cards &&
        cards
          .map((card, index) => {
            if (index < cardIndex) {
              return null
            }

            if (index === cardIndex) {
              return <SwipeCardSection key={index} card={card} swipeable={true} />
            }

            return <SwipeCardSection key={index} card={card} />
          })
          .reverse()}
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.backgrounds.primary
    }
  })

export default SwipeCardPage
