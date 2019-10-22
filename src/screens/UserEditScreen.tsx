import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { UpdateUser } from '../entities'
import { UserEditScreenState } from '../containers/UserEditScreen'
import { colors } from '../themes'
import * as UserRepository from '../repositories/user'
import { useUserEditTools } from '../services/user'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Fab, Thumbnail, TextInput } from '../components/atoms'
import { LoadingPage } from '../components/pages'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & UserEditScreenState

const UserEditScreen = (props: Props) => {
  const { navigation, auth } = props
  const { uid } = auth

  const { name, userID, thumbnailURL, onChangeName, onChangeUserID, onChangeThumbnailURL, fetched } = useUserEditTools(
    uid
  )

  const updateUserState = useCallback(async () => {
    const updateUser: UpdateUser = { uid, name, thumbnailURL, userID } // TODO: userIDに変更なければ、引数に入れないようにする。
    const { result } = await UserRepository.setUser(uid, updateUser)
    if (result) {
      navigation.goBack()
    }
  }, [name, navigation, thumbnailURL, uid, userID])

  if (!fetched) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <View style={styles.editFab}>
        <Fab color={colors.primary.main} onPress={updateUserState}>
          <MaterialIcons color="white" name="done" size={24} />
        </Fab>
      </View>

      <View style={styles.thumbnailWrapper}>
        <Thumbnail uri={thumbnailURL} size={200} onPress={onChangeThumbnailURL} />
      </View>

      <View>
        <View style={styles.nameWrapper}>
          <Text style={styles.titleText}>ネーム</Text>
          <TextInput value={name} onChangeText={onChangeName}></TextInput>
        </View>
      </View>

      <View>
        <View style={styles.userIDWrapper}>
          <Text style={styles.titleText}>ID</Text>
          <TextInput value={userID} onChangeText={onChangeUserID}></TextInput>
        </View>
      </View>
    </View>
  )
}

UserEditScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca',
  headerBackTitle: null,
  headerTintColor: colors.tertiary.light,
  headerStyle: {
    backgroundColor: colors.senary.dark
  }
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.inherit
  },
  editFab: {
    position: 'absolute',
    right: 26,
    bottom: 24
  },
  thumbnailWrapper: {
    paddingTop: 24,
    paddingBottom: 36
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 24
  },
  userIDWrapper: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 24
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold'
    // color: 'gray'
  }
})

export default UserEditScreen
