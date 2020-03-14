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
import { useFriends } from '../services/friend'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { Feather, AntDesign } from '@expo/vector-icons'
import { Thumbnail, Fab, DotsIcon, ShadowBase, BloomBase } from '../components/atoms'
import { PartySecondaryCard, Header } from '../components/organisms'
import { LoadingPage } from '../components/pages'
import { BottomTabLayout } from '../components/templates'

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

  const isBlocked = useMemo(() => {
    if (user && user.blockUIDs && user.blockUIDs.includes(uid)) return true
    return false
  }, [uid, user])

  const isFriend = useMemo(() => {
    if (user && user.friendUIDs && user.friendUIDs.includes(uid)) return true
    return false
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
                  <Text style={styles.introText}>
                    自己紹介分、サンプル。私の趣味はボルダリングです！ 運動も飲みも好きなので、あそびましょー。
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

            <ShadowBase>
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
                      <Fab size={75}>
                        <AntDesign name="adduser" color={colors.foregrounds.onTintPrimary} size={36} />
                      </Fab>
                    </BloomBase>
                  </View>
                )}

                {!isBlocked && (
                  <View style={styles.cardsContainer}>
                    <Text style={styles.contentsTitleText}>参加中</Text>
                    <View style={styles.carouselBottomSpace} />
                    <ScrollView
                      horizontal={true}
                      style={styles.allAppliedPartiesScrollView}
                      showsHorizontalScrollIndicator={false}
                    >
                      {appliedParties &&
                        appliedParties.map(appliedParty => (
                          <View key={appliedParty.id} style={styles.secondaryCardWrapper}>
                            <ShadowBase intensity={2}>
                              <PartySecondaryCard party={appliedParty} onPress={onPressParty} />
                            </ShadowBase>
                          </View>
                        ))}
                    </ScrollView>
                  </View>
                )}

                {!isBlocked && (
                  <View style={styles.friendsContainer}>
                    <Text style={styles.contentsTitleText}>ともだち</Text>
                    <ScrollView
                      horizontal={true}
                      style={styles.allFriendsScrollView}
                      showsHorizontalScrollIndicator={false}
                    >
                      {friends &&
                        friends.map(friend => {
                          if (friend) {
                            return (
                              //MEMO: ShowBase入れると変になるから抜いているが良いのか？
                              <View key={friend.id} style={styles.friendThumbnailWrapper}>
                                <View style={styles.friendShowBaseWrapper}>
                                  <ShadowBase intensity={2}>
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

const fullWidth = Dimensions.get('window').width

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
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgrounds.secondary,
      paddingVertical: 50,
      paddingHorizontal: 24,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40
    },
    cardsContainer: {
      paddingBottom: 32
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
    nameText: {
      fontSize: 18,
      color: colors.foregrounds.primary,
      fontWeight: 'bold'
    },
    headerTopSpacer: {
      paddingBottom: 48
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
      fontSize: 18,
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
    allFriendsScrollView: {
      width: fullWidth,
      flexDirection: 'row',
      overflow: 'visible',
      backgroundColor: colors.backgrounds.secondary
    },
    friendThumbnailWrapper: {
      paddingTop: 24,
      paddingRight: 18,
      backgroundColor: colors.backgrounds.secondary
    },
    friendShowBaseWrapper: {
      paddingBottom: 12
    },
    friendNameText: {
      textAlign: 'center',
      paddingBottom: 6,
      paddingHorizontal: 6,
      backgroundColor: colors.backgrounds.secondary,
      color: colors.foregrounds.primary
    },
    secondaryTitleTextWrapper: {
      width: '100%',
      paddingBottom: 30
    },
    allAppliedPartiesScrollView: {
      width: fullWidth,
      flexDirection: 'row',
      paddingBottom: 12,
      overflow: 'visible',
      backgroundColor: colors.backgrounds.secondary
    },
    secondaryCardWrapper: {
      paddingTop: 30,
      paddingRight: 20,
      backgroundColor: colors.backgrounds.secondary
    }
  })

export default UserScreen
