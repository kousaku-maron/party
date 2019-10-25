import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../themes'

const PostScreen = () => {
  return (
    <View style={styles.container}>
      <Text>post screen</Text>
    </View>
  )
}

PostScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca',
  headerBackTitle: null,
  headerTintColor: colors.foregrounds.primary,
  headerStyle: {
    backgroundColor: colors.backgrounds.secondary
  }
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

export default PostScreen
