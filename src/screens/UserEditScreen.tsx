import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { UpdateUser } from '../entities'
import { useAuthState, useUIActions } from '../store/hooks'
import * as UserRepository from '../repositories/user'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { useUserEditTools } from '../services/user'
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Fab, Thumbnail, ShadowBase } from '../components/atoms'
import { TextField, SelectField } from '../components/moleculers'
import { Header } from '../components/organisms'
import { LoadingPage } from '../components/pages'
import { showUserEditFailurMessage, showUserEditSuccessMessage } from '../services/flashCard'

const UserEditScreen = () => {
  const navigation = useNavigation()
  const inset = useSafeArea()
  const { uid } = useAuthState()
  const { openLoadingModal, closeLoadingModal } = useUIActions()

  const styles = useStyles(makeStyles)
  const colors = useColors()

  const {
    name,
    userID,
    introduction,
    thumbnailURL,
    onChangeName,
    onChangeUserID,
    onChangeIntroduction,
    onChangeThumbnailURL,
    onFocusUserID,
    onFocusName,
    onFocusIntroduction,
    onFocusThumbnail,
    onResetFocusInputName,
    fetched,
    focusInputName
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

  if (!fetched) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.userScrollView, { paddingTop: inset.top }]}
        scrollIndicatorInsets={{ right: 1 }}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerTopSpacer} />

        <View style={styles.headerContainer}>
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

        <View style={styles.headerBottomSpacer} />

        <View style={styles.editArea}>
          <View style={styles.profileContainer}>
            <View style={styles.profileWrapper}>
              <View style={styles.thumbnailWrapper}>
                <ShadowBase>
                  <Thumbnail uri={thumbnailURL} size={120} onPress={onChangeThumbnailURL} onFocus={onFocusThumbnail} />
                </ShadowBase>

                <View style={styles.editFab}>
                  <Fab size={40} color={colors.tints.primary.main} onPress={onChangeThumbnailURL}>
                    <Feather name="edit-3" color={colors.foregrounds.onTintPrimary} size={26} />
                  </Fab>
                </View>
              </View>
            </View>
          </View>

          <ShadowBase>
            <View style={styles.contentsContainer}>
              <View style={styles.nameWrapper}>
                <TextField
                  label="ニックネーム"
                  value={name}
                  onChangeText={onChangeName}
                  onFocus={onFocusName}
                  onSubmitEditing={onResetFocusInputName}
                  fullWidth={true}
                />
              </View>

              <View style={styles.userIDWrapper}>
                <TextField
                  label="ID"
                  value={userID}
                  onChangeText={onChangeUserID}
                  onFocus={onFocusUserID}
                  onSubmitEditing={onResetFocusInputName}
                  fullWidth={true}
                />
              </View>

              <View style={styles.introWrapper}>
                <TextField
                  label="自己紹介"
                  multiline={true}
                  value={introduction}
                  onChangeText={onChangeIntroduction}
                  onFocus={onFocusIntroduction}
                  onSubmitEditing={onResetFocusInputName}
                  fullWidth={true}
                />
              </View>

              <View style={styles.preferNumberWrapper}>
                <SelectField label="希望人数" value="2〜3人で飲みたい" fullWidth={true} disabled={true} />
              </View>
            </View>
          </ShadowBase>
        </View>
      </ScrollView>

      {focusInputName && <KeyboardSpacer />}
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
    profileContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      minHeight: 300,
      paddingBottom: 42
    },
    contentsContainer: {
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgrounds.secondary,
      paddingVertical: 50,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40
    },
    userScrollView: {
      width: '100%',
      height: '100%'
    },
    editFab: {
      position: 'absolute',
      top: 40 * 2,
      left: 40 * 2
    },
    editArea: {
      flexGrow: 1,
      height: '100%'
    },
    profileWrapper: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 32
    },
    thumbnailWrapper: {
      position: 'relative'
    },
    nameWrapper: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 24,
      paddingHorizontal: 24,
      width: '100%'
    },
    userIDWrapper: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 24,
      paddingHorizontal: 24,
      width: '100%'
    },
    preferNumberWrapper: {
      display: 'flex',
      flexDirection: 'column',
      paddingHorizontal: 24,
      width: '100%'
    },
    introWrapper: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 24,
      paddingHorizontal: 24,
      width: '100%'
    },
    headerTopSpacer: {
      paddingBottom: 48
    },
    headerBottomSpacer: {
      paddingBottom: 48
    },
    saveText: {
      color: colors.tints.primary.main,
      fontSize: 16
    }
  })

export default UserEditScreen
