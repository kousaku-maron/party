import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const UnexpectedErrorPage = () => {
  return (
    <View style={styles.container}>
      <Text>予期せぬエラーが起きました.</Text>
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

export default UnexpectedErrorPage
