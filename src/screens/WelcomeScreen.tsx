import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuthActions } from '../store/hooks'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { isAvailableSignInWithApple } from '../services/authentication'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { RoundedButton } from '../components/atoms'

const WelcomeScreen = () => {
  const navigation = useNavigation()
  const { signInApple, signInGoogle } = useAuthActions()
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const onSignInApple = useCallback(() => {
    signInApple({
      onSuccess: () => navigation.navigate('App')
    })
  }, [navigation, signInApple])

  const onSignInGoogle = useCallback(() => {
    signInGoogle({
      onSuccess: () => navigation.navigate('App')
    })
  }, [navigation, signInGoogle])

  const goToTerms = useCallback(() => {
    navigation.navigate('Terms')
  }, [navigation])

  const goToPrivacy = useCallback(() => {
    navigation.navigate('Privacy')
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>DEMO</Text>
      </View>
      <View style={styles.imageArea} />
      <View style={styles.actionArea}>
        {isAvailableSignInWithApple() && (
          <View style={styles.appleButtonWrapper}>
            <RoundedButton color={colors.tints.primary.main} height={56} fullWidth={true} onPress={onSignInApple}>
              <View style={styles.iconWrapper}>
                <AntDesign name="apple1" size={32} color={colors.foregrounds.onTintPrimary} />
              </View>
              <Text style={styles.appleText}>AppleIDでログイン</Text>
            </RoundedButton>
          </View>
        )}

        <View style={styles.googleButtonWrapper}>
          <RoundedButton color={colors.tints.primary.main} height={56} fullWidth={true} onPress={onSignInGoogle}>
            <View style={styles.iconWrapper}>
              <AntDesign name="google" size={32} color={colors.foregrounds.onTintPrimary} />
            </View>
            <Text style={styles.googleText}>Googleでログイン</Text>
          </RoundedButton>
        </View>

        <Text style={styles.termText}>
          <Text style={styles.linkText} onPress={goToTerms}>
            利用規約
          </Text>
          と
          <Text style={styles.linkText} onPress={goToPrivacy}>
            プライバシーポリシー
          </Text>
          に同意して、サービスを利用して下さい。
        </Text>
      </View>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgrounds.primary
    },
    titleArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 96
    },
    actionArea: {
      width: '80%',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 96
    },
    imageArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 134
    },
    appleButtonWrapper: {
      width: '100%',
      paddingBottom: 24
    },
    googleButtonWrapper: {
      width: '100%',
      paddingBottom: 24
    },
    iconWrapper: {
      paddingRight: 12
    },
    image: {
      width: 300
    },
    titleText: {
      color: colors.tints.primary.main,
      fontSize: 64
    },
    subText: {
      color: colors.tints.primary.main,
      fontSize: 20,
      letterSpacing: 4
    },
    appleText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 18
    },
    googleText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 18
    },
    termText: {
      color: colors.foregrounds.secondary,
      fontSize: 12,
      fontWeight: '300'
    },
    linkText: {
      fontSize: 12,
      fontWeight: 'bold'
    }
  })

export default WelcomeScreen
