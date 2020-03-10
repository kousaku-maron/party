import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UpdateUser } from '../entities'
import { useAuthState, useUIActions } from '../store/hooks'
import * as UserRepository from '../repositories/user'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { useUserEditTools } from '../services/user'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Fab, Thumbnail, ShadowBase } from '../components/atoms'
import { TextField, SelectField } from '../components/moleculers'
import { LoadingPage } from '../components/pages'
import { showUserEditFailurMessage, showUserEditSuccessMessage } from '../services/flashCard'

const UserEditScreen = () => {
  const navigation = useNavigation()
  const { uid } = useAuthState()
  const { openLoadingModal, closeLoadingModal } = useUIActions()

  const styles = useStyles(makeStyles)
  const colors = useColors()

  const { name, userID, thumbnailURL, onChangeName, onChangeUserID, onChangeThumbnailURL, fetched } = useUserEditTools(
    uid
  )

  const updateUserState = useCallback(async () => {
    openLoadingModal()
    const updateUser: UpdateUser = { uid, name, thumbnailURL, userID } // TODO: userIDに変更なければ、引数に入れないようにする。
    const { result } = await UserRepository.setUser(uid, updateUser)
    result ? showUserEditSuccessMessage() : showUserEditFailurMessage()
    closeLoadingModal()
    if (result) {
      navigation.goBack()
    }
  }, [closeLoadingModal, name, navigation, openLoadingModal, thumbnailURL, uid, userID])

  if (!fetched) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.userScrollView} scrollIndicatorInsets={{ right: 1 }}>
        <View style={styles.profileContainer}>
          <View style={styles.profileWrapper}>
            <ShadowBase>
              <View style={styles.thumbnailWrapper}>
                <Thumbnail uri={thumbnailURL} size={120} onPress={onChangeThumbnailURL} />
              </View>
            </ShadowBase>

            <View style={styles.editFab}>
              <Fab size={40} color={colors.tints.primary.main} onPress={updateUserState}>
                <Feather name="edit-3" color={colors.foregrounds.onTintPrimary} size={26} />
              </Fab>
            </View>
          </View>
        </View>

        <ShadowBase intensity={2}>
          <View style={styles.contentsContainer}>
            <View style={styles.nameWrapper}>
              <TextField label="ニックネーム" value={name} onChangeText={onChangeName} fullWidth={true} />
            </View>

            <View style={styles.userIDWrapper}>
              <TextField label="ID" value={userID} onChangeText={onChangeUserID} fullWidth={true} />
            </View>

            <View style={styles.introWrapper}>
              <TextField
                label="intro"
                multiline={true}
                value={'東京都で薬剤師として働いています！　気が合えば飲みに行きましょう！'}
                fullWidth={true}
              />
            </View>
            <View style={styles.preferNumberWrapper}>
              <SelectField label="希望人数" value="2〜3人で飲みたい" fullWidth={true} disabled={true} />
            </View>
          </View>
        </ShadowBase>
      </ScrollView>
    </View>
  )
}

const fullHeight = Dimensions.get('window').height

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.backgrounds.primary
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
      alignItems: 'center',
      width: '100%',
      backgroundColor: colors.backgrounds.secondary,
      paddingVertical: 20,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20
    },
    userScrollView: {
      width: '100%'
    },
    editFab: {
      position: 'relative',
      top: -40 * 2,
      left: 40
    },
    profileWrapper: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 32
    },
    thumbnailWrapper: {
      paddingTop: 24,
      paddingBottom: 36
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
      paddingBottom: 24,
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
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.foregrounds.primary
    }
  })

export default UserEditScreen
