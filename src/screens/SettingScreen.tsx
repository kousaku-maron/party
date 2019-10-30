import React, { useCallback } from 'react'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { SettingScreenState, SettingScreenActions } from '../containers/SettingScreen'
import { useStyles, MakeStyles } from '../services/design'
import { useSecure, usePushNotifications } from '../services/secure'
import { TouchableOpacity, ScrollView, Text, StyleSheet, Dimensions } from 'react-native'
import { LoadingPage } from '../components/pages'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & SettingScreenState & SettingScreenActions

const SettingScreen = (props: Props) => {
  const { navigation, auth, signOut } = props
  const { user } = auth

  const styles = useStyles(makeStyles)

  const secure = useSecure(user.uid)
  const pushNotificationsTools = usePushNotifications(user.uid)

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

  if (!user || !secure) {
    return <LoadingPage />
  }

  return (
    <ScrollView style={styles.container}>
      {secure.pushToken && (
        <TouchableOpacity style={styles.listItem} onPress={pushNotificationsTools.onReject}>
          <Text style={styles.primaryText}>プッシュ通知を拒否</Text>
        </TouchableOpacity>
      )}

      {!secure.pushToken && (
        <TouchableOpacity style={styles.listItem} onPress={pushNotificationsTools.onAccept}>
          <Text style={styles.primaryText}>プッシュ通知を許可</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.listItem} onPress={goToTerms}>
        <Text style={styles.primaryText}>利用規約</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem} onPress={goToPrivacy}>
        <Text style={styles.primaryText}>プライバシーポリシー</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.primaryText}>退会する</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem} onPress={onSignOut}>
        <Text style={styles.signoutText}>サインアウト</Text>
      </TouchableOpacity>
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
