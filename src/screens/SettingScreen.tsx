import React, { useCallback } from 'react'
import { useStackNavigation } from '../services/route'
import { useSafeArea } from 'react-native-safe-area-context'
import { useAuthState, useUIActions } from '../store/hooks'
import { useStyles, MakeStyles, useColors } from '../services/design'
import { signOut } from '../services/authentication'
import { useNotificationsSetting, removeToken } from '../services/notifications/notifications'
import { TouchableOpacity, ScrollView, Text, StyleSheet, View } from 'react-native'
import { ShadowBase } from '../components/atoms'
import { Header } from '../components/organisms'
import { LoadingPage } from '../components/pages'

const SettingScreen = () => {
  const navigation = useStackNavigation()
  const { user, uid } = useAuthState()
  const { setTabState } = useUIActions()
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const inset = useSafeArea()
  const { enabled, onAccept, onReject } = useNotificationsSetting()

  const onLogOut = useCallback(async () => {
    await removeToken(uid)
    const { success, error } = await signOut()

    if (!success && error) {
      return alert('ログアウトに失敗しました。')
    }

    if (success) {
      // MEMO: ルーティングのリセットを行っている。
      navigation.popToTop()
      navigation.navigate('HomeSection')
      navigation.navigate('Welcome')
      setTabState('home')
    }
  }, [navigation, setTabState, uid])

  const goToTerms = useCallback(() => {
    navigation.push('Terms')
  }, [navigation])

  //TODO: 退会画面をいれる
  const goToWithdraw = useCallback(() => {
    console.log('withdraw user')
  }, [])

  const goToPrivacy = useCallback(() => {
    navigation.push('Privacy')
  }, [navigation])

  if (!user) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={(styles.scrollView, { paddingTop: inset.top })}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerTopSpacer} />

        <View style={styles.headerContainer}>
          <Header fullWidth={true} title="設定" />
        </View>

        <View style={styles.headerBottomSpacer} />

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

              {enabled && (
                <TouchableOpacity style={styles.listItem} onPress={onReject}>
                  <Text style={styles.secondaryText}>通知しない</Text>
                </TouchableOpacity>
              )}

              {!enabled && (
                <TouchableOpacity style={styles.listItem} onPress={onAccept}>
                  <Text style={styles.secondaryText}>通知する</Text>
                </TouchableOpacity>
              )}

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
    headerContainer: {
      width: '100%',
      paddingHorizontal: 24
    },
    headerBottomSpacer: {
      paddingBottom: 20
    },
    headerTopSpacer: {
      paddingBottom: 36
    },
    scrollView: {
      width: '100%',
      paddingHorizontal: 24
    },
    ruleCardWrapper: {
      width: '100%',
      paddingBottom: 20,
      paddingHorizontal: 24
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
