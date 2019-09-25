import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { WelcomeScreenState, WelcomeScreenActions } from '../containers/WelcomeScreen'
import { buildUser } from '../entities'
import { View, Text, StyleSheet } from 'react-native'
import { RoundedButton } from '../components/atoms'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & WelcomeScreenState & WelcomeScreenActions

const WelcomeScreen = (props: Props) => {
  const { navigation, setAuth } = props

  const signIn = useCallback(() => {
    setAuth(buildUser({ uid: 'xxxxxxx' }))
    navigation.navigate('App')
  }, [navigation, setAuth])

  return (
    <View style={styles.container}>
      <Text>welcome screen</Text>
      <RoundedButton onPress={signIn}>
        <Text>サインイン</Text>
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
