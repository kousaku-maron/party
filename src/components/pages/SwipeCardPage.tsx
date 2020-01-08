import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useApplyCards } from '../../services/applyCard'

const SwipeCardPage = () => {
  const cards = useApplyCards()

  return (
    <View style={styles.container}>
      {cards &&
        cards.map((card, index) => {
          return (
            <View key={index}>
              <Text>{card.partyID}</Text>
            </View>
          )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  }
})

export default SwipeCardPage
