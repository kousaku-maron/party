import React, { useCallback, useState, useRef, useMemo } from 'react'
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import Animated, { Value, SpringUtils, interpolate } from 'react-native-reanimated'
import { withSpringTransition } from 'react-native-redash'
import { useSafeArea } from 'react-native-safe-area-context'
import { User } from '../entities'
import { useAppAuthState } from '../store/hooks'
import { useStackNavigation } from '../services/route'
import { useStyles, MakeStyles } from '../services/design'
import { useSearchUsers } from '../services/user'
import { useAppliedFriendUsers } from '../services/friend'
import { ShadowBase, TextInput } from '../components/atoms'
import { Header, UserCard } from '../components/organisms'
import { NormalLayout } from '../components/templates'

const SearchUserScreen = () => {
  const { user, uid } = useAppAuthState()
  const navigation = useStackNavigation()
  const styles = useStyles(makeStyles)
  const inset = useSafeArea()
  const { fetching: fetchingAppliedFriendUsers, users: appliedFriendUsers } = useAppliedFriendUsers(uid)
  const { fetching: fetchingSearch, users: searchUsers, search } = useSearchUsers({ ignoreUserIDs: [user.userID] })
  const [value, setValue] = useState<string>('')

  const onChangeText = useCallback((text: string) => {
    setValue(text)
  }, [])

  const onSubmitEditing = useCallback(() => {
    search(value)
  }, [search, value])

  const onPressCard = useCallback(
    (user: User) => {
      navigation.push('User', { userID: user.id })
    },
    [navigation]
  )

  const isShowEmptyMessage = useMemo(() => {
    return !fetchingSearch && !fetchingAppliedFriendUsers && searchUsers.length === 0 && appliedFriendUsers.length === 0
  }, [appliedFriendUsers.length, fetchingAppliedFriendUsers, fetchingSearch, searchUsers.length])

  const isShowSearchUsers = useMemo(() => {
    return searchUsers.length > 0
  }, [searchUsers.length])

  const isShowAppliedFriendUsers = useMemo(() => {
    return searchUsers.length === 0 && appliedFriendUsers.length > 0
  }, [appliedFriendUsers.length, searchUsers.length])

  const isShowBtn = useRef(new Value<number>(0))
  const isShowBtnAnimation = useRef(
    withSpringTransition(isShowBtn.current, {
      ...SpringUtils.makeDefaultConfig(),
      overshootClamping: true,
      damping: new Animated.Value(20)
    })
  )

  const btnW = interpolate(isShowBtnAnimation.current, {
    inputRange: [0, 1],
    outputRange: [0, 50]
  })

  const btnPdL = interpolate(isShowBtnAnimation.current, {
    inputRange: [0, 1],
    outputRange: [0, 12]
  })

  const onShowBtn = useCallback(() => {
    isShowBtn.current.setValue(1)
  }, [])

  return (
    <NormalLayout fetching={fetchingAppliedFriendUsers || fetchingSearch}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentInset={{ top: inset.top }}
          stickyHeaderIndices={[1, 3]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerTopSpacer} />

          <View style={styles.headerContainer}>
            <Header fullWidth={true} title="ともだちを探す" />
          </View>

          <View style={styles.headerBottomSpacer} />

          <View>
            <View style={styles.searchBoxContainer}>
              <View style={styles.searchBox}>
                <TextInput
                  placeholder={'ともだちのIDを検索'}
                  value={value}
                  onChangeText={onChangeText}
                  onSubmitEditing={onSubmitEditing}
                  fullWidth={true}
                  onFocus={onShowBtn}
                />
              </View>

              <Animated.View style={{ width: btnW, paddingLeft: btnPdL }}>
                <TouchableOpacity onPress={onSubmitEditing}>
                  <Text style={styles.searchBtnText} numberOfLines={1}>
                    検索
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          <View style={styles.searchBoxBottomSpacer} />

          {isShowEmptyMessage && (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>ともだちを探そう！</Text>
            </View>
          )}

          {isShowAppliedFriendUsers && (
            <React.Fragment>
              <View style={styles.titleTextWrapper}>
                <Text style={styles.titleText}>リクエストがきています</Text>
              </View>

              {appliedFriendUsers.map(user => (
                <View key={user.id} style={styles.cardWrapper}>
                  <ShadowBase>
                    <UserCard user={user} onPress={onPressCard} fullWidth={true} />
                  </ShadowBase>
                </View>
              ))}

              {/* MEMO: tab height 70px */}
              <View style={{ paddingBottom: inset.bottom + 70 + 200 }} />
            </React.Fragment>
          )}

          {isShowSearchUsers && (
            <React.Fragment>
              {searchUsers.map(user => (
                <View key={user.id} style={styles.cardWrapper}>
                  <ShadowBase>
                    <UserCard user={user} onPress={onPressCard} fullWidth={true} />
                  </ShadowBase>
                </View>
              ))}

              {/* MEMO: tab height 70px */}
              <View style={{ paddingBottom: inset.bottom + 70 + 200 }} />
            </React.Fragment>
          )}
        </ScrollView>
      </View>
    </NormalLayout>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgrounds.primary
    },
    searchBoxContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 12,
      paddingVertical: 6
    },
    emptyMessageContainer: {
      width: '100%',
      height: 400,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    scrollView: {
      width: '100%',
      paddingHorizontal: 12
    },
    searchBox: {
      flex: 1
    },
    cardWrapper: {
      width: '100%',
      paddingBottom: 20
    },
    headerContainer: {
      width: '100%',
      paddingHorizontal: 24
    },
    headerTopSpacer: {
      paddingBottom: 36
    },
    headerBottomSpacer: {
      paddingBottom: 20
    },
    searchBoxBottomSpacer: {
      paddingBottom: 20
    },
    titleTextWrapper: {
      width: '100%',
      paddingVertical: 24
    },
    emptyMessageText: {
      fontSize: 16,
      color: colors.foregrounds.primary
    },
    titleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.foregrounds.primary,
      paddingLeft: 24
    },
    searchBtnText: {
      fontSize: 16,
      color: colors.foregrounds.primary
    }
  })

export default SearchUserScreen
