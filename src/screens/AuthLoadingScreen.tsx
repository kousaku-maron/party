import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuthState } from '../store/hooks'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useStyles, useColors, MakeStyles } from '../services/design'

const AuthLoadingScreen = () => {
  const navigation = useNavigation()
  const auth = useAuthState()
  const styles = useStyles(makeStyles)
  const colors = useColors()

  useEffect(() => {
    if (!auth.checked) return
    if (!auth.uid) {
      navigation.navigate('Welcome')
      return
    }
    navigation.navigate('App')
  }, [auth.checked, auth.uid, navigation])

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.system.gray} />
    </View>
  )
}

AuthLoadingScreen.navigationOptions = () => ({ header: null })

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgrounds.primary
    }
  })

export default AuthLoadingScreen
