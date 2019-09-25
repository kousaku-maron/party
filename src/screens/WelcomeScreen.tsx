import React from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { View, Text, StyleSheet } from 'react-native'
import { RoundedButton } from '../components/atoms'

type Props = {
  navigation: NavigationStackProp
}

const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>welcome screen</Text>
      <RoundedButton onPress={() => navigation.navigate('App')}>
        <Text>go to app</Text>
      </RoundedButton>
    </View>
  )
}

WelcomeScreen.navigationOptions = () => ({
  header: null
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

export default WelcomeScreen
