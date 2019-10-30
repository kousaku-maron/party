import React, { useCallback } from 'react'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { SettingScreenState, SettingScreenActions } from '../containers/SettingScreen'
import { useStyles, MakeStyles } from '../services/design'
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native'
import { LoadingPage } from '../components/pages'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & SettingScreenState & SettingScreenActions

const SettingScreen = (props: Props) => {
  const { navigation, auth, signOut } = props
  const { user } = auth

  const styles = useStyles(makeStyles)

  const onSignOut = useCallback(() => {
    signOut({
      onSuccess: () => navigation.navigate('Welcome')
    })
  }, [navigation, signOut])

  const goToTerms = useCallback(() => {
    navigation.navigate('Terms')
  }, [navigation])

  const goToPrivacy = useCallback(() => {
    navigation.navigate('Privacy')
  }, [navigation])

  if (!user) {
    return <LoadingPage />
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.listItem}>
        <Text style={styles.primaryText}>
          {/* user.pushToken */ false ? 'プッシュ通知を拒否' : 'プッシュ通知を許可'}
        </Text>
      </View>

      <View style={styles.listItem}>
        <Text style={styles.primaryText} onPress={goToTerms}>
          利用規約
        </Text>
      </View>

      <View style={styles.listItem}>
        <Text style={styles.primaryText} onPress={goToPrivacy}>
          プライバシーポリシー
        </Text>
      </View>

      <View style={styles.listItem}>
        <Text style={styles.primaryText}>退会する</Text>
      </View>

      <View style={styles.listItem}>
        <Text style={styles.signoutText} onPress={onSignOut}>
          サインアウト
        </Text>
      </View>
    </ScrollView>
  )
}

SettingScreen.navigationOptions = (props: NavigationStackScreenProps) => headerNavigationOptions(props)

const hairlineWidth = StyleSheet.hairlineWidth
const width = Dimensions.get('window').width

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgrounds.primary
    },
    listItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height: 50,
      borderBottomColor: colors.foregrounds.separator,
      borderBottomWidth: hairlineWidth
    },
    primaryText: {
      color: colors.foregrounds.primary
    },
    signoutText: {
      color: colors.system.blue
    }
  })

export default SettingScreen
