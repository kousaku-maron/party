import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const LoadingPage = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" />
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

export default LoadingPage
