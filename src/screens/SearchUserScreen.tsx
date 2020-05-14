import React, { useCallback, useState, useRef, useMemo } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Animated, { Value, SpringUtils, interpolate, Extrapolate } from 'react-native-reanimated'
import { withSpringTransition } from 'react-native-redash'
import { useSafeArea } from 'react-native-safe-area-context'
import { User } from '../entities'
import { useAppAuthState } from '../store/hooks'
import { useStackNavigation } from '../services/route'
import { useStyles, MakeStyles, useColors } from '../services/design'
import { useSearchUsers, useUserRelationship } from '../services/user'
import { useAppliedFriendUsers, useApplyFriend, useAcceptFriend } from '../services/friend'
import { ShadowBase, TextInput, Fab, BlurView } from '../components/atoms'
import { Header, UserCard } from '../components/organisms'
import { NormalLayout } from '../components/templates'
import { Icons } from '../@assets/vector-icons'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const HEADER_HEIGHT = 50 + 24 + 6 // height + paddingTop + paddingBottom
const SEARCH_HEIGHT = 50 + 12 // height + paddingBottom

type ListItemProps = {
  user: User
  onPress: (user: User) => void
}

const UserListItem = ({ user, onPress }: ListItemProps) => {
  const colors = useColors()
  const { isBlocked, isFriend, isApply, isApplied } = useUserRelationship(user.uid)
  const { onApplyFriend } = useApplyFriend()
  const { onAcceptFriend } = useAcceptFriend()

  const isShowUserPlusIcon = useMemo(() => {
    return !isBlocked && !isFriend && !isApply
  }, [isApply, isBlocked, isFriend])

  const onPressUserPlus = useCallback(() => {
    if (isApplied) {
      onAcceptFriend(user)
      return
    }

    onApplyFriend(user)
  }, [isApplied, onAcceptFriend, onApplyFriend, user])

  return (
    <UserCard
      user={user}
      onPress={onPress}
      fullWidth={true}
      renderRight={() => {
        if (isShowUserPlusIcon) {
          return (
            <ShadowBase>
              <Fab color={colors.backgrounds.tertiary} onPress={onPressUserPlus}>
                <Icons name="user-plus" color={colors.foregrounds.primary} size={24} />
              </Fab>
            </ShadowBase>
          )
        }
      }}
    />
  )
}

