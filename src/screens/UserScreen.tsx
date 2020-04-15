import React, { useCallback, useMemo } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useStackNavigation } from '../services/route'
import { useSafeArea } from 'react-native-safe-area-context'
import { RouteParams } from '../navigators/RouteProps'
import { useAuthState } from '../store/hooks'
import { Party } from '../entities'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { useUser } from '../services/user'
import { useAppliedParties } from '../services/party'
import { useFriends, useApplyFriend } from '../services/friend'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Thumbnail, Fab, DotsIcon, ShadowBase, BloomBase } from '../components/atoms'
import { PartySecondaryCard, Header } from '../components/organisms'
import { LoadingPage } from '../components/pages'
import { BottomTabLayout } from '../components/templates'
import { Icons } from '../@assets/vector-icons'

const UserScreen = () => {
  const navigation = useStackNavigation()
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

  const user = useUser(targetUserID)
  const friends = useFriends(user)
  const appliedParties = useAppliedParties(user)
  const { applyFriend } = useApplyFriend()

  const isBlocked = useMemo(() => {
    return user && user.blockUIDs && user.blockUIDs.includes(uid)
  }, [uid, user])

  const isFriend = useMemo(() => {
    return user && user.friendUIDs && user.friendUIDs.includes(uid)
  }, [uid, user])

  const isAlreadyApplyFriend = useMemo(() => {
    return user && user.appliedFriendUIDs && user.appliedFriendUIDs.includes(uid)
  }, [uid, user])

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

  const onPressAddUser = useCallback(() => {
    if (!user) return
    applyFriend(user)
  }, [applyFriend, user])

  if (!user) {
    return <LoadingPage />
  }

  return (
    <BottomTabLayout>
      <View style={(styles.container, { paddingTop: inset.top })}>
        <ScrollView style={styles.userScrollView} stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
          <View style={styles.headerTopSpacer} />

          <View style={styles.headerContainer}>
            <Header
              fullWidth={true}
              title="プロフィール"
              renderRight={() =>
                isMy && (
                  <TouchableOpacity style={styles.dotsWrapper} onPress={goToSetting}>
                    <DotsIcon />
                  </TouchableOpacity>
                )
              }
            />
          </View>

          <View style={styles.headerBottomSpacer} />

          <View style={styles.profileArea}>
            <View style={styles.profileContainer}>
              <View style={styles.profileWrapper}>
                <View style={styles.thumbnailWrapper}>
                  <ShadowBase>
                    <Thumbnail uri={user.thumbnailURL} size={80} />
                  </ShadowBase>
                </View>

                <View style={styles.nameWrapper}>
                  <Text style={styles.nameText}>{user.name}</Text>
                </View>

                <View style={styles.introWrapper}>
                  <Text style={styles.introText}>{user.introduction}</Text>
                </View>

                {isFriend && !isBlocked && !isMy && (
                  <View style={styles.friendTextWrapper}>
                    <Text style={styles.friendText}>ともだち</Text>
                  </View>
                )}

                {isAlreadyApplyFriend && !isBlocked && !isMy && (
                  <View style={styles.friendTextWrapper}>
                    <Text style={styles.friendText}>ともだち申請中</Text>
                  </View>
                )}

                {isBlocked && !isMy && (
                  <View style={styles.blockTextWrapper}>
                    <Text style={styles.blockText}>ブロック中</Text>
                  </View>
                )}
              </View>
            </View>

            <ShadowBase>
              <View style={styles.contentsContainer}>
                {isMy && (
                  <View style={styles.fabWrapper}>
                    <BloomBase>
                      <Fab size={64} onPress={goToEdit}>
                        <Icons name="edit" color={colors.foregrounds.onTintPrimary} size={36} />
                      </Fab>
                    </BloomBase>
                  </View>
                )}

                {!isMy && !isFriend && !isBlocked && !isAlreadyApplyFriend && (
                  <View style={styles.fabWrapper}>
                    <BloomBase>
                      <Fab size={75} onPress={onPressAddUser}>
                        <Icons name="user-plus" color={colors.foregrounds.onTintPrimary} size={36} />
                      </Fab>
                    </BloomBase>
                  </View>
                )}

                {!isBlocked && (
                  <View style={styles.cardsContainer}>
                    <View style={styles.contentsTitleTextWrapper}>
                      <Text style={styles.contentsTitleText}>参加中</Text>
                    </View>
                    <ScrollView horizontal={true} style={styles.rowScrollView} showsHorizontalScrollIndicator={false}>
                      {appliedParties &&
                        appliedParties.map(appliedParty => (
                          <View key={appliedParty.id} style={styles.secondaryCardWrapper}>
                            <ShadowBase>
                              <PartySecondaryCard party={appliedParty} onPress={onPressParty} />
                            </ShadowBase>
                          </View>
                        ))}
                    </ScrollView>
                  </View>
                )}

                {!isBlocked && (
                  <View style={styles.friendsContainer}>
                    <View style={styles.contentsTitleTextWrapper}>
                      <Text style={styles.contentsTitleText}>ともだち</Text>
                    </View>
                    <ScrollView horizontal={true} style={styles.rowScrollView} showsHorizontalScrollIndicator={false}>
                      {friends &&
                        friends.map(friend => {
                          if (friend) {
                            return (
                              <View key={friend.id} style={styles.friendWrapper}>
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
                            )
                          }
                        })}
                    </ScrollView>
                  </View>
                )}

                {isBlocked && (
                  <View style={styles.blockMessageContainer}>
                    <Text style={styles.blockMessageText}>ブロックしたユーザーの</Text>
                    <Text style={styles.blockMessageText}>情報は見れません</Text>
                  </View>
                )}
              </View>
            </ShadowBase>
          </View>
        </ScrollView>
      </View>
    </BottomTabLayout>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: colors.backgrounds.primary
    },
    headerContainer: {
      width: '100%',
      paddingHorizontal: 24
    },
    profileContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      minHeight: 400,
      paddingBottom: 42
    },
    contentsContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgrounds.secondary,
      paddingTop: 80,
      paddingBottom: 40,
      paddingHorizontal: 24,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40
    },
    cardsContainer: {
      paddingBottom: 50
    },
    friendContainer: {},
    blockMessageContainer: {
      display: 'flex',
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
    userScrollView: {
      width: '100%',
      height: '100%'
    },
    profileArea: {
      flexGrow: 1,
      height: '100%'
    },
    thumbnailWrapper: {
      paddingBottom: 18
    },
    friendThumbnailWrapper: {
      paddingBottom: 10
    },
    nameWrapper: {
      paddingBottom: 18
    },
    idWrapper: {
      paddingBottom: 24
    },
    introWrapper: {
      width: '51.2%',
      paddingBottom: 32
    },
    profileWrapper: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 32
    },
    friendTextWrapper: {},
    blockTextWrapper: {},
    contentsTitleTextWrapper: {
      paddingBottom: 30
    },
    nameText: {
      fontSize: 18,
      color: colors.foregrounds.primary,
      fontWeight: 'bold'
    },
    headerTopSpacer: {
      paddingBottom: 36
    },
    headerBottomSpacer: {
      paddingBottom: 48
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
      color: colors.system.red
    },
    contentsTitleText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.foregrounds.primary
    },
    blockMessageText: {
      fontSize: 20,
      color: colors.foregrounds.placeholder
    },
    friendsContainer: {
      paddingTop: 18,
      paddingBottom: 52
    },
    friendWrapper: {
      display: 'flex',
      alignItems: 'center',
      paddingRight: 20
    },
    friendShowBaseWrapper: {
      paddingBottom: 12
    },
    friendNameText: {
      textAlign: 'center',
      paddingBottom: 6,
      paddingHorizontal: 6,
      color: colors.foregrounds.primary
    },
    secondaryTitleTextWrapper: {
      width: '100%',
      paddingBottom: 30
    },
    rowScrollView: {
      width: '100%',
      flexDirection: 'row',
      overflow: 'visible'
    },
    secondaryCardWrapper: {
      paddingRight: 20
    }
  })

export default UserScreen
