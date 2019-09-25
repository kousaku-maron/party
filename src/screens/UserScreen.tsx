import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const UserScreen = () => {
  return (
    <View style={styles.container}>
      <Text>user screen</Text>
    </View>
  )
}

UserScreen.navigationOptions = () => ({
  headerTitle: 'Morioka'
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

export default UserScreen
