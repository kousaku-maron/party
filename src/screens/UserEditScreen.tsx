import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { User } from '../entities'
import { UserEditScreenState } from '../containers/UserEditScreen'
import * as UserRepository from '../repositories/user'
import { useUserEditTools } from '../services/user'
import { View, StyleSheet } from 'react-native'
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

  const { name, thumbnailURL, onChangeName, onChangeThumbnailURL, fetched } = useUserEditTools(uid)

  const updateUserState = useCallback(async () => {
    const updateUser: User = { uid, name, thumbnailURL }
    const { result } = await UserRepository.setUser(uid, updateUser)
    if (result) {
      navigation.goBack()
    }
  }, [name, navigation, thumbnailURL, uid])

  if (!fetched) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <View style={styles.editFab}>
        <Fab color="#3498db" onPress={updateUserState}>
          <MaterialIcons color="white" name="done" size={24} />
        </Fab>
      </View>

      <View style={styles.thumbnailWrapper}>
        <Thumbnail uri={thumbnailURL} size={200} onPress={onChangeThumbnailURL} />
      </View>

      <View>
        <View style={styles.nameWrapper}>
          <TextInput value={name} onChangeText={onChangeName}></TextInput>
        </View>
      </View>
    </View>
  )
}

UserEditScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca',
  headerBackTitle: null
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  editFab: {
    position: 'absolute',
    right: 24,
    bottom: 24
  },
  thumbnailWrapper: {
    paddingVertical: 24
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12
  },
  nameText: {
    fontSize: 24
  }
})

export default UserEditScreen