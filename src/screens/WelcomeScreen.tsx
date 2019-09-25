import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { WelcomeScreenState, WelcomeScreenActions } from '../containers/WelcomeScreen'
import { buildUser } from '../entities'
import { ImageBackground, View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
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
    <ImageBackground source={require('../../assets/images/top.jpeg')} blurRadius={5} style={styles.container}>
      <View style={styles.actionArea}>
        <View style={styles.buttonWrapper}>
          <RoundedButton color="#3360ff" height={56} fullWidth={true} onPress={signIn}>
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
  fbText: {
    color: 'white',
    fontSize: 18
  },
  termText: {
    color: 'black'
  }
})

export default WelcomeScreen
