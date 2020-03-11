import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useAuthState, useAuthActions } from '../store/hooks'
import { useStyles, MakeStyles, useColors } from '../services/design'
import { useSecure } from '../services/secure'
import { TouchableOpacity, ScrollView, Text, StyleSheet, View } from 'react-native'
import { ShadowBase } from '../components/atoms'
import { LoadingPage } from '../components/pages'

const SettingScreen = () => {
  const navigation = useNavigation()
  const { user } = useAuthState()
  const { signOut } = useAuthActions()
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const inset = useSafeArea()

  const secure = useSecure(user.uid)

  // MEMO: logOutするとuserデータがなくなってしまうので、先に画面遷移させる。
  const onLogOut = useCallback(() => {
    navigation.navigate('Welcome')
    signOut({})
  }, [navigation, signOut])

  const goToTerms = useCallback(() => {
    navigation.navigate('Terms')
  }, [navigation])

  //TODO: 退会画面をいれる
  const goToWithdraw = useCallback(() => {
    console.log('withdraw user')
  }, [])

  const goToPrivacy = useCallback(() => {
    navigation.navigate('Privacy')
  }, [navigation])

  if (!user || !secure) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      {/* 33px => header height */}
      <ScrollView style={(styles.scrollView, { paddingTop: 33 + 25 + inset.top })}>
        <ShadowBase>
          <View style={styles.ruleCardWrapper}>
            <View style={styles.ruleCard}>
              <Text style={styles.primaryText}>規約</Text>
              <TouchableOpacity style={styles.listItem} onPress={goToTerms}>
                <Text style={styles.secondaryText}>利用規約</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.listItem} onPress={goToPrivacy}>
                <Text style={styles.secondaryText}>プライバシーポリシー</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ShadowBase>

        <ShadowBase>
          <View style={styles.ruleCardWrapper}>
            <View style={styles.ruleCard}>
              <Text style={styles.primaryText}>アカウント</Text>

              <TouchableOpacity style={styles.listItem} onPress={goToWithdraw}>
                <Text style={styles.secondaryText}>退会する</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.listItem} onPress={onLogOut}>
                <Text style={(styles.secondaryText, { color: colors.system.blue })}>ログアウト</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ShadowBase>
      </ScrollView>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgrounds.primary
    },
    scrollView: {
      width: '100%',
      paddingHorizontal: 24
    },
    ruleCardWrapper: {
      width: '100%',
      paddingBottom: 20
    },
    listItem: {
      paddingVertical: 10,
      display: 'flex',
      width: '100%'
    },
    primaryText: {
      paddingBottom: 10,
      color: colors.foregrounds.primary,
      fontSize: 18
    },
    secondaryText: {
      color: colors.foregrounds.secondary,
      fontSize: 12
    },

    signoutText: {
      color: colors.system.blue
    },
    ruleCard: {
      width: '100%',
      borderRadius: 10,
      opacity: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: colors.backgrounds.secondary
    }
  })

export default SettingScreen
