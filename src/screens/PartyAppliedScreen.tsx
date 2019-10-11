import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PartyAppliedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>申し込み完了いたしました．</Text>
    </View>
  )
}

PartyAppliedScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca'
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: 'bold'
  }
})

export default PartyAppliedScreen
