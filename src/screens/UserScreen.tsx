import React, { useCallback, useMemo, useRef } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native'
import Animated, { Value, Extrapolate, interpolate } from 'react-native-reanimated'
import { useStackNavigation } from '../services/route'
import { useSafeArea } from 'react-native-safe-area-context'
import { RouteParams } from '../navigators/RouteProps'
import { useAppAuthState } from '../store/hooks'
import { Party } from '../entities'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { useUser, useUserRelationship } from '../services/user'
import { useAppliedParties } from '../services/party'
import { useFriends, useApplyFriend, useAcceptFriend } from '../services/friend'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Thumbnail, AnimatedThumbnail, Fab, DotsIcon, ShadowBase } from '../components/atoms'
import { PartySecondaryCard, Header } from '../components/organisms'
import { BottomTabLayout } from '../components/templates'
import { Icons } from '../@assets/vector-icons'

const PROFILE_HEIGHT = 480

const UserScreen = () => {
  const navigation = useStackNavigation()
  const route = useRoute<RouteProp<RouteParams, 'User'>>()
  const { uid } = useAppAuthState()

  const styles = useStyles(makeStyles)
  const colors = useColors()
  const inset = useSafeArea()

  const targetUID = useMemo(() => {
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

  const { fetching, user } = useUser(targetUID)
  const { friends } = useFriends(targetUID)
  const { isBlocked, isFriend, isApply, isApplied } = useUserRelationship(targetUID)
  const appliedParties = useAppliedParties(user)
  const { onApplyFriend } = useApplyFriend()
  const { onAcceptFriend } = useAcceptFriend()

  const isShowUserPlusIcon = useMemo(() => {
    return (!isBlocked && !isFriend && !isApply) || isMy
  }, [isApply, isBlocked, isFriend, isMy])

  const goToEdit = useCallback(() => {
    navigation.push('UserEdit')
  }, [navigation])

  const goToSetting = useCallback(() => {
    navigation.push('Setting')
  }, [navigation])

  const onPressParty = useCallback(
    ({ type }: Party) => {
      navigation.push('SwipeCard', { type })
    },
    [navigation]
  )

  const onPressUser = useCallback(
    (userID: string) => {
      navigation.push('User', { userID })
    },
    [navigation]
  )

  const onPressUserPlus = useCallback(() => {
    if (!user) return
    if (isMy) {
      navigation.push('SearchUser')
      return
    }

    if (isApplied) {
      onAcceptFriend(user)
      return
    }

    onApplyFriend(user)
  }, [isApplied, isMy, navigation, onAcceptFriend, onApplyFriend, user])

  const scrollY = useRef(new Value<number>(0))

  const headerY = useRef(
    interpolate(scrollY.current, {
      inputRange: [185, 235],
      outputRange: [0, -50],
      extrapolate: Extrapolate.CLAMP
    })
  )

  const hbOpacity = useRef(
    interpolate(scrollY.current, {
      inputRange: [185, 235],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP
    })
  )

  const thumbnailSize = useRef(
    interpolate(scrollY.current, {
      inputRange: [120, 170],
      outputRange: [60, 40],
      extrapolate: Extrapolate.CLAMP
    })
  )

  const renderTitle = useCallback(
    () => (
      <View style={styles.headerTitleContainer}>
        <Animated.View style={[styles.profileHeaderTitle, { marginTop: headerY.current }]}>
          <Text style={styles.headerTitleText}>プロフィール</Text>
        </Animated.View>
        <View style={styles.userHeaderTitle}>
          <View style={styles.headerThumbnailWrapper}>
            <Thumbnail size={30} uri={user?.thumbnailURL} />
          </View>
          <Text style={styles.headerTitleText}>{user?.name}</Text>
        </View>
      </View>
    ),
    [
      styles.headerThumbnailWrapper,
      styles.headerTitleContainer,
      styles.headerTitleText,
      styles.profileHeaderTitle,
      styles.userHeaderTitle,
      user
    ]
  )

  return (
    <BottomTabLayout fetching={fetching}>
      <View style={styles.container}>
        <View style={[styles.headerContainer, { paddingTop: inset.top }]}>
          <View style={styles.headerInner}>
            <Header
              fullWidth={true}
              renderTitle={renderTitle}
              renderRight={() =>
                isMy && (
                  <TouchableOpacity style={styles.dotsWrapper} onPress={goToSetting}>
                    <DotsIcon tintColor={colors.foregrounds.primary} />
                  </TouchableOpacity>
                )
              }
            />
          </View>
        </View>

        <Animated.View style={[styles.headerBackground, { paddingTop: inset.top, opacity: hbOpacity.current }]} />

        <Animated.ScrollView
          style={styles.userScrollView}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY.current } }
            }
          ])}
        >
          <View style={styles.profileContainer}>
            {!fetching && user && (
              <React.Fragment>
                <View style={styles.thumbnailWrapper}>
                  <ShadowBase>
                    <AnimatedThumbnail uri={user.thumbnailURL} size={thumbnailSize.current} />
                  </ShadowBase>
                </View>

                <View style={styles.nameWrapper}>
                  <Text style={styles.nameText}>{user.name}</Text>
                </View>

                {user.introduction && (
                  <View style={styles.introWrapper}>
                    <Text style={styles.introText}>{user.introduction}</Text>
                  </View>
                )}

                {isMy && (
                  <TouchableOpacity onPress={goToEdit}>
                    <Icons name="edit" color={colors.foregrounds.primary} size={18} />
                  </TouchableOpacity>
                )}

                {isFriend && !isBlocked && !isMy && (
                  <View>
                    <Text style={styles.friendText}>ともだち</Text>
                  </View>
                )}

                {isApply && !isBlocked && !isMy && (
                  <View>
                    <Text style={styles.friendText}>ともだち申請中</Text>
                  </View>
                )}

                {isBlocked && !isMy && (
                  <View>
                    <Text style={styles.blockText}>ブロック中</Text>
                  </View>
                )}
              </React.Fragment>
            )}
          </View>

          <ShadowBase>
            <View style={styles.sheet}>
              {!fetching && isShowUserPlusIcon && (
                <View style={styles.fabWrapper}>
                  <ShadowBase>
                    <Fab size={75} color={colors.backgrounds.tertiary} onPress={onPressUserPlus}>
                      <Icons name="user-plus" color={colors.foregrounds.primary} size={36} />
                    </Fab>
                  </ShadowBase>
                </View>
              )}

              {!isBlocked && (
                <View style={styles.sectionContainer}>
                  <View style={styles.titleTextWrapper}>
                    <Text style={styles.titleText}>参加中</Text>
                  </View>

                  {(!appliedParties || appliedParties.length === 0) && (
                    <View style={styles.emptyMessageTextWrapper}>
                      <Text style={styles.emptyMessageText}>参加中のイベントがありません</Text>
                    </View>
                  )}

                  {appliedParties && appliedParties.length > 0 && (
                    <ScrollView horizontal={true} style={styles.rowScrollView} showsHorizontalScrollIndicator={false}>
                      {appliedParties.map(appliedParty => (
                        <View key={appliedParty.id} style={styles.secondaryCardWrapper}>
                          <ShadowBase>
                            <PartySecondaryCard party={appliedParty} onPress={onPressParty} />
                          </ShadowBase>
                        </View>
                      ))}
                    </ScrollView>
                  )}
                </View>
              )}

              {!isBlocked && (
                <View style={styles.sectionContainer}>
                  <View style={styles.titleTextWrapper}>
                    <Text style={styles.titleText}>ともだち</Text>
                  </View>

                  {(!friends || friends.length === 0) && (
                    <View style={styles.emptyMessageTextWrapper}>
                      <Text style={styles.emptyMessageText}>ともだちがまだいません</Text>
                    </View>
                  )}

                  {friends && friends.length > 0 && (
                    <ScrollView horizontal={true} style={styles.rowScrollView} showsHorizontalScrollIndicator={false}>
                      {friends.map(friend => (
                        <View key={friend.id} style={styles.friendContainer}>
                          <View style={styles.friendThumbnailWrapper}>
                            <ShadowBase>
                              <Thumbnail
                                uri={friend.thumbnailURL}
                                size={60}
                                onPress={() => {
                                  onPressUser(friend.uid)
                                }}
                              />
                            </ShadowBase>
                          </View>
                          <Text style={styles.friendNameText}>{friend.name}</Text>
                        </View>
                      ))}
                    </ScrollView>
                  )}
                </View>
              )}

              {isBlocked && (
                <View style={styles.blockMessageContainer}>
                  <Text style={styles.blockMessageText}>ブロックしたユーザーの</Text>
                  <Text style={styles.blockMessageText}>情報は見れません</Text>
                </View>
              )}

              <View style={styles.grow} />
            </View>
          </ShadowBase>
        </Animated.ScrollView>
      </View>
    </BottomTabLayout>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgrounds.primary
    },
    headerContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      zIndex: 1000,
      elevation: 1000,
      paddingBottom: 6
    },
    headerBackground: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      zIndex: 999,
      elevation: 999,
      paddingBottom: 6,
      height: 100,
      backgroundColor: colors.backgrounds.tertiary
    },
    headerInner: {
      paddingHorizontal: 24
    },
    headerTitleContainer: {
      height: '100%',
      overflow: 'hidden'
    },
    profileHeaderTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50
    },
    userHeaderTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50
    },
    headerThumbnailWrapper: {
      paddingRight: 12
    },
    headerTitleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.foregrounds.primary
    },
    dotsWrapper: {
      display: 'flex',
      marginRight: 12
    },
    userScrollView: {},
    grow: {
      flexGrow: 1,
      height: '100%'
    },
    rowScrollView: {
      flex: 1,
      flexDirection: 'row',
      overflow: 'visible'
    },
    profileContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: PROFILE_HEIGHT,
      paddingBottom: 24
    },
    thumbnailWrapper: {
      paddingBottom: 18
    },
    nameWrapper: {
      paddingBottom: 18
    },
    introWrapper: {
      width: '51.2%',
      paddingBottom: 32
    },
    nameText: {
      fontSize: 18,
      color: colors.foregrounds.primary,
      fontWeight: 'bold'
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
      color: colors.system.red
    },
    sheet: {
      position: 'relative',
      display: 'flex',
      backgroundColor: colors.backgrounds.secondary,
      paddingTop: 80,
      paddingBottom: 180,
      paddingHorizontal: 24,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40
    },
    sectionContainer: {
      paddingBottom: 48
    },
    fabWrapper: {
      position: 'absolute',
      top: -32,
      right: 32
    },
    titleTextWrapper: {
      paddingBottom: 30
    },
    secondaryCardWrapper: {
      paddingRight: 20
    },
    titleText: {
      fontSize: 22,
      color: colors.foregrounds.primary
    },
    emptyMessageTextWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    emptyMessageText: {
      fontSize: 16,
      color: colors.foregrounds.secondary
    },
    friendContainer: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: 24
    },
    friendThumbnailWrapper: {
      paddingBottom: 10
    },
    friendNameTextWrapper: {
      width: '100%',
      display: 'flex',
      alignItems: 'center'
    },
    friendNameText: {
      fontSize: 14,
      color: colors.foregrounds.primary
    },
    blockMessageContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    blockMessageText: {
      fontSize: 20,
      color: colors.foregrounds.placeholder
    }
  })

export default UserScreen
