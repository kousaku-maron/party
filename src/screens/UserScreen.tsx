import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { UserScreenState, UserScreenActions } from '../containers/UserScreen'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types'
import { setThumbnail } from '../repositories/user'
import { useUser } from '../services/user'
import { View, Text, StyleSheet } from 'react-native'
import { RoundedButton, Thumbnail } from '../components/atoms'
import { LoadingPage } from '../components/pages'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & UserScreenState & UserScreenActions

const UserScreen = (props: Props) => {
  const { navigation, auth, signOut } = props

  const user = useUser(auth.uid)

  const _signOut = useCallback(async () => {
    signOut({
      onSuccess: () => navigation.navigate('Welcome')
    })
  }, [navigation, signOut])

  const selectThumbnail = useCallback(async () => {
    const permissionResponse = await Permissions.getAsync(Permissions.CAMERA_ROLL)

    let finalStatus = permissionResponse.status
    if (permissionResponse.status !== 'granted') {
      const askPermissionResponse = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      finalStatus = askPermissionResponse.status
    }

    if (finalStatus !== 'granted') {
      return null
    }

    // TODO: 画像を圧縮する(横1080px)
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    })

    if (result.cancelled) {
      return null
    }

    const { uri } = (result as unknown) as ImagePicker.ImagePickerResult & ImageInfo // base64とuriを読み込もうとすると型エラーが起きるので型再定義

    await setThumbnail(auth.uid, uri)
  }, [auth.uid])

  if (!user) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <View style={styles.thumbnailWrapper}>
        <Thumbnail uri={user.thumbnailURL} size={200} onPress={selectThumbnail} />
      </View>
      <View style={styles.nameWrapper}>
        <Text style={styles.nameText}>{user.name}</Text>
      </View>

      <RoundedButton onPress={_signOut}>
        <Text>サインアウト</Text>
      </RoundedButton>
    </View>
  )
}

UserScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca'
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  thumbnailWrapper: {
    paddingVertical: 24
  },
  nameWrapper: {
    paddingBottom: 12
  },
  nameText: {
    fontSize: 24
  }
})

export default UserScreen
