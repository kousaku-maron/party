import React, { useEffect } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { AuthLoadingScreenState } from '../containers/AuthLoadingScreen'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useStyles, useColors, MakeStyles } from '../services/design'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & AuthLoadingScreenState

const AuthLoadingScreen = (props: Props) => {
  const { navigation, auth } = props

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

AuthLoadingScreen.navigationOptions = () => ({
  header: null
})

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
