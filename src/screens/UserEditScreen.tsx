import React, { useCallback, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import Animated, { Value } from 'react-native-reanimated'
import { useSafeArea } from 'react-native-safe-area-context'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { UpdateUser } from '../entities'
import { useAppAuthState, useUIActions } from '../store/hooks'
import * as UserRepository from '../repositories/user'
import { useStyles, useColors, MakeStyles } from '../services/design'
// import { useKeyboardState } from '../services/ui'
import { useUserEditTools } from '../services/user'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Fab, Thumbnail, ShadowBase, BlurView } from '../components/atoms'
import { TextField } from '../components/moleculers'
import { Header } from '../components/organisms'
import { NormalLayout } from '../components/templates'
import { showUserEditFailurMessage, showUserEditSuccessMessage } from '../services/flashCard'
import { Icons } from '../@assets/vector-icons'

const PROFILE_HEIGHT = 480

const UserEditScreen = () => {
  const navigation = useNavigation()
  const inset = useSafeArea()
  const { uid } = useAppAuthState()
  const { openLoadingModal, closeLoadingModal } = useUIActions()

  const styles = useStyles(makeStyles)
  const colors = useColors()

  // MEMO: キーボードが出現した場合、自動で最後までスクロールさせてアニメーションさせている。
  // 設定する項目が増え1画面で収まらないようになれば、スクロール量を計算して、自動スクロールさせるように修正しないといけない。
  // const { visible: keyboardVisible } = useKeyboardState({ useWillShow: true })
  // const scrollviewRef = useRef(null)
  // useEffect(() => {
  //   if (keyboardVisible && scrollviewRef.current) {
  //     setTimeout(() => {
  //       scrollviewRef.current.scrollToEnd()
  //     }, 100)
  //   }
  // }, [keyboardVisible])

  const scrollY = useRef(new Value<number>(0))

  const {
    name,
    userID,
    introduction,
    thumbnailURL,
    onChangeName,
    onChangeUserID,
    onChangeIntroduction,
    onChangeThumbnailURL,
    fetching
  } = useUserEditTools(uid)

  const updateUserState = useCallback(async () => {
    openLoadingModal()

    const updateUser: UpdateUser = { uid, name, ...(introduction && { introduction }), thumbnailURL, userID } // TODO: userIDに変更なければ、引数に入れないようにする。

    const { result } = await UserRepository.setUser(uid, updateUser)
    result ? showUserEditSuccessMessage() : showUserEditFailurMessage()
    closeLoadingModal()
    if (result) {
      navigation.goBack()
    }
  }, [closeLoadingModal, introduction, name, navigation, openLoadingModal, thumbnailURL, uid, userID])

  return (
    <NormalLayout fetching={fetching}>
      <View style={styles.container}>
        <View style={[styles.headerContainer, { paddingTop: 24 + inset.top }]}>
          <View style={styles.headerInner}>
            <Header
              fullWidth={true}
              title="プロフィール編集"
              renderRight={() => (
                <TouchableOpacity onPress={updateUserState}>
                  <Text style={styles.saveText}>保存</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <BlurView style={[styles.headerBackground, { paddingTop: 24 + inset.top }]} />

        <Animated.ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          // ref={ref => (scrollviewRef.current = ref)}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: scrollY.current } }
            }
          ])}
        >
          <View style={styles.thumbnailContainer}>
            <View style={styles.thumbnailWrapper}>
              <ShadowBase>
                <Thumbnail uri={thumbnailURL} size={120} onPress={onChangeThumbnailURL} />
              </ShadowBase>

              <View style={styles.editFabWrapper}>
                <Fab size={40} color={colors.tints.primary.main} onPress={onChangeThumbnailURL}>
                  <Icons name="edit" color={colors.foregrounds.onTintPrimary} size={26} />
                </Fab>
              </View>
            </View>
          </View>

          <ShadowBase>
            <View style={styles.sheet}>
              <View style={styles.nameWrapper}>
                <TextField label="ニックネーム" value={name} onChangeText={onChangeName} fullWidth={true} />
              </View>

              <View style={styles.userIDWrapper}>
                <TextField label="ID" value={userID} onChangeText={onChangeUserID} fullWidth={true} />
              </View>

              <View style={styles.introWrapper}>
                <TextField
                  label="自己紹介"
                  height={100}
                  multiline={true}
                  numberOfLines={4}
                  value={introduction}
                  onChangeText={onChangeIntroduction}
                  fullWidth={true}
                />
              </View>

              <KeyboardSpacer />

              <View style={styles.grow} />
            </View>
          </ShadowBase>
        </Animated.ScrollView>
      </View>
    </NormalLayout>
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
      height: 124
    },
    headerInner: {
      paddingHorizontal: 36
    },
    scrollView: {},
    grow: {
      flexGrow: 1,
      height: '100%'
    },
    thumbnailContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: PROFILE_HEIGHT,
      paddingBottom: 120
    },
    thumbnailWrapper: {
      position: 'relative'
    },
    editFabWrapper: {
      position: 'absolute',
      top: 80,
      left: 80
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
    nameWrapper: {
      paddingBottom: 24,
      paddingHorizontal: 12
    },
    userIDWrapper: {
      paddingBottom: 24,
      paddingHorizontal: 12
    },
    introWrapper: {
      paddingBottom: 24,
      paddingHorizontal: 12
    },
    saveText: {
      color: colors.tints.primary.main,
      fontSize: 18
    }
  })

export default UserEditScreen
