import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { WelcomeScreenState, WelcomeScreenActions } from '../containers/WelcomeScreen'
import { ImageBackground, View, Text, StyleSheet, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { RoundedButton } from '../components/atoms'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & WelcomeScreenState & WelcomeScreenActions

const WelcomeScreen = (props: Props) => {
  const { navigation, signInFacebook } = props

  const signIn = useCallback(() => {
    signInFacebook({
      onSuccess: () => navigation.navigate('App')
    })
  }, [navigation, signInFacebook])

  return (
    <ImageBackground source={require('../../assets/images/top.jpeg')} blurRadius={5} style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>Nomoca</Text>
        <Text style={styles.subText}>今すぐ、飲みに行こう</Text>
      </View>
      <View style={styles.actionArea}>
        <View style={styles.buttonWrapper}>
          <RoundedButton color="#3498db" height={56} fullWidth={true} onPress={signIn}>
            <View style={styles.iconWrapper}>
              <AntDesign name="facebook-square" size={32} color="white" />
            </View>
            <Text style={styles.fbText}>Facebookでログイン</Text>
          </RoundedButton>
        </View>

        <Text style={styles.termText}>利用規約を読む。</Text>
      </View>
    </ImageBackground>
  )
}

WelcomeScreen.navigationOptions = () => ({
  header: null
})

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.2,
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  titleArea: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 96
  },
  actionArea: {
    width: '80%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 96
  },
  buttonWrapper: {
    width: '100%',
    paddingBottom: 12
  },
  iconWrapper: {
    paddingRight: 12
  },
  titleText: {
    color: 'white',
    fontSize: 64
  },
  subText: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 4
  },
  fbText: {
    color: 'white',
    fontSize: 18
  },
  termText: {
    color: 'white'
  }
})

export default WelcomeScreen