const SearchUserScreen = () => {
  const { user, uid } = useAppAuthState()
  const navigation = useStackNavigation()
  const styles = useStyles(makeStyles)
  const inset = useSafeArea()
  const { fetching: fetchingAppliedFriendUsers, users: appliedFriendUsers } = useAppliedFriendUsers(uid)
  const { fetching: fetchingSearch, users: searchUsers, search } = useSearchUsers({ ignoreUserIDs: [user.userID] })
  const [value, setValue] = useState<string>('')
  const [mode, setMode] = useState<'applied' | 'search'>('applied')

  const onChangeText = useCallback((text: string) => {
    setValue(text)
  }, [])

  const onSubmitEditing = useCallback(() => {
    search(value)
  }, [search, value])

  const onFocus = useCallback(() => {
    isShowBtn.current.setValue(1)
    setMode('search')
  }, [])

  const onCancel = useCallback(() => {
    isShowBtn.current.setValue(0)
    setMode('applied')
  }, [])

  const onPressCard = useCallback(
    (user: User) => {
      navigation.push('User', { userID: user.id })
    },
    [navigation]
  )

  const scrollY = useRef(new Value<number>(0))

  const headerY = useRef(
    interpolate(scrollY.current, {
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: Extrapolate.CLAMP
    })
  )

  const opacity = useRef(
    interpolate(scrollY.current, {
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    })
  )

  const isShowBtn = useRef(new Value<number>(0))
  const isShowBtnAnimation = useRef(
    withSpringTransition(isShowBtn.current, {
      ...SpringUtils.makeDefaultConfig(),
      overshootClamping: true,
      damping: new Animated.Value(20)
    })
  )

  const btnW = useRef(
    interpolate(isShowBtnAnimation.current, {
      inputRange: [0, 1],
      outputRange: [0, 70]
    })
  )

  const btnPdL = useRef(
    interpolate(isShowBtnAnimation.current, {
      inputRange: [0, 1],
      outputRange: [0, 12]
    })
  )

  return (
    <NormalLayout fetching={fetchingAppliedFriendUsers || fetchingSearch}>
      <Animated.View
        style={[styles.headerContainer, { transform: [{ translateY: (headerY.current as unknown) as number }] }]}
      >
        <ShadowBase>
          <View style={[styles.headerInner, { paddingTop: 24 + inset.top }]}>
            <Animated.View style={[styles.headerWrapper, { opacity: opacity.current }]}>
              <Header fullWidth={true} title="ともだちを探す" />
            </Animated.View>
            <View style={styles.searchBoxWrapper}>
              <View style={styles.searchBox}>
                <TextInput
                  placeholder={'ともだちのIDを検索'}
                  value={value}
                  onFocus={onFocus}
                  onChangeText={onChangeText}
                  onSubmitEditing={onSubmitEditing}
                  fullWidth={true}
                />
              </View>

              <Animated.View style={{ width: btnW.current, paddingLeft: btnPdL.current }}>
                <TouchableOpacity onPress={onCancel}>
                  <Text style={styles.cancelBtnText} numberOfLines={1}>
                    キャンセル
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </ShadowBase>
      </Animated.View>

      <AnimatedBlurView
        style={[
          styles.headerBackground,
          { paddingTop: inset.top, transform: [{ translateY: (headerY.current as unknown) as number }] }
        ]}
      />

      <Animated.ScrollView
        style={[styles.scrollView, { paddingTop: HEADER_HEIGHT + SEARCH_HEIGHT + inset.top + 24 }]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { y: scrollY.current } }
          }
        ])}
      >
        {!fetchingAppliedFriendUsers && mode === 'applied' && appliedFriendUsers.length === 0 && (
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.emptyMessageText}>ともだちを探そう！</Text>
          </View>
        )}

        {!fetchingAppliedFriendUsers && mode === 'applied' && appliedFriendUsers.length > 0 && (
          <React.Fragment>
            <View style={styles.titleTextWrapper}>
              <Text style={styles.titleText}>リクエストがきています</Text>
            </View>

            {appliedFriendUsers.map(user => (
              <View key={user.id} style={styles.cardWrapper}>
                <ShadowBase>
                  <UserListItem user={user} onPress={onPressCard} />
                </ShadowBase>
              </View>
            ))}

            {/* MEMO: tab height 70px */}
            <View style={{ paddingBottom: inset.bottom + 70 + 200 }} />
          </React.Fragment>
        )}

        {!fetchingSearch && mode === 'search' && searchUsers.length > 0 && (
          <React.Fragment>
            {searchUsers.map(user => (
              <View key={user.id} style={styles.cardWrapper}>
                <ShadowBase>
                  <UserListItem user={user} onPress={onPressCard} />
                </ShadowBase>
              </View>
            ))}

            {/* MEMO: tab height 70px */}
            <View style={{ paddingBottom: inset.bottom + 70 + 200 }} />
          </React.Fragment>
        )}
      </Animated.ScrollView>
    </NormalLayout>
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
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      zIndex: 1000,
      elevation: 1000
    },
    headerBackground: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      zIndex: 999,
      elevation: 999,
      height: HEADER_HEIGHT + SEARCH_HEIGHT + 44
    },
    headerInner: {
      paddingHorizontal: 24
    },
    headerWrapper: {
      paddingBottom: 6
    },
    searchBoxWrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      paddingBottom: 12
    },
    searchBox: {
      flex: 1
    },
    scrollView: {
      paddingHorizontal: 12,
      backgroundColor: colors.backgrounds.primary
    },
    emptyMessageContainer: {
      width: '100%',
      height: 400,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    cardWrapper: {
      width: '100%',
      paddingBottom: 20
    },
    titleTextWrapper: {
      width: '100%',
      paddingBottom: 24
    },
    emptyMessageText: {
      fontSize: 16,
      color: colors.foregrounds.primary
    },
    titleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.foregrounds.primary
    },
    cancelBtnText: {
      fontSize: 12,
      color: colors.foregrounds.primary
    }
  })

export default SearchUserScreen
