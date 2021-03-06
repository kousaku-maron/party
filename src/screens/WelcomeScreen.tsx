import React, { useCallback } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStackNavigation } from '../services/route'
import { signInApple, isAvailableSignInWithApple } from '../services/authentication'
import signInGoogle from '../services/authentication/google'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { RoundedButton, ShadowBase } from '../components/atoms'

const WelcomeScreen = () => {
  const navigation = useStackNavigation()
  const inset = useSafeArea()
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const onSignInApple = useCallback(async () => {
    const { success, cancelled, error } = await signInApple()
    if (error) {
      return alert('Apple認証に失敗しました。iOS13以上でないと、Apple認証は利用できません。')
    }

    if (success && !cancelled) {
      navigation.navigate('App')
    }
  }, [navigation])

  const onSignInGoogle = useCallback(async () => {
    const { success, cancelled, error } = await signInGoogle()
    if (error) {
      return alert('Google認証に失敗しました。')
    }

    if (success && !cancelled) {
      navigation.navigate('App')
    }
  }, [navigation])

  const goToTerms = useCallback(() => {
    navigation.push('Terms')
  }, [navigation])

  const goToPrivacy = useCallback(() => {
    navigation.push('Privacy')
  }, [navigation])

  return (
    <ImageBackground
      source={require('../../assets/images/welcome.jpg')}
      style={[styles.container, { paddingTop: inset.top }]}
    >
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>PARTY</Text>
      </View>
      <View style={styles.imageArea} />
      <View style={styles.actionArea}>
        {isAvailableSignInWithApple() && (
          <View style={styles.appleButtonWrapper}>
            <ShadowBase>
              <RoundedButton
                color={colors.foregrounds.onTintPrimary}
                fullWidth={true}
                height={60}
                onPress={onSignInApple}
              >
                <View style={styles.buttonInner}>
                  <View style={styles.iconWrapper}>
                    <AntDesign name="apple1" size={20} color={colors.tints.primary.main} />
                  </View>
                  <Text style={styles.appleText}>AppleIDでログイン</Text>
                </View>
              </RoundedButton>
            </ShadowBase>
          </View>
        )}

        <View style={styles.googleButtonWrapper}>
          <ShadowBase>
            <RoundedButton
              color={colors.foregrounds.onTintPrimary}
              fullWidth={true}
              height={60}
              onPress={onSignInGoogle}
            >
              <View style={styles.buttonInner}>
                <View style={styles.iconWrapper}>
                  <AntDesign name="google" size={20} color={colors.tints.primary.main} />
                </View>
                <Text style={styles.googleText}>Googleでログイン</Text>
              </View>
            </RoundedButton>
          </ShadowBase>
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
    </ImageBackground>
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
      paddingTop: 48
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
    buttonInner: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    appleButtonWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 20
    },
    googleButtonWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 20
    },
    iconWrapper: {
      paddingRight: 12
    },
    image: {
      width: 300
    },
    titleText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 48
    },
    subText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 20,
      letterSpacing: 4
    },
    appleText: {
      color: colors.tints.primary.main,
      fontSize: 18
    },
    googleText: {
      color: colors.tints.primary.main,
      fontSize: 18
    },
    termText: {
      width: 240,
      color: colors.foregrounds.onTintPrimary,
      fontSize: 10,
      fontWeight: '300',
      textAlign: 'center'
    },
    linkText: {
      fontSize: 10,
      fontWeight: 'bold'
    }
  })

export default WelcomeScreen
