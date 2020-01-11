import React from 'react'
import { View, Text, Image, Animated, StyleSheet } from 'react-native'
import { useApplyCards } from '../../services/applyCard'

const SwipeCardPage = () => {
  const cards = useApplyCards()

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {cards &&
          cards.map((card, index) => {
            return (
              <Animated.View key={index}>
                <Image
                  style={[styles.card, styles.cardImage]}
                  source={{
                    uri:
                      'https://firebasestorage.googleapis.com/v0/b/insta-693eb.appspot.com/o/users%2FEEg4LHfcNgOnA8e0DvE3B1Eb2F53%2Fthumbnail01.png?alt=media&token=6c33e9a1-c134-4c56-8e53-525b57745394'
                  }}
                />
                <Text>{card.partyID}</Text>
              </Animated.View>
            )
          })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingBottom: 60
  },
  inner: {
    flex: 1
  },
  card: {
    flex: 1,
    borderRadius: 20
  },
  cardImage: {
    height: null,
    width: null,
    resizeMode: 'cover'
  }
})

export default SwipeCardPage
