import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuthState } from '../store/hooks'
import { StyleSheet, ImageBackground } from 'react-native'
import { useStyles, MakeStyles } from '../services/design'

const AuthLoadingScreen = () => {
  const navigation = useNavigation()
  const auth = useAuthState()
  const styles = useStyles(makeStyles)

  useEffect(() => {
    if (!auth.checked) return
    if (!auth.uid) {
      navigation.navigate('Welcome')
      return
    }
    navigation.navigate('App')
  }, [auth.checked, auth.uid, navigation])

  return <ImageBackground resizeMode="contain" style={styles.container} source={require('../../assets/splash.png')} />
}

AuthLoadingScreen.navigationOptions = () => ({ header: null })

const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%'
    }
  })

export default AuthLoadingScreen
