import React, { useCallback, useMemo } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
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
import { PartySecondaryCard } from '../components/organisms'
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
    navigation.navigate('UserEdit')
  }, [navigation])

  const goToSetting = useCallback(() => {
    navigation.navigate('Setting')
  }, [navigation])

  const onPressParty = useCallback(
    ({ type }: Party) => {
      navigation.navigate('SwipeCard', { type })
    },
    [navigation]
  )

  const onPressUser = useCallback(
    (userID: string) => {
      navigation.navigate('User', { userID })
    },
    [navigation]
  )

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

        <ScrollView style={styles.userScrollView}>
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

          <ShadowBase intensity={2}>
            <View style={styles.contentsContainer}>
              {isMy && (
                <View style={styles.fabWrapper}>
                  <BloomBase intensity={2}>
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
                  <View style={styles.carouselBottomSpace} />
                  <ScrollView horizontal={true} style={styles.allAppliedPartiesScrollView}>
                    {appliedParties &&
                      appliedParties.map(appliedParty => (
                        <View key={appliedParty.id} style={styles.secondaryCardWrapper}>
                          <ShadowBase intensity={2}>
                            <PartySecondaryCard
                              party={appliedParty}
                              width={fullWidth * 0.4}
                              height={fullWidth * 0.55}
                              onPress={onPressParty}
                            />
                          </ShadowBase>
                        </View>
                      ))}
                  </ScrollView>
                </View>
              )}

              {!isBlocked && (
                <View style={styles.friendsContainer}>
                  <Text style={styles.contentsTitleText}>ともだち</Text>
                  <ScrollView horizontal={true} style={styles.allFriendsScrollView}>
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
        </ScrollView>
      </View>
    </BottomTabLayout>
  )
}

// const hairlineWidth = StyleSheet.hairlineWidth
const fullHeight = Dimensions.get('window').height
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
    header: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: 34
    },
    profileContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      height: fullHeight * 0.61,
      paddingBottom: 42
    },
    contentsContainer: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      minHeight: fullHeight * 0.3,
      backgroundColor: colors.backgrounds.secondary,
      paddingVertical: 56,
      paddingHorizontal: 32,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20
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
      width: '100%'
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
