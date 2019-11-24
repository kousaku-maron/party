import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { useAuthActions } from '../actions'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { RoundedButton } from '../components/atoms'
import { TouchableOpacity } from 'react-native-gesture-handler'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps

const WelcomeScreen = ({ navigation }: Props) => {
  const { signInFacebook, signInAnonymously } = useAuthActions()
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const onSignInFacebook = useCallback(() => {
    signInFacebook({
      onSuccess: () => navigation.navigate('App')
    })
  }, [navigation, signInFacebook])

  const onSignInAnonymously = useCallback(() => {
    signInAnonymously({
      onSuccess: () => navigation.navigate('App')
    })
  }, [navigation, signInAnonymously])

  const goToTerms = useCallback(() => {
    navigation.navigate('Terms')
  }, [navigation])

  const goToPrivacy = useCallback(() => {
    navigation.navigate('Privacy')
  }, [navigation])

  return (
    <View style={styles.container}>
      {/* <View style={styles.overlay} /> */}
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>DEMO</Text>
        {/* <Text style={styles.subText}>今すぐ、飲みに行こう</Text> */}
      </View>
      <View style={styles.imageArea}>
        {/* <Image style={styles.image} resizeMode="contain" source={require('./../../assets/icons/cocktail.png')} /> */}
      </View>
      <View style={styles.actionArea}>
        <View style={styles.facebookButtonWrapper}>
          <RoundedButton color={colors.tints.primary.main} height={56} fullWidth={true} onPress={onSignInFacebook}>
            <View style={styles.iconWrapper}>
              <AntDesign name="facebook-square" size={32} color={colors.foregrounds.onTintPrimary} />
            </View>
            <Text style={styles.fbText}>Facebookでログイン</Text>
          </RoundedButton>
        </View>

        <View style={styles.guestButtonWrapper}>
          <TouchableOpacity onPress={onSignInAnonymously}>
            <Text style={styles.guestText}>ゲストでログイン</Text>
          </TouchableOpacity>
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

WelcomeScreen.navigationOptions = () => ({ header: null, headerBackTitle: null })

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgrounds.primary
    },
    // overlay: {
    //   flex: 1,
    //   position: 'absolute',
    //   left: 0,
    //   top: 0,
    //   backgroundColor: colors.primary.main,
    //   width: Dimensions.get('window').width,
    //   height: Dimensions.get('window').height
    // },
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
    facebookButtonWrapper: {
      width: '100%',
      paddingBottom: 24
    },
    guestButtonWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
    fbText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 18
    },
    guestText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 14
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
