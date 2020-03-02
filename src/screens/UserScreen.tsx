import React, { useCallback, useMemo } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import { RouteParams } from '../navigators/RouteProps'
import { useAuthState } from '../store/hooks'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { useUser } from '../services/user'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'
import { Thumbnail, Fab, DotsIcon, ShadowBase, BloomBase } from '../components/atoms'
import { LoadingPage } from '../components/pages'
import { BottomTabLayout } from '../components/templates'

const UserScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RouteParams, 'User'>>()
  const { uid } = useAuthState()

  const styles = useStyles(makeStyles)
  const colors = useColors()
  const inset = useSafeArea()

  const targetUserID = useMemo(() => {
    if (route.params?.userID) {
      return route.params.userID
    }
    return uid
  }, [route.params, uid])

  const isMy = useMemo(() => {
    if (route.params?.userID) {
      return route.params.userID === uid
    }
    return true
  }, [route.params, uid])

  // TODO: ブロックしているユーザーかチェック
  const isBlocked = useMemo(() => {
    return false
  }, [])

  // TODO: フレンドかチェック
  const isFriend = useMemo(() => {
    return false
  }, [])

  const user = useUser(targetUserID)

  const goToEdit = useCallback(() => {
    navigation.navigate('UserEdit')
  }, [navigation])

  const goToSetting = useCallback(() => {
    navigation.navigate('Setting')
  }, [navigation])

  if (!user) {
    return <LoadingPage />
  }

  return (
    <BottomTabLayout>
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: inset.top }]}>
          <TouchableOpacity style={styles.dotsWrapper} onPress={goToSetting}>
            <DotsIcon />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.profileContainer}>
            <View style={styles.profileWrapper}>
              <View style={styles.thumbnailWrapper}>
                <ShadowBase intensity={2}>
                  <Thumbnail uri={user.thumbnailURL} size={82} />
                </ShadowBase>
              </View>

              <View style={styles.nameWrapper}>
                <Text style={styles.nameText}>{user.name}</Text>
              </View>

              <View style={styles.idWrapper}>
                <Text style={styles.idText}>@{user.userID}</Text>
              </View>

              <View style={styles.introWrapper}>
                <Text style={styles.introText}>
                  自己紹介分、サンプル。私の趣味はボルダリングです！運動も飲みも好きなので、あそびましょー。
                </Text>
              </View>

              {isFriend && !isBlocked && !isMy && (
                <View style={styles.friendTextWrapper}>
                  <Text style={styles.friendText}>ともだち</Text>
                </View>
              )}

              {isBlocked && !isMy && (
                <View style={styles.blockTextWrapper}>
                  <Text style={styles.blockText}>ブロック中</Text>
                </View>
              )}
            </View>
          </View>

          <View style={styles.contentsContainer}>
            {isMy && (
              <View style={styles.fabWrapper}>
                <BloomBase>
                  <Fab size={64} onPress={goToEdit}>
                    <Feather name="edit-3" color={colors.foregrounds.onTintPrimary} size={36} />
                  </Fab>
                </BloomBase>
              </View>
            )}

            {!isMy && !isFriend && !isBlocked && (
              <View style={styles.fabWrapper}>
                <BloomBase>
                  <Fab size={64}>
                    <AntDesign name="adduser" color={colors.foregrounds.onTintPrimary} size={36} />
                  </Fab>
                </BloomBase>
              </View>
            )}

            {!isBlocked && (
              <View style={styles.cardsContainer}>
                <Text style={styles.contentsTitleText}>参加中</Text>
              </View>
            )}

            {!isBlocked && (
              <View style={styles.friendsContainer}>
                <Text style={styles.contentsTitleText}>ともだち</Text>
              </View>
            )}

            {isBlocked && (
              <View style={styles.blockMessageContainer}>
                <Text style={styles.blockMessageText}>ブロックしたユーザーの</Text>
                <Text style={styles.blockMessageText}>情報は見れません</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </BottomTabLayout>
  )
}

// const hairlineWidth = StyleSheet.hairlineWidth
const fullHeight = Dimensions.get('window').height

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: colors.backgrounds.primary
    },
    scrollView: {
      width: '100%'
    },
    header: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 88
    },
    profileContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      height: fullHeight * 0.7
    },
    contentsContainer: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      minHeight: fullHeight * 0.3,
      backgroundColor: colors.backgrounds.secondary,
      paddingVertical: 84,
      paddingHorizontal: 32
    },
    cardsContainer: {
      paddingBottom: 48
    },
    friendContainer: {},
    blockMessageContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    dotsWrapper: {
      display: 'flex',
      marginRight: 12
    },
    fabWrapper: {
      position: 'absolute',
      top: -32,
      right: 32
    },
    thumbnailWrapper: {
      paddingBottom: 12
    },
    nameWrapper: {
      paddingBottom: 3
    },
    idWrapper: {
      paddingBottom: 24
    },
    introWrapper: {
      width: '60%',
      paddingBottom: 32
    },
    profileWrapper: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 32
    },
    friendTextWrapper: {},
    blockTextWrapper: {},
    nameText: {
      fontSize: 18,
      color: colors.foregrounds.primary
    },
    idText: {
      fontSize: 12,
      color: colors.foregrounds.secondary
    },
    introText: {
      fontSize: 14,
      color: colors.foregrounds.secondary,
      textAlign: 'center'
    },
    friendText: {
      fontSize: 20,
      color: colors.tints.primary.main
    },
    blockText: {
      fontSize: 20,
      color: 'red' // どうしよう...
    },
    contentsTitleText: {
      fontSize: 24,
      color: colors.foregrounds.primary,
      fontWeight: 'bold'
    },
    blockMessageText: {
      fontSize: 20,
      color: colors.foregrounds.placeholder
    }
  })

export default UserScreen
