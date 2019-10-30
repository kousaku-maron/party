import React from 'react'
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { View, Text, StyleSheet } from 'react-native'

const PostScreen = () => {
  return (
    <View style={styles.container}>
      <Text>post screen</Text>
    </View>
  )
}

PostScreen.navigationOptions = (props: NavigationStackScreenProps) => headerNavigationOptions(props)

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
