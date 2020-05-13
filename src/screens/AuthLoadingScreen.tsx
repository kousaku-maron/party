import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useStyles, useColors, MakeStyles } from '../services/design'

const AuthLoadingScreen = () => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

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
