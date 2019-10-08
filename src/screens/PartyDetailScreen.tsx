import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PartyDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>party detail screen</Text>
    </View>
  )
}

PartyDetailScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca'
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default PartyDetailScreen
