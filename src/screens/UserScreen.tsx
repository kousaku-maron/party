import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { UserScreenState, UserScreenActions } from '../containers/UserScreen'
import { View, Text, StyleSheet } from 'react-native'
import { RoundedButton } from '../components/atoms'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & UserScreenState & UserScreenActions

const UserScreen = (props: Props) => {
  const { navigation, auth, resetAuth } = props

  const signOut = useCallback(() => {
    resetAuth()
    navigation.navigate('Welcome')
  }, [navigation, resetAuth])

  return (
    <View style={styles.container}>
      <Text>user screen</Text>
      <Text>uid: {auth.uid}</Text>
      <RoundedButton onPress={signOut}>
        <Text>サインアウト</Text>
      </RoundedButton>
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
