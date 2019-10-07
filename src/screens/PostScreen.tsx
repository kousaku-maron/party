import React from 'react'
import { View, StyleSheet } from 'react-native'

const PostScreen = () => {
  return <View style={styles.container}></View>
}

PostScreen.navigationOptions = () => ({
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

export default PostScreen
